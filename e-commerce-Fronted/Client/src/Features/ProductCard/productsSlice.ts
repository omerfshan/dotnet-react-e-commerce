import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import requests from "../../Api/Api";
import type { IProduct } from "../../Model/IProduct";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface ProductsState {
  products: IProduct[];
  status: Status;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await requests.Catalog.list() as IProduct[];
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Ürünler yüklenemedi");
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId: number, { rejectWithValue }) => {
    try {
      return await requests.Catalog.Category_details(categoryId) as IProduct[];
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Kategori ürünleri yüklenemedi");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [fetchProducts, fetchProductsByCategory].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
          state.products = action.payload;
          state.status = "succeeded";
        })
        .addCase(thunk.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        });
    });
  },
});

export default productsSlice.reducer;