import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chat, messageT } from "../types/chatTypes";
import axios from "../axios";
import handleError from "../handleError";

const createChatHandler = createAsyncThunk(
  "chat/createChatHandler",
  async (formdata: FormData) => {
    try {
      const { data } = await axios.post("/chat", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    }
    catch (error: unknown) {
      return handleError(error);
    }
  }
)

const fetchAllChatsHandler = createAsyncThunk(
  "chat/fetchAllChatsHandler",
  async () => {
    try {
      const { data } = await axios.get("/chat/");
      return data;
    }
    catch (error: unknown) {
      return handleError(error);
    }
  }
)

const fetchChatByIdHandler = createAsyncThunk(
  "chat/fetchChatByIdHandler",
  async (chatId: string) => {
    try {
      const { data } = await axios.get(`/chat/${chatId}`);
      return data;
    }
    catch (error: unknown) {
      return handleError(error);
    }
  }
)

const deleteChatHandler = createAsyncThunk(
  "chat/deleteChatHandler",
  async (chatId: string) => {
    try {
      const { data } = await axios.delete(`/chat/${chatId}`);
      return data;
    }
    catch (error: unknown) {
      return handleError(error);
    }
  }
)

const changeChatNameHandler = createAsyncThunk(
  "chat/changeChatNameHandler",
  async ({ chatId, newName }: { chatId: string; newName: string }) => {
    try {
      const { data } = await axios.post(`/chat/change-name/${chatId}`, { newName });
      return data;
    }
    catch (error: unknown) {
      return handleError(error);
    }
  }
)

interface ChatState {
  chats: chat[];
  loading: boolean;
  error: string | null;
  chat: chat | null;
  chatCreated: boolean;
  message: string | null;
  chatMessages: messageT[];
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: null,
  chat: null,
  chatCreated: false,
  message: null,
  chatMessages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChatError(state) {
      state.error = null;
    },
    clearChatSuccess(state) {
      state.chatCreated = false;
      state.message = null;
    },
    clearChatState(state) {
      state.chat = null;
      state.chatMessages = [];
    },
    addMessageToChat(state, action) {
      if (state.chatMessages) {
        state.chatMessages.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.chatCreated = false;
      })
      .addCase(createChatHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.chatCreated = true;
        state.chat = action.payload.chat;
        state.chats.unshift(action.payload.chat);
      })
      .addCase(createChatHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAllChatsHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllChatsHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload.chats;
      })
      .addCase(fetchAllChatsHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchChatByIdHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatByIdHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.chat = action.payload.chat;
        state.chatMessages = action.payload.messages;
      })
      .addCase(fetchChatByIdHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteChatHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChatHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.chats = state.chats.filter(chat => chat._id !== action.meta.arg);
        if (state.chat?._id === action.meta.arg) {
          state.chat = null;
        }
      })
      .addCase(deleteChatHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(changeChatNameHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeChatNameHandler.fulfilled, (state, action) => {
        state.loading = false;
        const updatedChat = action.payload.chat;
        const index = state.chats.findIndex(chat => chat._id === updatedChat._id);
        if (index !== -1) {
          state.chats[index] = updatedChat;
        }
      })
      .addCase(changeChatNameHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearChatError, clearChatSuccess, clearChatState, addMessageToChat } = chatSlice.actions;
export { createChatHandler, fetchAllChatsHandler, fetchChatByIdHandler, deleteChatHandler, changeChatNameHandler };
export default chatSlice.reducer;