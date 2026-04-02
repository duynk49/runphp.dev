import { useState } from 'react'
import CodeEditor from './components/Editor'
import Output from './components/Output'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

function App() {
  const [code, setCode] = useState(`<?php

// Simple math
echo "1 + 1 = " . (1 + 1) . "\n";

// Function example
function greet($name) {
    return "Hello, $name!";
}

echo greet("runphp.dev") . "\n";

// Array + loop
$items = ["PHP", "Fastify", "React"];

foreach ($items as $item) {
    echo "- $item\n";
}

// JSON output (useful for your API)
$data = [
    "status" => "ok",
    "time" => date("c"),
];

echo json_encode($data, JSON_PRETTY_PRINT);
`)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const runCode = async () => {
    setOutput('')
    setError('')
    setIsRunning(true)

    try {
      const response = await fetch(`${API_BASE_URL}/run`, {
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
