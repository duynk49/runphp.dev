import { useState, useEffect, useCallback } from 'react'
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

  const runCode = useCallback(async () => {
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
  }, [code])

  // Handle Cmd/Ctrl + Enter keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        runCode()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [runCode])

  return (
    <main className="app-container" role="main" aria-label="PHP Code Executor Application">
      <div className="split-layout">
        <CodeEditor 
          code={code} 
          setCode={setCode} 
          onRun={runCode}
          isRunning={isRunning}
        />
        <Output 
          output={output} 
          error={error}
          isRunning={isRunning}
        />
      </div>
    </main>
  )
}

export default App
