import { useState } from 'react'
import CodeEditor from './components/Editor'
import Output from './components/Output'
import './App.css'

function App() {
  const [code, setCode] = useState('<?php echo 1+1;')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const runCode = async () => {
    setOutput('')
    setError('')
    setIsRunning(true)

    try {
      const response = await fetch('http://localhost:3000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      setOutput(data.output ?? '')
      setError(data.error ?? '')
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Failed to call /run API',
      )
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <main className="app-container">
      <h1>PHP Runner</h1>

      <section className="panel">
        <CodeEditor code={code} setCode={setCode} />
      </section>

      <section className="actions">
        <button type="button" onClick={runCode} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </section>

      <section className="panel">
        <Output output={output} error={error} />
      </section>
    </main>
  )
}

export default App
