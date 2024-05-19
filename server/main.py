from typing import Annotated
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
from io import BytesIO
import streamlit as st
from langchain import OpenAI
from langchain.docstore.document import Document
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Loads FastAPI
load_dotenv()
app = FastAPI()

# CORS properties
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Function that returns an AI summary with inputted text
def AISummary(txt):
    try:
        # Instantiates the LLM model
        llm = OpenAI(temperature=0, openai_api_key=os.getenv("OPENAI_KEY"))
        
        # Split text
        text_splitter = CharacterTextSplitter()
        texts = text_splitter.split_text(txt)
        
        # Create multiple documents of the split text
        docs = [Document(page_content=t) for t in texts]
        
        # Loads the summarization chain with the map reduce method
        chain = load_summarize_chain(llm, chain_type='map_reduce')
        
        # Runs the LLM model with the documents, creating a summary of the documents and returning from the function
        return chain.run(docs)
    
    # Cathes errors
    except Exception as e:
        raise RuntimeError(f"Error generating response: {str(e)}")
    

# Structure to hold the incoming text fro the endpoint
class TextRequest(BaseModel):
    text: str

# Endpoint that takes in text and responds with an AI generated summary of the text
@app.post("/summarize-section")
def create_section_summary(req: TextRequest):
    try:
        # Uses the LLM to create a generate a summary with the provided text
        text = req.text
        summary = AISummary(text)
        
        # Returns the summary
        return JSONResponse(content={"content": text, "summary": summary})
    
    # Catches any errors
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error summarizing section: {str(e)}")