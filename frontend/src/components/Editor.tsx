import Editor from '@monaco-editor/react'

type CodeEditorProps = {
  code: string
  setCode: (value: string) => void
  onRun: () => void
  isRunning: boolean
}

export default function CodeEditor({ code, setCode, onRun, isRunning }: CodeEditorProps) {
  return (
    <div className="editor-panel">
      <div className="editor-header">
        <div className="editor-filename">index.php</div>
        <button 
          type="button"
          className="run-button"
          onClick={onRun}
          disabled={isRunning}
          aria-busy={isRunning}
          aria-label={isRunning ? 'Running PHP code' : 'Run PHP code (Ctrl/Cmd + Enter)'}
          title="Run (Ctrl/Cmd + Enter)"
        >
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </div>
      <div className="editor-body">
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="php"
          value={code}
          onChange={(value) => setCode(value ?? '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Roboto Mono, monospace',
            lineNumbers: 'on',
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            renderWhitespace: 'none',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  )
}
