import fitz
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from fastapi import File, UploadFile
from dotenv import load_dotenv
from app.config.pinecone import get_pinecone_client
from docx import Document 

import pdfplumber
import uuid
from io import BytesIO

load_dotenv()

def chunk_array(arr, chunk_size):
  for i in range(0, len(arr), chunk_size):
    yield arr[i:i + chunk_size]

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, separators=["\n\n", "\n", " ", ""])
pc = get_pinecone_client()
index = pc.Index("genai-rag-docs")

# Must match the genai-rag-docs index, which multilingual-e5-large sizes at 1024.
# The deletion queries below send a zero vector purely to satisfy the API, but a
# mismatched length is still rejected with a 400.
INDEX_DIMENSION = 1024

async def upload_pdf(chat_id: str, user_id: str, file: UploadFile = File(...)):
  full_text = ""
  page_texts = []
  content = await file.read()

  with fitz.open(stream=content, filetype="pdf") as doc:            
    for page in doc:
      full_text += str(page.get_text())
      page_texts.append(len(page.get_text()))

  texts = text_splitter.split_text(full_text)
  page_number = 0
  count_words = 0
  docs = []

  for i, text in enumerate(texts):
    count_words += len(text.split())
    if count_words >= page_texts[page_number]:
      page_number += 1
    docs.append({"page_content": text, "page": page_number})

  # embedding_vectors = embeddings.embed_documents([doc["page_content"] for doc in docs])
  for chunk in chunk_array(docs, 96):
    embeddings = pc.inference.embed(
      model="multilingual-e5-large",
      inputs=[doc["page_content"] for doc in chunk],
      parameters={"input_type": "passage", "truncate": "END"}
    )
    index.upsert(
      vectors=[(str(uuid.uuid4()), vec['values'], {"page_content": chunk[i]["page_content"], "page": chunk[i]["page"], "chat_id": chat_id, "user_id": user_id, "file_name": file.filename}) for i, vec in enumerate(embeddings)], 
      namespace="rag-uploads"
    )

  return {"num_pages": len(page_texts), "num_chunks": len(docs)}

async def upload_text(chat_id: str, user_id: str, file: UploadFile = File(...)):
  if not chat_id or not user_id:
    return {"error": "chat_id and user_id are required for text files."}
  content = (await file.read()).decode("utf-8")
  texts = text_splitter.split_text(content)
  docs = [{"page_content": text} for text in texts]

  for chunk in chunk_array(docs, 96):    
    embedding_vectors = pc.inference.embed(
      model="multilingual-e5-large",
      inputs=[doc["page_content"] for doc in chunk],
      parameters={"input_type": "passage", "truncate": "END"}
    )
    index.upsert(
      vectors=[(str(uuid.uuid4()), vec['values'], {"page_content": chunk[i]["page_content"], "chat_id": chat_id, "user_id": user_id, "file_name": file.filename}) for i, vec in enumerate(embedding_vectors)], 
      namespace="rag-uploads"
    )

  return {"num_chunks": len(docs)}

async def upload_docx(chat_id: str, user_id: str, file: UploadFile = File(...)):
  content = await file.read()
  document = Document(BytesIO(content))
  full_text = ""
  page_texts = []
  for para in document.paragraphs:
    full_text += para.text + "\n"
    page_texts.append(len(para.text.split()))

  texts = text_splitter.split_text(full_text)
  page_number = 1
  count_words = 0
  docs = []

  for i, text in enumerate(texts):
    count_words += len(text.split())
    if count_words >= page_texts[page_number]:
      page_number += 1
    docs.append({"page_content": text, "page": page_number})

  for chunk in chunk_array(docs, 96):
    embedding_vectors = pc.inference.embed(
      model="multilingual-e5-large",
      inputs=[doc["page_content"] for doc in chunk],
      parameters={"input_type": "passage", "truncate": "END"}
    )
    index.upsert(
      vectors=[(str(uuid.uuid4()), vec['values'], {"page_content": chunk[i]["page_content"], "page": chunk[i]["page"], "chat_id": chat_id, "user_id": user_id, "file_name": file.filename}) for i, vec in enumerate(embedding_vectors)], 
      namespace="rag-uploads"
    )

  return {"num_pages": len(page_texts), "num_chunks": len(docs)}

async def delete_chat_files(chat_id: str):
  query_response = index.query(
    namespace="rag-uploads",
    vector=[0.0] * INDEX_DIMENSION,
    filter={"chat_id": chat_id},
    top_k=1000
  )
  if not query_response.get("matches"): # type: ignore
    return {"deleted_count": 0}
  ids_to_delete = [match["id"] for match in query_response["matches"]] # pyright: ignore[reportIndexIssue]
  if ids_to_delete:
    index.delete(ids=ids_to_delete, namespace="rag-uploads")
  return {"deleted_count": len(ids_to_delete)}

async def delete_user_docs(user_id: str):
  query_response = index.query(
    namespace="rag-uploads",
    vector=[0.0] * INDEX_DIMENSION,
    filter={"user_id": user_id},
    top_k=1000
  )

  if not query_response.get('matches'): # type: ignore
    return {"deleted_count": 0}
  
  ids_to_delete = [match['id'] for match in query_response['matches']] #pyright: ignore[reportIndexIssue]
  if ids_to_delete:
    index.delete(ids=ids_to_delete, namespace='rag-uploads')

  return {"deleted_count": len(ids_to_delete)}