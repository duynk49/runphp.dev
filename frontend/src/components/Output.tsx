type OutputProps = {
  output: string
  error: string
}

export default function Output({ output, error }: OutputProps) {
  return (
    <div className="output-panel">
      <div className="output-title">Output:</div>
      <pre>{output || 'No output yet'}</pre>

      {error && (
        <>
          <div className="error-title">Error:</div>
          <pre>{error}</pre>
        </>
      )}
    </div>
  )
}
