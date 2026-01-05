import { useEffect, useMemo, useState } from 'react'
import type { Topic } from '../content/topics'

type CodeExplainerProps = {
  topic: Topic
  onFinishedReading: () => void
  isRead: boolean
}

function getLines(code: string) {
  // Preserve final blank line in display if present.
  const raw = code.replace(/\r\n/g, '\n')
  const lines = raw.endsWith('\n') ? raw.slice(0, -1).split('\n') : raw.split('\n')
  return lines
}

export function CodeExplainer(props: CodeExplainerProps) {
  const lines = useMemo(() => getLines(props.topic.code || ''), [props.topic.code])
  const [activeLine, setActiveLine] = useState(1)

  useEffect(() => {
    setActiveLine(1)
  }, [props.topic.id])

  const note = props.topic.lineNotes?.[activeLine] || 'Blank/formatting line (keeps code readable).'

  function next() {
    setActiveLine((n) => {
      const next = Math.min(lines.length, n + 1)
      if (next === lines.length) props.onFinishedReading()
      return next
    })
  }

  function prev() {
    setActiveLine((n) => Math.max(1, n - 1))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 14 }}>{props.topic.title}</div>
          <div style={{ opacity: 0.75, fontSize: 13 }}>Step through the code line by line.</div>
        </div>
        {props.isRead ? <span className="badge badge--read">read</span> : <span className="badge badge--locked">not read</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>
        <div className="codeCard" style={{ padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>
            Definition
          </div>
          <div style={{ opacity: 0.9 }}>{props.topic.definition}</div>
        </div>
        <div className="codeCard" style={{ padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>
            Context
          </div>
          <div style={{ opacity: 0.9 }}>{props.topic.context}</div>
        </div>
      </div>

      {!props.topic.code ? (
        <div className="codeCard" style={{ padding: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Walkthrough not authored yet</div>
          <div style={{ opacity: 0.8, marginBottom: 10 }}>
            This topic is included in the full catalog, but we haven’t written the interactive line-by-line walkthrough for it yet.
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a className="btn btnPrimary" href={props.topic.externalUrl} target="_blank" rel="noreferrer">
              Open Go by Example
            </a>
            <button className="btn" onClick={props.onFinishedReading}>
              Mark as read
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12, minHeight: 0 }}>
        <div style={{ minHeight: 0 }}>
          <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>
            Code (click a line)
          </div>
          <div className="codeCard" style={{ minHeight: 280 }}>
            <pre
              style={{
                margin: 0,
                padding: 10,
                fontSize: 13,
                lineHeight: 1.55,
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              }}
            >
              {lines.map((text, idx) => {
                const lineNo = idx + 1
                const isActive = lineNo === activeLine
                return (
                  <div
                    key={lineNo}
                    onClick={() => setActiveLine(lineNo)}
                    className={isActive ? 'codeLine codeLineActive' : 'codeLine'}
                  >
                    <span style={{ opacity: 0.55, textAlign: 'right' }}>{lineNo}</span>
                    <span style={{ whiteSpace: 'pre' }}>{text}</span>
                  </div>
                )
              })}
            </pre>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 800, textTransform: 'uppercase' }}>
            Explanation (line {activeLine})
          </div>
          <div
            style={{
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.02)',
              padding: 12,
              overflow: 'auto',
              minHeight: 140,
            }}
          >
            <div style={{ opacity: 0.9 }}>{note}</div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="kbd">
                {activeLine}/{lines.length}
              </span>
              <span style={{ opacity: 0.7, fontSize: 13 }}>Tip: use Next to read in order.</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={prev} disabled={activeLine <= 1}>
                Prev
              </button>
              <button className="btn" onClick={next} disabled={activeLine >= lines.length}>
                Next
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a className="btn" href={props.topic.externalUrl} target="_blank" rel="noreferrer">
              Go by Example
            </a>
          </div>

          {props.topic.docs?.length ? (
            <div style={{ opacity: 0.9 }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Docs</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {props.topic.docs.map((d) => (
                  <li key={d.url}>
                    <a href={d.url} target="_blank" rel="noreferrer">
                      {d.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      )}
    </div>
  )
}


