from typing import Annotated
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_community.document_loaders import OnlinePDFLoader
import os
from io import BytesIO
# from PyPDF2 import PdfReader 

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





# ** PDF STUFF - IF WE WANT TO IMPLEMENT LATER - IF WE DON'T CLEAN UP THE IMPORTS ABOVE TOO **
# @app.post("/summarize-pdf")
# async def create_pdf_summary(file: UploadFile = File(...)):
#     # Langchain + LLM summarizer

#     if file.content_type != 'application/pdf':
#         return JSONResponse(content={"error": "File format not supported. Please upload a PDF file."}, status_code=400)

#     try:
#         pdf_data = await file.read()
#         document = PdfReader(BytesIO(pdf_data))
#         text = ""
#         # Get the number of pages in the PDF
#         num_pages = len(document.pages)
#         text = ""
#         for page_num in range(num_pages):
#             page = document.pages[page_num]
#             text += page.extract_text()
        
#         if not text:
#             raise HTTPException(status_code=500, detail="No text found in the PDF file.")
        
#         summary = await generate_response(text)
#         print(summary)

#     # Might need a pdfloader instead of above ^
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error processing PDF file: {str(e)}")
#     # Use LangChain/OpenAI to process the text and generate a summary
    

#     return JSONResponse(content={"filename": file.filename, "content": text})


# @app.post("/files/")
# async def create_file(file: Annotated[bytes, File()]):
#     return {"file_size": len(file)}

# @app.get("/text")
# def read_hello(text: str):
#     print("meep")
#     return {"text": text}






# Function that returns an AI summary with inputted text
def AISummary(txt):
    try:
        # Instantiates the LLM model
        llm = OpenAI(temperature=0, openai_api_key="sk-proj-w4QMIC9BbF6AEHrvRwCgT3BlbkFJ2TGuzXhYoOeciEkXrPBL")
        
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