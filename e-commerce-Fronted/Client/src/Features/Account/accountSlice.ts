import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../Api/Api";

export type User = {
  email?: string;
  token: string;
  userName?: string;
  firstName?: string;
};

type AccountState = {
  user: User | null;
  status: "idle" | "loading" | "failed";
};

const storedUser = localStorage.getItem("user");

const initialState: AccountState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  status: "idle",
};

export const loginAsync = createAsyncThunk(
  "account/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await requests.Auth.login(data);
      const user: User = {
        ...response,
        email: data.email,
      };
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "account/logout",
  async (_, { dispatch }) => {
    try {
      await requests.Auth.logout();
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      dispatch(logout());
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout, setUser } = accountSlice.actions;
export default accountSlice.reducer;  