import { useEffect, useMemo, useRef, useState } from 'react'
import { OutputConsole } from './OutputConsole'
import { runGo } from '../lib/goRunnerClient'

type PlaygroundProps = {
  isOpen: boolean
  onClose: () => void
  initialCode: string
}

const DEFAULT_CODE = `package main

import "fmt"

func main() {
  fmt.Println("Hello from the playground")
}
`

export function Playground(props: PlaygroundProps) {
  const [code, setCode] = useState(props.initialCode || DEFAULT_CODE)
  const [stdout, setStdout] = useState('Playground wired. WASM runner comes next.')
  const [stderr, setStderr] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const title = useMemo(() => 'Playground (in-browser Go)', [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!props.isOpen) return
      if (e.key === 'Escape') props.onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [props])

  useEffect(() => {
    if (!props.isOpen) return
    setCode(props.initialCode || DEFAULT_CODE)
  }, [props.initialCode, props.isOpen])

  if (!props.isOpen) return null

  function run() {
    setIsRunning(true)
    setStdout('')
    setStderr('')

    runGo(code, { timeoutMs: 2000 })
      .then(({ stdout, stderr }) => {
        setStdout(stdout)
        setStderr(stderr)
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : String(e)
        setStdout('')
        setStderr(message + '\n')
      })
      .finally(() => setIsRunning(false))
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
    // Keep cursor/selection stable after React state updates
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
      if (!isRunning) run()
      return
    }

    // Tab / Shift+Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault()
      const TAB = '  '
      // Multi-line selection: indent/outdent all touched lines
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

    // Smart Enter inside {} -> adds newline + indentation + closing brace alignment
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

      // If typing a quote and next char is same quote, skip over it.
      if ((open === '"' || open === "'" || open === '`') && start === end && text[start] === open) {
        e.preventDefault()
        applyEdit(text, start + 1, start + 1)
        return
      }

      // If selection exists, wrap it.
      if (start !== end) {
        e.preventDefault()
        const selected = text.slice(start, end)
        const next = text.slice(0, start) + open + selected + close + text.slice(end)
        applyEdit(next, start + 1, end + 1)
        return
      }

      // Normal: insert pair and put caret in between.
      e.preventDefault()
      const next = text.slice(0, start) + open + close + text.slice(end)
      applyEdit(next, start + 1, start + 1)
      return
    }

    // Skip over existing closing braces/brackets/parens if user types them
    const CLOSERS = new Set(['}', ']', ')'])
    if (CLOSERS.has(e.key) && start === end && text[start] === e.key) {
      e.preventDefault()
      applyEdit(text, start + 1, start + 1)
      return
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        zIndex: 50,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) props.onClose()
      }}
    >
      <div
        style={{
          width: 'min(1100px, 100%)',
          height: 'min(720px, 100%)',
          background: 'rgba(20,22,28,0.98)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 14,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <div
          style={{
            padding: 12,
            borderBottom: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <div style={{ fontWeight: 800 }}>{title}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn"
              disabled={isRunning}
              onClick={run}
            >
              {isRunning ? 'Running…' : 'Run'}
            </button>
            <button className="btn" onClick={props.onClose}>
              Close <span className="kbd">Esc</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, padding: 12, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: 10 }}>
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
                resize: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: 10 }}>
            <OutputConsole stdout={stdout} stderr={stderr} />
            <div style={{ opacity: 0.7, fontSize: 13 }}>
              Tip: keep snippets small. In MVP we’ll support core language features; packages and file I/O will be limited.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


