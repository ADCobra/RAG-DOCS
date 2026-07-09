from pinecone import Pinecone

import os


def get_pinecone_client():
  api_key = os.getenv("PINECONE_API_KEY")
  return Pinecone(api_key=api_key)


def get_pinecone_index(index_name: str):
  pc = get_pinecone_client()
  return pc.Index(index_name)
