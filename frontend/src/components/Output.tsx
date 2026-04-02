type OutputProps = {
  output: string
  error: string
  isRunning: boolean
}

export default function Output({ output, error, isRunning }: OutputProps) {
  const getStatus = (): 'idle' | 'running' | 'done' | 'error' => {
    if (isRunning) return 'running'
    if (error) return 'error'
    if (output || error) return 'done'
    return 'idle'
  }

  const status = getStatus()
  const displayContent = error || output || 'No output'

  return (
    <div className="output-panel">
      <div className="output-header">
        <div className="output-label">OUTPUT</div>
        <div className={`output-status status-${status}`}>{status}</div>
      </div>
      <div className="output-body">
        {isRunning ? (
          <pre className="output-content">Running...</pre>
        ) : (
          <pre className={`output-content ${error ? 'error' : ''}`}>
            {displayContent}
          </pre>
        )}
      </div>
    </div>
  )
}
