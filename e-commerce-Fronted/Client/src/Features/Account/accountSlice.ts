 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../Api/Api";

type User = {
  email: string;
  token: string;
};

type AccountState = {
  user: User | null;
  status: "idle" | "loading" | "failed";
};

const initialState: AccountState = {
  user: null,
  status: "idle",
};

export const loginAsync = createAsyncThunk(
  "account/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await requests.Auth.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err);
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