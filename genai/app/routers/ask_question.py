from fastapi import APIRouter,status

from app.scheama.ask_question import AskQuestionRequest, AskQuestionResponse
from app.lanchain.ask_question import ask_question_service

router = APIRouter()

@router.post("/ask", status_code=status.HTTP_200_OK, response_model=AskQuestionResponse)
async def ask_question(request: AskQuestionRequest):
    return await ask_question_service(request)