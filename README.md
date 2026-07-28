# RAG Docs

Document intelligence platform with multi-doc upload, AI-powered Q&A, semantic search, and chat history using RAG.

## 🌟 Features

- Multi-document upload & management
- AI-powered Q&A across documents
- Semantic search via Pinecone vectors
- Persistent chat history
- Secure JWT authentication
- Real-time document processing

## 🛠 Tech Stack

**Frontend**: Next.js 14+, React, Redux, Tailwind CSS | **Backend**: Express.js, TypeScript, MongoDB | **AI**: LangChain, Pinecone, GOOGLE | **Python**: FastAPI

## 📁 Project Structure

```
├── backend/          # Express API, auth, chats, messages
├── frontend/         # Next.js app, UI, Redux state
├── genai/            # FastAPI, document processing, Q&A
└── README.md
```

## 🚀 Quick Setup

**Backend:**

```bash
cd backend && npm install
# .env: MONGODB_URI, JWT_SECRET, PINECONE_API_KEY, OOGLE_API_KEY, PORT=5000
npm run dev      # Runs on http://localhost:5000
```

**Frontend:**

```bash
cd frontend && npm install
# .env.local: NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev      # Runs on http://localhost:3000
```

**GenAI:**

```bash
cd genai && pip install -r requirements.txt
# .env: PINECONE_API_KEY, GOOGLE_API_KEY, MONGODB_URI
python -m uvicorn app.main:app --reload    # Runs on http://localhost:8000
```

## 🔌 Key Endpoints

| Endpoint                | Method | Purpose               |
| ----------------------- | ------ | --------------------- |
| `/api/users/register`   | POST   | Register user         |
| `/api/users/login`      | POST   | Login user            |
| `/api/chats`            | GET    | Get all chats         |
| `/api/chats`            | POST   | Create chat           |
| `/api/messages`         | POST   | Send message/question |
| `/api/documents/upload` | POST   | Upload document       |
| `/api/ask-question`     | POST   | Ask AI question       |

## 📖 Quick Guide

1. **Create Account** → Register at `/register`
2. **Login** → Go to `/login`
3. **Create Chat** → Click "New Chat"
4. **Upload Docs** → Drag & drop or select files
5. **Ask Questions** → Type in chat input, get AI answers

## ⚡ Common Issues

- **MongoDB error** → Check MONGODB_URI and MongoDB is running
- **API connection fails** → Verify NEXT_PUBLIC_API_URL and backend running
- **Google error** → Check GOOGLE_API_KEY is valid
- **Slow responses** → Check Pinecone quota and network

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [GenAI README](./genai/README.md)
- [Privacy Policy](./frontend/src/app/privacy/page.tsx)
- [Learning Guide](./frontend/src/app/learn/page.tsx)

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT token authentication
- Input validation & CORS protection
- User data encrypted at rest

## 📝 Environment Setup

**All 3 services need these keys:**

- PINECONE_API_KEY (from Pinecone dashboard)
- GOOGLE_API_KEY (from GOOGLE GEMINI)
- MONGODB_URI (local or MongoDB Atlas)

See individual service READMEs for full env setup.

## 🤝 Contributing

1. Fork repo → Create branch → Make changes → Push → Pull request
2. Follow TypeScript best practices
3. Test changes before submitting

## 📄 License

MIT License

## 🆘 Support

- Issues: [GitHub Issues](https://github.com/ADCobra/RAG-DOCS/issues)
- Author: [@ADCobra](https://github.com/ADCobra) — bondlicensedtokillqueen@gmail.com
