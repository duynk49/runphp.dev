# runphp.dev

**runphp.dev** is a minimal online PHP playground that allows developers to execute PHP code instantly in a secure, isolated environment — directly from the browser.

---

## Overview

The project is designed to provide a fast, no-setup experience for running PHP snippets. It focuses on simplicity, safety, and low-latency execution.

### Key Characteristics

* No installation required
* Instant code execution
* Isolated sandbox environment (Docker-based)
* Lightweight architecture
* Designed for extensibility

---

## Architecture

```
Frontend (Vite + React + Monaco)
        ↓
Fastify API (Node.js)
        ↓
Docker Sandbox (PHP CLI)
```

---

## Project Structure

```
runphp.dev/
├── frontend/   # Vite + React app (code editor UI)
├── backend/    # Fastify API (execution service)
└── README.md
```

---

## Tech Stack

### Frontend

* Vite
* React
* Monaco Editor

### Backend

* Node.js
* Fastify

### Execution Layer

* Docker
* PHP CLI (official image)

---

## How It Works

1. User writes PHP code in the browser
2. Frontend sends code to the backend via HTTP
3. Backend runs the code inside a Docker container
4. Output (stdout / stderr) is captured
5. Result is returned to the frontend

---

## API

### `POST /run`

Execute PHP code.

#### Request

```json
{
  "code": "<?php echo 1+1;"
}
```

#### Response

```json
{
  "output": "2",
  "error": null
}
```

---

## Security

Execution is sandboxed using Docker with strict limitations:

* No network access
* Memory limit (e.g. 128MB)
* CPU limit
* Read-only filesystem
* Process limits
* Execution timeout

This reduces the risk of malicious or abusive code execution.

---

## Local Development

### Requirements

* Node.js (>= 18)
* Docker

---

## Docker Setup

Build the sandbox image used by the backend executor:

```bash
cd docker
docker build -t runphp-8.2:latest .
```

Optional: verify the image is available:

```bash
docker images | grep runphp-8.2
```

Optional: quick sanity check that PHP runs inside the image:

```bash
docker run --rm runphp-8.2:latest php -v
```

---

### Backend

```bash
cd backend
npm install
node src/app.js
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Notes

* This project is optimized for MVP simplicity
* Not intended for heavy production workloads (yet)
* Execution latency depends on Docker cold start

---

## Future Enhancements

* Snippet sharing via URL
* Multiple PHP versions
* Container pooling (performance optimization)
* Rate limiting & abuse protection
* Persistent storage (database)
* Authentication

---

## License

MIT

