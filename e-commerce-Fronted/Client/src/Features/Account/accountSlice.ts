import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../Api/Api";
import { clearCart } from "../../store/Slices/cartSlice";
import { clearFavoritesLocal } from "../../store/Slices/favoriteSlice";

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
      dispatch(clearCart());
      dispatch(clearFavoritesLocal());
    }
  }
);

export const registerAsync = createAsyncThunk(
  "account/register",
  async (
    data: { email: string; password: string; firstName: string; lastName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await requests.Auth.register(data);
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
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout, setUser } = accountSlice.actions;
export default accountSlice.reducer;  