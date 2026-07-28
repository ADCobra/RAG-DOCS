from collections.abc import Callable
from typing import Any, Optional, Dict
from langchain.agents import create_agent
from langchain.agents.middleware.types import ModelRequest, ModelResponse
from langchain.chat_models import init_chat_model
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.agents.middleware import AgentMiddleware
from langchain_core.prompts import PromptTemplate
from langgraph.checkpoint.memory import InMemorySaver
from dataclasses import dataclass
from datetime import datetime

from dotenv import load_dotenv

from app.config.pinecone import get_pinecone_client

load_dotenv()

prompt = """
You are an AI assistant that helps answer questions based on the following context from PDF documents:
{response}
Question: {question}
Provide a concise and accurate answer.
"""

prompt_template = PromptTemplate.from_template(prompt)

chat_model = None
checkpointer = InMemorySaver()

def get_chat_model():
    global chat_model
    if chat_model is not None:
        return chat_model
    chat_model = init_chat_model(
        "google_genai:gemini-2.5-flash-lite", 
        temperature=0.4,
        max_tokens=1000,
        timeout=30
    )
    return chat_model

def semantic_search(chat_id: str, query: str, top_k: int = 3):
    pc = get_pinecone_client()
    index = pc.Index("genai-rag-docs")
    query_embedding = pc.inference.embed(
        model="multilingual-e5-large",
        inputs=[query],
        parameters={"input_type": "passage", "truncate": "END"}
    )
    search_results = index.query(
        vector=query_embedding[0]['values'],
        top_k=top_k,
        namespace="rag-uploads",
        filter={"chat_id": chat_id},
        include_metadata=True
    )
    return search_results

    
@dataclass
class AgentContext:
    chat_id: str

class CustomMiddleware(AgentMiddleware[Any, AgentContext]):
    def __init__(self, namespace: str, top_k: int = 3):
        self.namespace = namespace
        self.top_k = top_k
        
    def wrap_model_call(self, request: ModelRequest, handler: Callable[[ModelRequest], ModelResponse]) -> ModelResponse:
        message = request.messages[-1].content
        chat_id = request.runtime.context.chat_id # type: ignore

        if message and chat_id:
            result = semantic_search(chat_id, str(message), self.top_k)
            texts_content = "".join([f"{match['metadata']['page_content']}\n" for match in result['matches']]) # type: ignore
            augmented_message = prompt_template.format(response=texts_content, question=message)
            new_messages = [{"role": "system", "content": augmented_message}] + request.messages
            request.messages = new_messages # type: ignore

            self.retrived_docs = [{"file_name": r['metadata']['file_name'], "page": r['metadata'].get("page", 0)} for r in result['matches']]  # type: ignore
        print(datetime.utcnow(), " - Sending request to model")
        return handler(request)

def get_langchain_agent(middle: CustomMiddleware = CustomMiddleware(namespace="rag-uploads", top_k=3)):

    agent = create_agent(
        model=get_chat_model(), 
        middleware=[middle],
        context_schema=AgentContext,
        checkpointer=checkpointer
    )
    return agent