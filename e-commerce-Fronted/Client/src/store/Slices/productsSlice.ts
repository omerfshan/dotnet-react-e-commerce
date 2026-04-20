import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit";
import requests from "../../Api/Api";
import type { IProduct } from "../../Model/IProduct";
import type { RootState } from "../store";

const productsAdapter = createEntityAdapter<IProduct>();

type Status = "idle" | "loading" | "succeeded" | "failed";

interface ProductsExtra {
  status: Status;
  error: string | null;
  loaded: boolean;
}

const initialState = productsAdapter.getInitialState<ProductsExtra>({
  status: "idle",
  error: null,
  loaded: false,
});

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (state.products.loaded) return null;
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
    builder
      .addCase(fetchProducts.pending, (state) => {
        if (state.loaded) return; // ✅ cache'deyse loading'e girme
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (!action.payload) return; // ✅ null gelirse (cache'deydi) yok say
        productsAdapter.setAll(state, action.payload);
        state.status = "succeeded";
        state.loaded = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        productsAdapter.setAll(state, action.payload);
        state.status = "succeeded";
        state.loaded = false; // ✅ ana sayfaya dönünce tekrar fetch etsin
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state: RootState) => state.products);

export default productsSlice.reducer;