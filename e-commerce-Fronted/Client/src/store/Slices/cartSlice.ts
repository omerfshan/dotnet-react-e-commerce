import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import requests from "../../Api/Api";
import type { CartDto } from "../../Model/ICart";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface CartState {
  cart: CartDto | null;
  status: Status;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    return await requests.Cart.getCart() as CartDto;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Sepet yüklenemedi");
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (productId: number, { rejectWithValue }) => {
  try {
    return await requests.Cart.addItem(productId) as CartDto;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Ürün eklenemedi");
  }
});

export const increaseCartItem = createAsyncThunk("cart/increaseItem", async (productId: number, { rejectWithValue }) => {
  try {
    return await requests.Cart.addItem(productId, 1) as CartDto;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Ürün artırılamadı");
  }
});

export const decreaseCartItem = createAsyncThunk("cart/decreaseItem", async (productId: number, { rejectWithValue }) => {
  try {
    return await requests.Cart.deleteItem(productId, 1) as CartDto;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Ürün azaltılamadı");
  }
});

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async ({ productId, quantity }: { productId: number; quantity: number }, { rejectWithValue }) => {
    try {
      return await requests.Cart.deleteItem(productId, quantity) as CartDto;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Ürün silinemedi");
    }
  }
);

const allCartThunks = [fetchCart, addToCart, increaseCartItem, decreaseCartItem, removeCartItem];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    allCartThunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action: PayloadAction<CartDto>) => {
          state.cart = action.payload;
          state.status = "succeeded";
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        });
    });
  },
});

export default cartSlice.reducer;