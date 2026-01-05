type OutputConsoleProps = {
  stdout: string
  stderr: string
}

export function OutputConsole(props: OutputConsoleProps) {
  const hasErr = props.stderr.trim().length > 0

  return (
    <div
      className="codeCard"
      style={{
        overflow: 'hidden',
        borderColor: hasErr ? 'rgba(251,113,133,0.32)' : undefined,
        boxShadow: hasErr ? '0 0 0 3px rgba(251,113,133,0.10)' : undefined,
      }}
    >
      <div
        style={{
          padding: '8px 10px',
          borderBottom: '1px solid rgba(255,255,255,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', opacity: 0.8 }}>Output</div>
        {hasErr ? (
          <span className="badge badge--err">stderr</span>
        ) : (
          <span className="badge badge--read" style={{ boxShadow: 'none' }}>
            stdout
          </span>
        )}
      </div>

      <pre
        style={{
          margin: 0,
          padding: 10,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: 13,
          lineHeight: 1.45,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          color: hasErr ? '#ffd0d6' : 'inherit',
        }}
      >
        {hasErr ? props.stderr : props.stdout || '—'}
      </pre>
    </div>
  )
}


