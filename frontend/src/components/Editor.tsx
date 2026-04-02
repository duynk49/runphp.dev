import Editor from '@monaco-editor/react'

type CodeEditorProps = {
  code: string
  setCode: (value: string) => void
}

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
  return (
    <Editor
      height="400px"
      defaultLanguage="php"
      value={code}
      onChange={(value) => setCode(value ?? '')}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
      }}
    />
  )
}
