# ChatGPT UI with Ollama

A local ChatGPT-style web interface connected to Ollama for running
Large Language Models (LLMs) locally.

This project allows you to: - Run local LLM models using Ollama -
Interact through a ChatGPT-style UI - Extend for enterprise AI, RAG, or
agent-based workflows

------------------------------------------------------------------------

# 🚀 Prerequisites

Before running this project, make sure you have installed:

-   Node.js (v18 or higher recommended)
-   npm (comes with Node.js)
-   Ollama

------------------------------------------------------------------------

# 🧠 Install Ollama

Download and install Ollama from:

https://ollama.com

After installation, verify:

    ollama --version

------------------------------------------------------------------------

# 📂 Open Project in VS Code

1.  Open VS Code
2.  Click File → Open Folder
3.  Select your project folder `ChatGPT-UI-with-Ollama`

------------------------------------------------------------------------

# 📦 Install Project Dependencies

Open Terminal inside VS Code:

    Terminal → New Terminal

Then run:

    npm install

This will install all required dependencies.

------------------------------------------------------------------------

# 🤖 Pull an Ollama Model

Before running the UI, download a model.

Example:

    ollama pull llama3

To see installed models:

    ollama list

------------------------------------------------------------------------

# ▶️ Start Ollama Server

Run:

    ollama serve

Ollama will start at:

    http://localhost:11434

Keep this terminal running.

------------------------------------------------------------------------

# 💻 Run the ChatGPT UI

Open a new terminal in VS Code and run:

    npm run dev

The application will start at:

    http://localhost:3000

Open this URL in your browser.

------------------------------------------------------------------------

# ⚙️ Environment Configuration (If Required)

If your project uses environment variables:

Create a file in root:

    .env

Example:

    OLLAMA_BASE_URL=http://localhost:11434
    MODEL_NAME=llama3

Do NOT commit `.env` to GitHub.

------------------------------------------------------------------------

# 📁 Project Structure

    /frontend
    /src
    /public
    package.json
    .gitignore
    README.md

------------------------------------------------------------------------

# 🛑 Important Notes

-   Do NOT commit `node_modules`
-   Do NOT commit `.env`
-   Do NOT commit large model files (.gguf, .bin)
-   Always start Ollama before running the UI

------------------------------------------------------------------------

# 🧪 Troubleshooting

## Port Already in Use

Stop other running processes or change the port.

## Model Not Responding

Make sure: - Ollama is running - The model is downloaded - Port 11434 is
accessible

## npm install Fails

Ensure Node.js version is 18+

Check version:

    node -v

------------------------------------------------------------------------

# 🔮 Future Improvements

-   Add RAG (Retrieval-Augmented Generation)
-   Add multi-model selection
-   Add admin configuration panel
-   Add agent-based workflows
-   Dockerize for production deployment
-   Add plugin support for external integration

------------------------------------------------------------------------

# 👨‍💻 Author

Sajid Ahmad\
Building AI Platform with Ollama + ChatGPT UI
