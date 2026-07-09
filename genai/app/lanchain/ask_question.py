
from app.config.langchain import get_langchain_agent, AgentContext, CustomMiddleware
from app.scheama.ask_question import AskQuestionRequest


async def ask_question_service(request: AskQuestionRequest):
    middleware = CustomMiddleware(namespace="rag-uploads", top_k=3)
    agent = get_langchain_agent(middle=middleware)
    response = agent.invoke(
        {
          "messages": [{"role": "user", "content": request.question}],
        }, 
        context=AgentContext(chat_id=request.chat_id),
        config={"configurable": {"thread_id": request.chat_id}},
    )
    return {"answer": response['messages'][-1].content, "source_documents": middleware.retrived_docs}