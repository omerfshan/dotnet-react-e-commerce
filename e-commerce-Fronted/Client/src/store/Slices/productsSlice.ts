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
  loaded: boolean; // ✅ ekledik
}

const initialState = productsAdapter.getInitialState<ProductsExtra>({
  status: "idle",
  error: null,
  loaded: false, // ✅ başlangıçta false
});

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    // ✅ Cache'de varsa API'ye gitme!
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
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        if (state.loaded) return; // ✅ zaten yüklendiyse pending'i işleme
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (!action.payload) return; // ✅ null gelirse (cache'deydi) yok say
        productsAdapter.setAll(state, action.payload);
        state.status = "succeeded";
        state.loaded = true; // ✅ bir kez yüklendi, işaretle
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // fetchProductsByCategory — loaded'ı değiştirme, her zaman fetch et
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        productsAdapter.setAll(state, action.payload);
        state.status = "succeeded";
        // ✅ loaded'ı true yapmıyoruz — tüm ürünler cache'de değil
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