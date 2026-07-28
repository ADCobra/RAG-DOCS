from pydantic import BaseModel
from typing import List, Optional

class AskQuestionRequest(BaseModel):
    chat_id: str
    user_id: str
    question: str

class AskQuestionResponse(BaseModel):
    answer: str
    source_documents: Optional[List[dict]] = None
