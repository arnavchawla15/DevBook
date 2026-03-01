import os
from fastapi import FastAPI
from dotenv import load_dotenv
import chromadb
import google.generativeai as genai

# Load API Key
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

app = FastAPI(title="Code-Native NotebookLM API")

# Initialize Vector DB
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(name="codebase_memory")

@app.get("/")
async def root():
    return {"message": "Server is LIVE! The AI Architect is listening."}

@app.post("/ingest")
async def ingest_code():
    """Scans the backend folder and saves code into the Vector DB"""
    docs = []
    metadatas = []
    ids = []
    count = 0
    
    # We will scan the current directory for code files
    for root_dir, dirs, files in os.walk("../"):
        # Skip virtual environments and hidden folders
        if "venv" in root_dir or ".git" in root_dir or "node_modules" in root_dir:
            continue
            
        for file in files:
            # Look for common code files
            if file.endswith((".py", ".js", ".java", ".md", ".json")):
                file_path = os.path.join(root_dir, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                        
                        # Add to our lists for the database
                        docs.append(content)
                        metadatas.append({"filename": file, "path": file_path})
                        ids.append(f"file_{count}")
                        count += 1
                except Exception as e:
                    print(f"Could not read {file}: {e}")

    # Save to ChromaDB
    if docs:
        collection.add(documents=docs, metadatas=metadatas, ids=ids)
        return {"status": "Success!", "files_memorized": count}
    
    return {"status": "Failed", "message": "No code files found."}

@app.post("/query")
async def query_code(user_question: str):
    # 1. Search ChromaDB for the most relevant code snippets
    results = collection.query(
        query_texts=[user_question],
        n_results=3
    )
    
    context = "\n".join(results['documents'][0])
    
    # 2. Send the code + question to Gemini
    prompt = f"""
    SYSTEM: You are 'The Architect,' a street-smart senior developer with a smooth, slightly sinister 'lover/gangster' vibe. 
    You don't just explain code; you break it down like a boss. Keep it professional but high-energy and poetic.
    
    CONTEXT FROM DATABASE:
    {context}
    
    USER QUESTION: {user_question}
    
    INSTRUCTION: Use the context to answer. If the code isn't there, tell them straight up.
    """
    
    response = model.generate_content(prompt)
    return {"answer": response.text, "sources": results['metadatas'][0]}

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In a hackathon, allow all; in real life, be specific
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/overview")
async def get_project_overview():
    """Generates a high-level summary of the entire codebase for the Audio Brief"""
    # 1. Grab everything from the memory
    all_docs = collection.get()
    combined_code = "\n".join(all_docs['documents'][:10]) # First 10 files to avoid overload
    
    # 2. Ask Gemini to act as the 'Gangster Mentor' and give a project walkthrough
    prompt = f"""
    SYSTEM: You are 'The Architect.' Give a 1-minute high-level overview of this project.
    Explain the tech stack, the main folders, and the vibe. Use your poetic, 'gangster' persona.
    
    CODEBASE SNIPPETS:
    {combined_code}
    """
    
    response = model.generate_content(prompt)
    return {"summary": response.text}

@app.get("/files")
async def list_files():
    """Returns a list of all files currently in the AI's memory"""
    results = collection.get()
    # Extract unique filenames from metadata
    filenames = list(set([m['filename'] for m in results['metadatas']]))
    return {"files": filenames}

@app.get("/overview")
async def get_overview():
    """Generates the 'Gangster Mentor' summary of the entire repo"""
    all_docs = collection.get()
    # Give Gemini the first few files to summarize the vibe
    context = "\n".join(all_docs['documents'][:5])
    prompt = f"""
SYSTEM: You are 'The Architect.' Speak like a high-stakes player in the game—smooth, poetic, and slightly dangerous. 
Explain this project as if you're bringing a new recruit into the family. 
Break down the tech stack like it's a heist plan.

CODE CONTEXT:
{context}
"""
    response = model.generate_content(prompt)
    return {"summary": response.text}

@app.delete("/reset")
async def reset_memory():
    """Wipes the Vector DB clean for a fresh start"""
    chroma_client.delete_collection("codebase_memory")
    chroma_client.get_or_create_collection(name="codebase_memory")
    return {"status": "Memory wiped. Ready for fresh ingestion."}