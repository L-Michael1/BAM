from typing import Annotated
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_community.document_loaders import OnlinePDFLoader
import os
import fitz

load_dotenv()
app = FastAPI()

@app.post("/summarize-pdf")
async def create_pdf_summary(file: UploadFile = File(...)):
    # Langchain + LLM summarizer

    if file.content_type != 'application/pdf':
        return JSONResponse(content={"error": "File format not supported. Please upload a PDF file."}, status_code=400)

    pdf_data = await file.read()

    try:
        document = fitz.open(stream=pdf_data, filetype="pdf")
        text = ""
        for page_num in range(len(document)):
            page = document.load_page(page_num)
            text += page.get_text()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF file: {str(e)}")

    # Might need a pdfloader instead of above ^

    # Use LangChain to process the text


    return JSONResponse(content={"filename": file.filename, "content": text})


@app.post("/files/")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}

@app.post("/summarize-section")
def create_section_summary():
    return {"Hello": "Section summary"}