

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../types/userType";
import axios from "../axios";
import handleError from "../handleError";

const loginHandler = createAsyncThunk(
  "user/loginHandler",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await axios.post("/user/login", { email, password });
      return data;
    } catch (error: unknown) {
      return handleError(error);
    }
  }
)

const registerHandler = createAsyncThunk(
  "user/registerHandler",
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
      const { data } = await axios.post("/user/register", { name, email, password });
      return data;
    }
    catch (error: unknown) {
      return handleError(error);
    }
  }
)

const loadUserHandler = createAsyncThunk(
  "user/loadUserHandler",
  async () => {
    try {
      const { data } = await axios.get("/user/me");
      return data;
    } catch (error: unknown) {
      return handleError(error);
    }
  }
)

interface initialState {
  user: UserState | null;
  loading: boolean;
  error: string | null;
  login: boolean;
  success: boolean;
  message: string | null;
}

const initialState: initialState = {
  user: null,
  loading: true,
  error: null,
  login: false,
  success: false,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.login = false;
      state.success = false;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.login = false;
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.login = true;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(registerHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(registerHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(loadUserHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserHandler.fulfilled, (state, action) => {
        console.log(action)
        state.loading = false;
        state.user = action.payload.user;
      }).addCase(loadUserHandler.rejected, (state, action) => {
        console.log(action)
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { clearUserState, clearError, clearSuccess } = userSlice.actions;
export { loginHandler, registerHandler, loadUserHandler };
export default userSlice.reducer;