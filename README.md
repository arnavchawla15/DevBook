<div align="center">
  
# 📘 DevBook
**The Interactive AI Architect for Code Comprehension**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white)](https://fastapi.tiangolo.com/)
[![Groq](https://img.shields.io/badge/Groq-f55036?style=for-the-badge&logo=G&logoColor=white)](https://groq.com/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6F00?style=for-the-badge&logoColor=white)](https://www.trychroma.com/)

[**Live Demo (Vercel)**](#) <!-- Add your vercel link here soon -->

</div>

<br />

Welcome to **DevBook** — a lightning-fast, code-native visualization and explainer workspace. Backed by **Groq's Llama 3.1 8B**, DevBook completely transforms how developers read, understand, and debug massive amounts of unfamiliar code.

---

## ✨ Features & Modes

DevBook offers three powerful, context-aware analysis tools tailored to the exact granularity you need right now:

### 🔍 1. Explain Line (The Code Visualizer)
A dry, step-by-step state tracker. Highlight confusing lines and see exactly how variables mutate, their before/after values, and the exact triggers that caused the change, without any filler text.

### 📝 2. Explain Block (The Executive Summary)
Quickly grasp the "why" and "what" of structural loops and functions. Get an extremely concise 2-3 bullet point summary outlining the core purpose of entire code blocks. No fluff.

### 🕸️ 3. Flowchart (The Architectural Mindmap)
Visualize complex logic recursively. The flowchart mode completely bypasses text responses to generate an interactive, aesthetic JSON tree node map that visualizes the execution flow of the entire application.

---

## 🏗️ Technology Stack

**Frontend:**
- React 19 + TypeScript
- Vite
- React Markdown

**Backend:**
- Python FastAPI
- Groq Cloud API (Llama-3.1-8b-instant)
- ChromaDB (Persistent Vector Database storage)

---

## 🚀 Running Locally

To get the full interactive experience running on your own machine:

### 1. Backend Setup

Navigate to the `backend` directory, set up your Python environment, and start the FastAPI server:

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install fastapi uvicorn python-dotenv chromadb groq
```

Create a `.env` file inside the `backend/` folder and add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
```

Start the server:
```bash
uvicorn main:app --reload
```
*The backend will be live at `http://127.0.0.1:8000`*

### 2. Frontend Setup

Open a new terminal, navigate to the `frontend` directory, install Node dependencies, and start Vite:

```bash
cd frontend
npm install
npm run dev
```
*The application UI will emerge at `http://localhost:5173`*

---

## 🤝 Contributing
Have an idea to make DevBook even better? Feel free to fork the repository, create a feature branch, and open a Pull Request! The UI thrives on aesthetic glassmorphism and the backend relies on aggressive prompt constraints.

---

## 👥 The Builders

- **Arnav Chawla** – Deployment & Backend
- **Vivaan Veer Mahatha** – AI & Database Management, Backend
- **Ganesh Singh** – Frontend & Backend
- **Manya Sharma** – Frontend & Design
- **Tanmay Sahai** – PPT & Documentation

<div align="center">
  <i>Built to read code at the speed of thought.</i>
</div>
