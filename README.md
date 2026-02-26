# 🚀 AI Platform (Chat UI + AI Gateway)

This project contains:

-   🖥 Frontend (Next.js Chat UI)
-   ⚙ Backend (Express AI Gateway with Ollama)
-   🤖 Ollama LLM integration
-   🔄 Streaming support
-   🧠 Context-based state management

------------------------------------------------------------------------

# 📂 Project Structure

    ai-platform/
    │
    ├── frontend/
    │   └── chat-ui/        → Next.js application
    │
    ├── backend/
    │   └── ai-gateway/     → Express + Ollama integration

------------------------------------------------------------------------

# ✅ Prerequisites

Make sure the following are installed:

-   Node.js (v18+ recommended)
-   npm
-   Ollama (https://ollama.com)
-   VS Code

Check versions:

    node -v
    npm -v
    ollama --version

------------------------------------------------------------------------

# 🖥 1️⃣ Run Backend (AI Gateway)

### Step 1: Open VS Code

Open the root folder:

    ai-platform

### Step 2: Open Terminal in VS Code

    Terminal → New Terminal

### Step 3: Navigate to backend

    cd backend/ai-gateway

### Step 4: Install dependencies

    npm install

### Step 5: Make sure Ollama is running

If not already running:

    ollama serve

If you see port error, it means Ollama is already running.

### Step 6: Pull model (first time only)

Example:

    ollama pull llama3.2

Check installed models:

    ollama list

### Step 7: Start backend server

If using TypeScript:

    npx ts-node server.ts

Or if using npm script:

    npm run dev

You should see:

    AI Gateway running on port 5000

Backend URL:

    http://localhost:5000

------------------------------------------------------------------------

# 🌐 2️⃣ Run Frontend (Chat UI)

Open a new terminal in VS Code.

### Step 1: Navigate to frontend

    cd frontend/chat-ui

### Step 2: Install dependencies

    npm install

### Step 3: Start development server

    npm run dev

You should see:

    Local: http://localhost:3000

Open in browser:

    http://localhost:3000

------------------------------------------------------------------------

# 🔄 Full System Flow

1.  User types message in Chat UI
2.  Frontend sends request to: http://localhost:5000/api/chat
3.  Backend calls Ollama
4.  Ollama streams response
5.  Frontend displays streaming output

------------------------------------------------------------------------

# 🛑 Common Issues

## npm not recognized

Install Node.js from: https://nodejs.org

Restart VS Code after installation.

------------------------------------------------------------------------

## Port 11434 already in use

Ollama is already running. Do NOT run `ollama serve` again.

------------------------------------------------------------------------

## Cannot POST /api/chat

Make sure backend is running on port 5000.

------------------------------------------------------------------------

# ⚙ Environment Variables (Optional)

Create `.env` inside:

    backend/ai-gateway/

Example:

    PORT=5000
    OLLAMA_BASE_URL=http://localhost:11434

------------------------------------------------------------------------

# 🚀 Production Deployment (Basic)

Frontend:

    npm run build
    npm start

Backend:

Use PM2 or Docker for production.

------------------------------------------------------------------------

# 🧠 Next Steps

-   Add database persistence
-   Add Admin Panel
-   Add RAG support
-   Add Agent orchestration
-   Add n8n workflow integration

------------------------------------------------------------------------

# 👨‍💻 Author

Sajid Ahmad\
Building AI Platform with Ollama + ChatGPT style web UI (Fooundation)
