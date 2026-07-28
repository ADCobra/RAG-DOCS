# GenAI Service

Python FastAPI service for document processing and AI-powered Q&A using LangChain, Pinecone, and Google GenAI. Handles RAG (Retrieval-Augmented Generation) for intelligent document analysis.

## 🚀 Quick Start

### Using UV (Recommended)

```bash
# Install UV (one-time setup)
pip install uv

# Install dependencies with UV
uv sync

# Setup .env
GOOGLE_GENAI_API_KEY=your_google_genai_key
PINECONE_API_KEY=your_pinecone_key

# Run with UV
uv run python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Using Pip

```bash
# Install dependencies
pip install -r requirements.txt

# Run
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API Docs available at: http://localhost:8000/docs

## 📁 Project Structure

```
genai/
├── app/
│   ├── main.py                  # FastAPI app entry point
│   ├── config/
│   │   ├── langchain.py         # LangChain configuration
│   │   └── pinecone.py          # Pinecone setup
│   ├── lanchain/
│   │   ├── ask_question.py      # Q&A logic
│   │   └── document.py          # Document processing
│   ├── routers/
│   │   ├── ask_question.py      # Q&A endpoints
│   │   └── documents.py         # Document endpoints
│   └── scheama/
│       ├── ask_question.py      # Request/response schemas
│       └── document.py          # Document schemas
├── pyproject.toml               # UV/pip dependencies
├── uv.lock                      # UV lock file
└── README.md
```

## 🔌 API Endpoints

### Document Management

| Method | Endpoint                  | Purpose                   |
| ------ | ------------------------- | ------------------------- |
| POST   | `/api/documents/upload`   | Upload & process document |
| DELETE | `/api/documents/{doc_id}` | Delete document           |

### Question Answering

| Method | Endpoint            | Purpose                   |
| ------ | ------------------- | ------------------------- |
| POST   | `/api/ask-question` | Ask question on documents |

## 📊 Core Features

### Document Processing

- Load multiple file formats (PDF, TXT, DOCX)
- Split documents into chunks with configurable overlap
- Generate embeddings using Pinecone embedding model
- Store in Pinecone vector database
- Track processing status in MongoDB

### Question Answering

- Search relevant documents semantically
- Retrieve context from Pinecone
- Generate answers using Google GenAI LLM (Gemini)
- Return sources and citations
- Track usage statistics

## 🔐 Authentication

- Uses JWT tokens from backend
- Validates user authorization
- Stores document metadata in MongoDB
- Associates documents with user chats

## ⚙️ Configuration

### Environment Variables

```env
# Required
GOOGLE_GENAI_API_KEY=your_key
PINECONE_API_KEY=your_key
```

## 🛠️ Dependencies

**Core:**

- FastAPI (web framework)
- Uvicorn (ASGI server)
- LangChain (LLM framework)
- Pinecone (vector database)
- google-generativeai (Google GenAI)
- PyMongo (MongoDB)

**Document Processing:**

- PyPDF2 (PDF files)
- python-docx (Word files)
- Pydantic (data validation)

**Development:**

- pytest (testing)
- black (code formatting)
- mypy (type checking)

## ⚡ Common Issues & Solutions

| Issue                     | Solution                                           |
| ------------------------- | -------------------------------------------------- |
| Pinecone connection error | Verify API key, environment, and index name        |
| Google GenAI API error    | Check API key quota and rate limits                |
| File upload timeout       | Reduce file size or increase timeout               |
| Slow embeddings           | Check Pinecone quota and network speed             |
| MongoDB connection fails  | Ensure MongoDB running and URI correct             |
| Module not found          | Run `uv sync` or `pip install -r requirements.txt` |

## 🚀 Development

```bash
# Install dev dependencies
uv sync

# Run tests
uv run pytest tests/

# Format code
uv run black app/

# Type check
uv run mypy app/

# Run with hot reload
uv run python -m uvicorn app.main:app --reload
```

## 🔄 Integration with Backend

GenAI service is called by Express backend:

- Backend receives file uploads from frontend
- Sends document to GenAI for processing
- GenAI returns processing status
- Backend queries GenAI for Q&A
- Results sent back to frontend via backend API

## 📝 Request/Response Examples

### Upload Document

```bash
curl -X POST http://localhost:8000/api/documents/upload \
  -F "file=@document.pdf" \
  -F "chat_id=chat_123"
```

### Ask Question

```bash
curl -X POST http://localhost:8000/api/ask-question \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is RAG?",
    "document_ids": ["doc_123"],
    "num_results": 3
  }'
```

## 📄 License

MIT License
