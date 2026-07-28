# Backend - Express.js API

TypeScript/Express REST API for user auth, chat management, and document handling. Connects frontend to GenAI service for AI-powered Q&A.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file with these keys
MONGODB_URI=mongodb://localhost:27017/rag-docs
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=development
GENAI_SERVICE_URL=http://localhost:8000
PINECONE_API_KEY=your_pinecone_key
GOOGLE_API_KEY=your_Google_key

# Start development server
npm run dev
```

Server runs on: http://localhost:5000

## 📁 Directory Structure

```
backend/
├── controller/          # Request handlers for routes
│   ├── chatController.ts
│   ├── messageController.ts
│   └── userController.ts
├── models/              # MongoDB schemas
│   ├── chatModels.ts
│   ├── MessageModel.ts
│   └── userModel.ts
├── routers/             # Route definitions
│   ├── chatRouter.ts
│   ├── messageRouter.ts
│   └── userRouters.ts
├── middlewares/         # Express middleware
│   ├── auth.ts          # JWT authentication
│   └── error.ts         # Error handling
├── config/              # Configuration
│   ├── mongodb.ts       # DB connection
│   └── multer.ts        # File upload config
├── utils/               # Helper functions
├── index.ts             # Entry point
├── package.json
└── tsconfig.json
```

## 🔌 Key Endpoints

### Authentication

| Method | Endpoint              | Purpose           |
| ------ | --------------------- | ----------------- |
| POST   | `/api/users/register` | Register new user |
| POST   | `/api/users/login`    | Login user        |
| GET    | `/api/users/profile`  | Get user profile  |

### Chat Management

| Method | Endpoint         | Purpose            |
| ------ | ---------------- | ------------------ |
| GET    | `/api/chats`     | Get all user chats |
| POST   | `/api/chats`     | Create new chat    |
| DELETE | `/api/chats/:id` | Delete chat        |

### Messages

| Method | Endpoint                | Purpose                   |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/messages`         | Send message/ask question |
| GET    | `/api/messages/:chatId` | Get messages in chat      |
| DELETE | `/api/messages/:id`     | Delete message            |

### Documents

| Method | Endpoint                | Purpose         |
| ------ | ----------------------- | --------------- |
| POST   | `/api/documents/upload` | Upload document |
| DELETE | `/api/documents/:id`    | Delete document |

## 🔐 Authentication Flow

1. User registers with email/password
2. Password hashed with bcryptjs
3. JWT token returned on login
4. Token stored in localStorage
5. Bearer token in Authorization header for protected routes

## 📊 Database Models

**User**: email, password, username, profile, createdAt, updatedAt
**Chat**: userId, title, description, documents, messages, createdAt, updatedAt
**Message**: chatId, userId, content, type (question|answer), sources, createdAt, updatedAt

## ⚡ Common Issues & Solutions

| Issue                    | Solution                                                          |
| ------------------------ | ----------------------------------------------------------------- |
| MongoDB connection error | Check MONGODB_URI, ensure MongoDB is running                      |
| JWT token invalid        | Verify JWT_SECRET matches across services                         |
| CORS errors              | Check FRONTEND_URL in config, enable credentials                  |
| File upload fails        | Check MAX_FILE_SIZE limit and upload directory permissions        |
| GenAI service not found  | Verify GENAI_SERVICE_URL and that service is running on port 8000 |

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Auth**: Token-based authentication
- **Input Validation**: All inputs validated before processing
- **Error Handling**: Centralized error middleware
- **CORS**: Configured for frontend domain
- **Rate Limiting**: Can be added to protect endpoints

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "typescript": "^5.x.x",
  "mongoose": "^7.x.x",
  "jsonwebtoken": "^9.x.x",
  "bcryptjs": "^2.4.3",
  "multer": "^1.4.5",
  "axios": "^1.4.0",
  "cors": "^2.8.5",
  "dotenv": "^16.x.x"
}
```

## 🚀 Development

```bash
# Run in dev mode with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## 🤝 Integration

- **Frontend**: Receives API calls from Next.js frontend
- **GenAI Service**: Calls FastAPI service for document processing and Q&A
- **MongoDB**: Stores users, chats, and messages
- **Pinecone**: Accessed via GenAI service for vector search

## 🆘 Troubleshooting

**Port already in use**: Change PORT in .env to different number (e.g., 5001)
**Module not found**: Run `npm install` again, delete node_modules if needed
**Build errors**: Run `npm run build` to check TypeScript compilation
**Hot reload not working**: Install nodemon: `npm install -D nodemon`

## 📝 Environment Variables Reference

| Variable          | Example                      | Required |
| ----------------- | ---------------------------- | -------- |
| MONGODB_URI       | mongodb://localhost:27017/db | Yes      |
| JWT_SECRET        | your_secret_key              | Yes      |
| PORT              | 5000                         | No       |
| NODE_ENV          | development                  | No       |
| GENAI_SERVICE_URL | http://localhost:8000        | Yes      |
| PINECONE_API_KEY  | xxx                          | Yes      |
| GOOGLE_API_KEY    | xxx                          | Yes      |

## 📄 License

MIT License
