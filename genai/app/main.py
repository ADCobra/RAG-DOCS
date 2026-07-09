from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from app.routers.documents import router as upload_router
from app.routers.ask_question import router as ask_router

load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000", "*"],  # frontend URL(s)
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
  return {"Hello": "World"}

app.include_router( upload_router, prefix="/api/v1/documents", tags=["documents"])
app.include_router( ask_router, prefix="/api/v1/message", tags=["message"])