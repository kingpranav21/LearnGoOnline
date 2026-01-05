/// <reference lib="webworker" />

type RunRequest = { id: string; type: 'run'; code: string }
type ReadyRequest = { id: string; type: 'ping' }

type RunResponse = { id: string; type: 'result'; stdout: string; stderr: string }
type ReadyResponse = { id: string; type: 'ready' }
type ErrorResponse = { id: string; type: 'error'; message: string }

declare const Go: new () => { importObject: WebAssembly.Imports; run: (instance: WebAssembly.Instance) => Promise<void> }

let isReady = false
let goRunFn: ((code: string) => { stdout: string; stderr: string }) | null = null
let initError: string | null = null

async function loadWasmExec() {
  // Classic workers support importScripts; module workers do not.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const importScriptsFn = (self as any).importScripts as undefined | ((...urls: string[]) => void)
  if (typeof importScriptsFn === 'function') {
    importScriptsFn('/wasm/wasm_exec.js')
    return
  }

  // Fallback for module-like environments: fetch + eval.
  const jsText = await (await fetch('/wasm/wasm_exec.js')).text()
  // eslint-disable-next-line no-eval
  ;(0, eval)(jsText)
}

async function waitForGoRun(timeoutMs: number) {
  const started = Date.now()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  while (!(self as any).goRun) {
    if (Date.now() - started > timeoutMs) throw new Error('goRun was not registered in time')
    await new Promise((r) => setTimeout(r, 10))
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (self as any).goRun as typeof goRunFn
}

async function init() {
  // wasm_exec.js defines global Go constructor.
  await loadWasmExec()

  const go = new Go()
  const resp = await fetch('/wasm/runner.wasm')
  const bytes = await resp.arrayBuffer()
  const { instance } = await WebAssembly.instantiate(bytes, go.importObject)

  // Start the Go runtime (it will register global goRun).
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  go.run(instance)

  goRunFn = await waitForGoRun(4000)
  isReady = true
}

const initPromise = init().catch((e: unknown) => {
  initError = e instanceof Error ? e.message : String(e)
  throw e
})

self.onmessage = async (ev: MessageEvent<RunRequest | ReadyRequest>) => {
  const msg = ev.data
  try {
    await initPromise
  } catch {
    self.postMessage({ id: msg.id, type: 'error', message: initError || 'Runner init failed' } satisfies ErrorResponse)
    return
  }

  if (msg.type === 'ping') {
    if (!isReady || !goRunFn) {
      self.postMessage({ id: msg.id, type: 'error', message: 'Runner not ready' } satisfies ErrorResponse)
      return
    }
    self.postMessage({ id: msg.id, type: 'ready' } satisfies ReadyResponse)
    return
  }

  if (msg.type === 'run') {
    if (!isReady || !goRunFn) {
      self.postMessage({ id: msg.id, type: 'error', message: 'Runner not ready' } satisfies ErrorResponse)
      return
    }

    try {
      const res = goRunFn(msg.code)
      self.postMessage({ id: msg.id, type: 'result', stdout: res.stdout || '', stderr: res.stderr || '' } satisfies RunResponse)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e)
      self.postMessage({ id: msg.id, type: 'error', message } satisfies ErrorResponse)
    }
  }
}


