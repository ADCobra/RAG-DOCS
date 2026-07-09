import fitz
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from fastapi import File, UploadFile
from dotenv import load_dotenv
from app.config.pinecone import get_pinecone_client
from app.config.langchain import get_embeddings

import pdfplumber
import uuid
from io import BytesIO

load_dotenv()


embeddings = get_embeddings()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, separators=["\n\n", "\n", " ", ""])
pc = get_pinecone_client()
index = pc.Index("genai-multidoc-rag")

async def upload_pdf(chat_id: str, user_id: str, file: UploadFile = File(...)):
  full_text = ""
  page_texts = []
  content = await file.read()

  with fitz.open(stream=content, filetype="pdf") as doc:            
    for page in doc:
      full_text += str(page.get_text())
      page_texts.append(len(page.get_text()))

  texts = text_splitter.split_text(full_text)
  page_number = 1
  count_words = 0
  docs = []

  for i, text in enumerate(texts):
    count_words += len(text.split())
    # Find which page this chunk belongs to

    count_words += len(text.split())
    if count_words >= page_texts[page_number]:
      page_number += 1
    docs.append({"page_content": text, "page": page_number})

  embedding_vectors = embeddings.embed_documents([doc["page_content"] for doc in docs])
  index.upsert(
    vectors=[(str(uuid.uuid4()), vec, {"page_content": docs[i]["page_content"], "page": docs[i]["page"], "chat_id": chat_id, "user_id": user_id, "file_name": file.filename}) for i, vec in enumerate(embedding_vectors)], 
    namespace="rag-uploads"
  )

  return {"num_pages": len(page_texts), "num_chunks": len(docs)}

async def upload_text(chat_id: str, user_id: str, file: UploadFile = File(...)):
  if not chat_id or not user_id:
    return {"error": "chat_id and user_id are required for text files."}
  content = (await file.read()).decode("utf-8")
  texts = text_splitter.split_text(content)
  docs = [{"page_content": text} for text in texts]

  embedding_vectors = embeddings.embed_documents([doc["page_content"] for doc in docs])
  index.upsert(
    vectors=[(str(uuid.uuid4()), vec, {"page_content": docs[i]["page_content"], "chat_id": chat_id, "user_id": user_id, "file_name": file.filename}) for i, vec in enumerate(embedding_vectors)], 
    namespace="rag-uploads"
  )

  return {"num_chunks": len(docs), "embeddings_sample": embedding_vectors[:2]}


async def delete_chat_files(chat_id: str):
  query_response = index.query(
    namespace="rag-uploads",
    vector=[0.0] * 768,
    filter={"chat_id": chat_id},
    top_k=1000
  )
  if not query_response.get("matches"): # type: ignore
    return {"deleted_count": 0}
  ids_to_delete = [match["id"] for match in query_response["matches"]] # pyright: ignore[reportIndexIssue]
  if ids_to_delete:
    index.delete(ids=ids_to_delete, namespace="rag-uploads")
  return {"deleted_count": len(ids_to_delete)}