import os
import re
from langchain_core.messages import AIMessage
import docx
from PyPDF2 import PdfReader

def doc_parser_node(state):
    messages = state.get("messages", [])
    last_message = messages[-1].content
    
    # Extract file path from the message
    file_paths = re.findall(r'([A-Za-z0-9_/\-\\:\.]+\.(?:pdf|docx|txt))', last_message, flags=re.IGNORECASE)
    
    if not file_paths:
        return {"messages": [AIMessage(content="DocParser Agent: No valid file path (.pdf, .docx, .txt) found in your request.", name="doc_parser")], "next": "supervisor"}
        
    file_path = file_paths[0]
    if not os.path.exists(file_path):
        return {"messages": [AIMessage(content=f"DocParser Agent: File not found at {file_path}", name="doc_parser")], "next": "supervisor"}
        
    ext = file_path.split('.')[-1].lower()
    text = ""
    try:
        if ext == 'txt':
            with open(file_path, 'r', encoding='utf-8') as f:
                text = f.read()
        elif ext == 'pdf':
            reader = PdfReader(file_path)
            for page in reader.pages:
                text += page.extract_text() + "\n"
        elif ext == 'docx':
            doc = docx.Document(file_path)
            text = "\n".join([p.text for p in doc.paragraphs])
            
        # Truncate to avoid context window explosion in LLMs
        if len(text) > 3000:
            text = text[:3000] + "\n...[TRUNCATED]"

        msg = AIMessage(content=f"DocParser Agent: Extracted content from {os.path.basename(file_path)}:\n\n{text}", name="doc_parser")
    except Exception as e:
        msg = AIMessage(content=f"DocParser Agent: Failed to parse {os.path.basename(file_path)}. Error: {e}", name="doc_parser")
        
    return {"messages": [msg], "next": "supervisor"}
