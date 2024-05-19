from typing import Annotated
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_community.document_loaders import OnlinePDFLoader
import os
from io import BytesIO
from PyPDF2 import PdfReader
import openai 

import streamlit as st
from langchain import OpenAI
from langchain.docstore.document import Document
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain

load_dotenv()
app = FastAPI()

def generate_response(txt):
    try:
        # Instantiate the LLM model
        llm = OpenAI(temperature=0, openai_api_key="sk-proj-w4QMIC9BbF6AEHrvRwCgT3BlbkFJ2TGuzXhYoOeciEkXrPBL")
        
        # Split text
        text_splitter = CharacterTextSplitter()
        texts = text_splitter.split_text(txt)
        
        # Create multiple documents
        docs = [Document(page_content=t) for t in texts]
        
        # Summarization chain
        chain = load_summarize_chain(llm, chain_type='map_reduce')
        
        return chain.run(docs)
    except Exception as e:
        raise RuntimeError(f"Error generating response: {str(e)}")
    
@app.post("/summarize-pdf")
async def create_pdf_summary(file: UploadFile = File(...)):
    # Langchain + LLM summarizer

    if file.content_type != 'application/pdf':
        return JSONResponse(content={"error": "File format not supported. Please upload a PDF file."}, status_code=400)

    try:
        pdf_data = await file.read()
        document = PdfReader(BytesIO(pdf_data))
        text = ""
        # Get the number of pages in the PDF
        num_pages = len(document.pages)
        text = ""
        for page_num in range(num_pages):
            page = document.pages[page_num]
            text += page.extract_text()
        
        if not text:
            raise HTTPException(status_code=500, detail="No text found in the PDF file.")
        
        summary = await generate_response(text)
        print(summary)

    # Might need a pdfloader instead of above ^
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF file: {str(e)}")
    # Use LangChain/OpenAI to process the text and generate a summary
    

    return JSONResponse(content={"filename": file.filename, "content": text})


@app.post("/files/")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}

@app.post("/summarize-section")
def create_section_summary(text: str):
    try:
        text = "Cloud computing has become a widely exploited research area in academia and industry. Cloud computing benefits both cloud services providers (CSPs) and consumers. The security challenges associated with cloud computing have been widely studied in the literature. This systematic literature review (SLR) is aimed to review the existing research studies on cloud computing security, threats, and challenges."
        # Generate summary for the provided text
        summary = generate_response(text)
        
        # Return the summary
        return JSONResponse(content={"content": text, "summary":summary})
    
    except Exception as e:
        raise RuntimeError(f"Error summarizing section: {str(e)}")