from fastapi import File, UploadFile, Form
from pydantic import BaseModel
from typing import List, Annotated

class UploadFileOut(BaseModel):
  success: bool

class UploadFileIn(BaseModel):
  file: List[Annotated[UploadFile, File(...)]]
  chat_id: Annotated[str, Form()]
  user_id: Annotated[str, Form()]