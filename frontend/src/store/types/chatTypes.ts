interface chat {
  _id: string;
  userId: string;
  title: string;
  lastMessageAt: string;
  documents: { _id: string; name: string }[];
  createdAt: string;
  updatedAt: string;
}

interface messageT {
  _id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    tokens?: number;
    model?: string;
    sources?: { file_name: string; page: number }[];
  };
}

export type { chat, messageT };