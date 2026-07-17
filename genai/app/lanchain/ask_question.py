from datetime import datetime
from app.config.langchain import get_langchain_agent, AgentContext, CustomMiddleware
from app.scheama.ask_question import AskQuestionRequest


async def ask_question_service(request: AskQuestionRequest):
    time = datetime.utcnow()
    print(time)
    middleware = CustomMiddleware(namespace="rag-docs-uploads", top_k=3)
    agent = get_langchain_agent(middle=middleware)
    response = agent.invoke(
        {
          "messages": [{"role": "user", "content": request.question}],
        }, 
        context=AgentContext(chat_id=request.chat_id),
        config={"configurable": {"thread_id": request.chat_id}},
    )
    elapsed_time = datetime.utcnow() - time
    print("Response received", datetime.utcnow())
    print(f"Time taken to get response: {elapsed_time.total_seconds()} seconds")
    print(response['messages'])
    return {"answer": response['messages'][-1].content, "source_documents": middleware.retrived_docs}