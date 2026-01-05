type WorkerRequest =
  | { id: string; type: 'ping' }
  | { id: string; type: 'run'; code: string }

type WorkerResponse =
  | { id: string; type: 'ready' }
  | { id: string; type: 'result'; stdout: string; stderr: string }
  | { id: string; type: 'error'; message: string }

let worker: Worker | null = null
let isReady = false
let pending = new Map<
  string,
  {
    resolve: (v: { stdout: string; stderr: string }) => void
    reject: (e: Error) => void
    timeoutId: number
  }
>()

function makeId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function ensureWorker() {
  if (worker) return worker

  // Use a classic worker so `importScripts` is available if needed by the WASM bootstrap.
  worker = new Worker(new URL('../worker/goRunner.worker.ts', import.meta.url))
  isReady = false

  worker.onmessage = (ev: MessageEvent<WorkerResponse>) => {
    const msg = ev.data
    if (msg.type === 'ready') {
      isReady = true
      const entry = pending.get(msg.id)
      if (entry) {
        pending.delete(msg.id)
        window.clearTimeout(entry.timeoutId)
        // ready has no payload; treat it as successful init for this request
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        entry.resolve(undefined as any)
      }
      return
    }

    const entry = pending.get(msg.id)
    if (!entry) return
    pending.delete(msg.id)
    window.clearTimeout(entry.timeoutId)

    if (msg.type === 'result') entry.resolve({ stdout: msg.stdout, stderr: msg.stderr })
    else entry.reject(new Error(msg.type === 'error' ? msg.message : 'Unknown worker response'))
  }

  worker.onerror = () => {
    resetWorker()
  }

  // Kick the handshake; caller will wait via awaitReady.
  worker.postMessage({ id: 'handshake', type: 'ping' } satisfies WorkerRequest)

  return worker
}

async function awaitReady(timeoutMs: number) {
  const w = ensureWorker()
  if (isReady) return

  const id = makeId()
  await new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      pending.delete(id)
      reject(new Error('Go runner init timed out'))
    }, timeoutMs)

    pending.set(id, {
      resolve: () => resolve(),
      reject,
      timeoutId,
    })

    w.postMessage({ id, type: 'ping' } satisfies WorkerRequest)
  })
}

export function resetWorker() {
  if (worker) worker.terminate()
  worker = null
  isReady = false
  for (const [, v] of pending) {
    window.clearTimeout(v.timeoutId)
    v.reject(new Error('Runner reset'))
  }
  pending = new Map()
}

export async function runGo(code: string, opts?: { timeoutMs?: number; initTimeoutMs?: number }) {
  const timeoutMs = opts?.timeoutMs ?? 2000
  const initTimeoutMs = opts?.initTimeoutMs ?? 6000

  await awaitReady(initTimeoutMs)
  const w = ensureWorker()

  const id = makeId()
  return await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      // Hard timeout: kill the worker to stop runaway loops.
      resetWorker()
      reject(new Error('Execution timed out'))
    }, timeoutMs)

    pending.set(id, { resolve, reject, timeoutId })
    w.postMessage({ id, type: 'run', code } satisfies WorkerRequest)
  })
}


