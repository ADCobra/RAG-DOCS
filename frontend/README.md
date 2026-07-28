# Frontend - Next.js App

Modern React/Next.js web app for document upload and AI-powered Q&A with Redux state management and Tailwind CSS. Provides intuitive UI for users to interact with the RAG Docs system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000

# Start development server
npm run dev
```

App runs on: http://localhost:3000

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home page
│   │   ├── layout.tsx       # Root layout
│   │   ├── globals.css      # Global styles
│   │   ├── chat/
│   │   │   └── page.tsx     # Chat interface
│   │   ├── login/
│   │   │   └── page.tsx     # Login page
│   │   ├── register/
│   │   │   └── page.tsx     # Registration page
│   │   ├── learn/
│   │   │   └── page.tsx     # Learning/help guide
│   │   ├── privacy/
│   │   │   └── page.tsx     # Privacy policy
│   │   └── settings/
│   │       └── page.tsx     # User settings
│   │
│   ├── components/          # Reusable React components
│   │   ├── navbar.tsx       # Main navigation
│   │   ├── authProvider.tsx # Auth context
│   │   ├── loader.tsx       # Loading spinner
│   │   ├── chat/            # Chat components
│   │   │   ├── chatView.tsx
│   │   │   ├── chatSidebar.tsx
│   │   │   ├── newChat.tsx
│   │   │   └── emptyChat.tsx
│   │   └── ui/              # UI components (shadcn/ui)
│   │
│   ├── store/               # Redux state management
│   │   ├── store.ts         # Redux store config
│   │   ├── axios.ts         # Axios API client
│   │   ├── handleError.ts   # Error handling
│   │   ├── slices/
│   │   │   ├── userSlice.ts
│   │   │   └── chatSlice.ts
│   │   └── types/
│   │       ├── userType.ts
│   │       └── chatTypes.ts
│   │
│   └── lib/                 # Utility functions
│       └── utils.ts
│
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.mjs
└── .env.local              # Local environment vars
```

## 🔌 Key Pages & Features

| Page     | Path        | Purpose                                |
| -------- | ----------- | -------------------------------------- |
| Home     | `/`         | Landing page with overview             |
| Login    | `/login`    | User authentication                    |
| Register | `/register` | New user signup                        |
| Chat     | `/chat`     | Main app - upload docs & ask questions |
| Learn    | `/learn`    | Help guides, tutorials, FAQ            |
| Privacy  | `/privacy`  | Privacy policy & terms                 |
| Settings | `/settings` | User profile & preferences             |

## 🎨 Tech Stack

- **Framework**: Next.js 14+ (TypeScript)
- **UI Library**: React 18+
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 3+
- **HTTP Client**: Axios
- **Components**: shadcn/ui components
- **Icons**: Lucide React

## 📊 Redux State Management

### User Slice

```
- user: Current user data
- token: JWT auth token
- isAuthenticated: Login status
- isLoading: Loading state
- error: Error messages
```

### Chat Slice

```
- chats: Array of user's chats
- currentChat: Active chat
- messages: Chat messages
- documents: Uploaded docs
- isLoading: Processing state
- error: Error messages
```

## 🔌 API Integration

All API calls go through Axios client to backend at `NEXT_PUBLIC_API_URL`:

- **Auth**: Register, login, logout, get profile
- **Chats**: Create, read, update, delete chats
- **Messages**: Send messages, get chat history
- **Documents**: Upload files, delete documents

Request format:

```bash
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## 🔐 Authentication

1. User registers/logs in
2. JWT token stored in localStorage
3. Token sent in Authorization header
4. Protected routes checked via middleware
5. Token refreshed on app load

## 🎨 Styling with Tailwind

- Global styles in `app/globals.css`
- Dark mode supported via `dark:` prefix
- Custom color scheme in `tailwind.config.ts`
- Responsive design for all screen sizes

## ⚙️ Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000  # Backend API URL
NEXT_PUBLIC_APP_NAME=RAG Docs              # App name
```

Note: Variables prefixed with `NEXT_PUBLIC_` are exposed to browser.

## 🚀 Build & Deployment

```bash
# Development
npm run dev

# Production build
npm run build

# Run production build locally
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## ⚡ Common Issues & Solutions

| Issue                 | Solution                                                         |
| --------------------- | ---------------------------------------------------------------- |
| Cannot connect to API | Check `NEXT_PUBLIC_API_URL`, ensure backend running on port 5000 |
| Auth token missing    | Clear localStorage: `localStorage.clear()`, login again          |
| Styles not loading    | Delete `.next` folder: `rm -rf .next`, rebuild                   |
| Build errors          | Run `npm install` again, clear node_modules if needed            |
| Pages not found       | Check Next.js routing in `app/` directory                        |
| Redux state empty     | Check Redux DevTools, verify slices initialized                  |

## 🧪 Development Workflow

```bash
# 1. Start backend on 5000
cd ../backend && npm run dev

# 2. Start GenAI on 8000
cd ../genai && uv run python -m uvicorn app.main:app --reload

# 3. Start frontend on 3000
npm run dev

# 4. Open http://localhost:3000
```

## 📦 Key Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-redux": "^8.x.x",
  "@reduxjs/toolkit": "^1.9.x",
  "axios": "^1.4.0",
  "tailwindcss": "^3.x.x",
  "typescript": "^5.x.x"
}
```

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Follow TypeScript/React best practices
3. Use Tailwind CSS for styling
4. Test changes before committing
5. Create pull request

## 📄 License

MIT License
