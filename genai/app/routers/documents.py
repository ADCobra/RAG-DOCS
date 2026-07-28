from fastapi import APIRouter, File, UploadFile, Form, status
from app.lanchain.document import upload_docx, upload_pdf, upload_text, delete_chat_files
from app.scheama.document import UploadFileOut

from typing import Annotated, List

router = APIRouter()

@router.post("/upload", response_model=UploadFileOut, status_code=status.HTTP_200_OK)
async def upload_pdf_file(
  files: Annotated[List[UploadFile], File()],
  chat_id: Annotated[str, Form()],
  user_id: Annotated[str, Form()]
):
  for file in files:
    if file.content_type == "application/pdf":
      await upload_pdf(chat_id, user_id, file)
    elif file.content_type == "text/plain":
      await upload_text(chat_id, user_id, file)
    elif file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      await upload_docx(chat_id, user_id, file)
  return {"success": True}

@router.delete("/delete/{id}", response_model=UploadFileOut, status_code=status.HTTP_200_OK)
async def delete_file(id: str):
  while True:
    res =  await delete_chat_files(id)
    if res.get("deleted_count") == 0:
      break
  return {"success": True}

@router.delete("/user-delete/{id}",response_model=UploadFileOut, status_code=status.HTTP_200_OK)
async def delete_user_file(id:str):
  while True:
    res = await delete_user_file(id)
    if res.get("deleted_count") == 0:
      break
  
  return {"success": True}