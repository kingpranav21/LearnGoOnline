import { useEffect, useMemo, useRef, useState } from 'react'
import type { Topic } from '../content/topics'
import { runGo } from '../lib/goRunnerClient'
import { OutputConsole } from './OutputConsole'

type AssignmentPanelProps = {
  topic: Topic
  isUnlocked: boolean
  isCompleted: boolean
  onMarkCompleted: () => void
}

function normalizeStdout(s: string) {
  return s.replace(/\r\n/g, '\n')
}

export function AssignmentPanel(props: AssignmentPanelProps) {
  const [code, setCode] = useState(props.topic.assignment?.starterCode || '')
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [checkMessage, setCheckMessage] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    setCode(props.topic.assignment?.starterCode || '')
    setStdout('')
    setStderr('')
    setIsRunning(false)
    setCheckMessage(null)
  }, [props.topic.id, props.topic.assignment?.starterCode])

  const expected = useMemo(() => props.topic.assignment?.expectedStdout, [props.topic.assignment?.expectedStdout])

  async function run() {
    setIsRunning(true)
    setStdout('')
    setStderr('')
    setCheckMessage(null)
    try {
      const res = await runGo(code, { timeoutMs: 2000 })
      setStdout(res.stdout)
      setStderr(res.stderr)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e)
      setStdout('')
      setStderr(message + '\n')
    } finally {
      setIsRunning(false)
    }
  }

  function getIndentOfLine(text: string, lineStart: number) {
    let i = lineStart
    while (i < text.length) {
      const ch = text[i]
      if (ch !== ' ' && ch !== '\t') break
      i++
    }
    return text.slice(lineStart, i)
  }

  function findLineStart(text: string, pos: number) {
    const idx = text.lastIndexOf('\n', Math.max(0, pos - 1))
    return idx === -1 ? 0 : idx + 1
  }

  function applyEdit(next: string, nextSelStart: number, nextSelEnd: number) {
    setCode(next)
    requestAnimationFrame(() => {
      const el = textareaRef.current
      if (!el) return
      el.focus()
      el.setSelectionRange(nextSelStart, nextSelEnd)
    })
  }

  function onEditorKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget
    const text = el.value
    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? 0

    // Cmd/Ctrl+Enter => Run
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      if (!isRunning) void run()
      return
    }

    // Tab / Shift+Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault()
      const TAB = '  '
      const selStartLine = findLineStart(text, start)
      const selEndLine = findLineStart(text, end)
      const lines = text.split('\n')

      // Convert char index -> line index
      let acc = 0
      let startLineIdx = 0
      let endLineIdx = 0
      for (let i = 0; i < lines.length; i++) {
        const nextAcc = acc + lines[i].length + 1
        if (selStartLine >= acc && selStartLine < nextAcc) startLineIdx = i
        if (selEndLine >= acc && selEndLine < nextAcc) endLineIdx = i
        acc = nextAcc
      }

      const targetEndLineIdx = start === end ? startLineIdx : endLineIdx

      let deltaStart = 0
      let deltaEnd = 0
      for (let i = startLineIdx; i <= targetEndLineIdx; i++) {
        if (e.shiftKey) {
          if (lines[i].startsWith(TAB)) {
            lines[i] = lines[i].slice(TAB.length)
            if (i === startLineIdx) deltaStart -= TAB.length
            deltaEnd -= TAB.length
          } else if (lines[i].startsWith('\t')) {
            lines[i] = lines[i].slice(1)
            if (i === startLineIdx) deltaStart -= 1
            deltaEnd -= 1
          }
        } else {
          lines[i] = TAB + lines[i]
          if (i === startLineIdx) deltaStart += TAB.length
          deltaEnd += TAB.length
        }
      }
      const next = lines.join('\n')
      const nextStart = Math.max(0, start + deltaStart)
      const nextEnd = Math.max(nextStart, end + deltaEnd)
      applyEdit(next, nextStart, nextEnd)
      return
    }

    const PAIRS: Record<string, string> = {
      '{': '}',
      '[': ']',
      '(': ')',
      '"': '"',
      "'": "'",
      '`': '`',
    }

    // Smart Enter inside {} -> newline + indentation + aligned closing brace
    if (e.key === 'Enter') {
      const before = text[start - 1]
      const after = text[start]
      if (before === '{' && after === '}') {
        e.preventDefault()
        const lineStart = findLineStart(text, start)
        const indent = getIndentOfLine(text, lineStart)
        const innerIndent = indent + '  '
        const insert = `\n${innerIndent}\n${indent}`
        const next = text.slice(0, start) + insert + text.slice(start)
        const cursor = start + 1 + innerIndent.length
        applyEdit(next, cursor, cursor)
        return
      }
    }

    // Auto-pairing + selection wrapping
    if (Object.prototype.hasOwnProperty.call(PAIRS, e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const open = e.key
      const close = PAIRS[open]

      // Skip over quotes if next char is same quote
      if ((open === '"' || open === "'" || open === '`') && start === end && text[start] === open) {
        e.preventDefault()
        applyEdit(text, start + 1, start + 1)
        return
      }

      // Wrap selection
      if (start !== end) {
        e.preventDefault()
        const selected = text.slice(start, end)
        const next = text.slice(0, start) + open + selected + close + text.slice(end)
        applyEdit(next, start + 1, end + 1)
        return
      }

      // Insert pair
      e.preventDefault()
      const next = text.slice(0, start) + open + close + text.slice(end)
      applyEdit(next, start + 1, start + 1)
      return
    }

    // Skip over existing closers
    const CLOSERS = new Set(['}', ']', ')'])
    if (CLOSERS.has(e.key) && start === end && text[start] === e.key) {
      e.preventDefault()
      applyEdit(text, start + 1, start + 1)
      return
    }
  }

  function check() {
    if (!expected) {
      setCheckMessage('No auto-check for this assignment yet. Run it and verify manually.')
      props.onMarkCompleted()
      return
    }
    const actual = normalizeStdout(stdout)
    const exp = normalizeStdout(expected)
    if (stderr.trim()) {
      setCheckMessage('Your program has an error. Fix stderr first, then re-run.')
      return
    }
    if (actual === exp) {
      setCheckMessage('Correct output. Assignment completed.')
      props.onMarkCompleted()
    } else {
      setCheckMessage('Output does not match expected yet. Keep going and try again.')
    }
  }

  if (!props.isUnlocked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 14 }}>{props.topic.assignment?.title || 'Assignment'}</div>
        <div style={{ opacity: 0.8 }}>
          Locked. First read through the topic code (use Next until the end). Then the assignment unlocks.
        </div>
      </div>
    )
  }

  if (!props.topic.assignment) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 14 }}>Assignment</div>
        <div style={{ opacity: 0.8 }}>
          This topic is in the catalog, but we haven’t authored an interactive assignment for it yet.
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a className="btn btnPrimary" href={props.topic.externalUrl} target="_blank" rel="noreferrer">
            Open Go by Example
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 14 }}>{props.topic.assignment.title}</div>
          <div style={{ opacity: 0.75, fontSize: 13 }}>{props.topic.assignment.prompt}</div>
        </div>
        {props.isCompleted ? <span className="badge badge--done">done</span> : <span className="badge badge--locked">incomplete</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
        <textarea
          ref={textareaRef}
          className="codeEditor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onEditorKeyDown}
          spellCheck={false}
          style={{
            flex: 1,
            width: '100%',
            minHeight: 220,
            resize: 'vertical',
          }}
        />

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn btnPrimary" onClick={run} disabled={isRunning}>
              {isRunning ? 'Running…' : 'Run'}
            </button>
            <button className="btn" onClick={check} disabled={isRunning}>
              Check
            </button>
          </div>
          {expected ? (
            <div style={{ opacity: 0.65, fontSize: 12 }}>
              Expected stdout: <span className="kbd">{expected.replace(/\n/g, '\\n')}</span>
            </div>
          ) : null}
        </div>

        {checkMessage ? (
          <div
            style={{
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.02)',
              padding: 10,
              opacity: 0.9,
            }}
          >
            {checkMessage}
          </div>
        ) : null}

        <OutputConsole stdout={stdout} stderr={stderr} />
      </div>
    </div>
  )
}


