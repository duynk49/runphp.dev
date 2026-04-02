import { useState, useEffect } from 'react'
import CodeEditor from './components/Editor'
import Output from './components/Output'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

function App() {
  // Update document title and meta tags
  useEffect(() => {
    document.title = 'RunPHP - Run PHP Code Online Instantly | Free PHP Executor'
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'RunPHP is a free online PHP code executor. Run, test, and execute PHP code instantly in your browser. Perfect for learning, testing snippets, and quick PHP projects.')
    }
  }, [])

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
    <main className="app-container" role="main" aria-label="PHP Code Executor Application">
      <header className="app-header">
        <h1>RunPHP</h1>
        <p className="app-subtitle">Run PHP Code Online Instantly</p>
      </header>

      <section className="editor-section" aria-labelledby="editor-heading">
        <h2 id="editor-heading" className="section-heading">PHP Code Editor</h2>
        <div className="panel">
          <CodeEditor code={code} setCode={setCode} />
        </div>
      </section>

      <section className="actions" aria-labelledby="actions-heading">
        <h2 id="actions-heading" className="visually-hidden">Actions</h2>
        <button 
          type="button" 
          onClick={runCode} 
          disabled={isRunning}
          aria-busy={isRunning}
          aria-label={isRunning ? 'Running PHP code' : 'Run PHP code'}
        >
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </section>

      <section className="output-section" aria-labelledby="output-heading">
        <h2 id="output-heading" className="section-heading">Output</h2>
        <div className="panel">
          <Output output={output} error={error} />
        </div>
      </section>
      
      <footer className="app-footer" role="contentinfo">
        <p>RunPHP • Free Online PHP Code Executor</p>
      </footer>
    </main>
  )
}

export default App
