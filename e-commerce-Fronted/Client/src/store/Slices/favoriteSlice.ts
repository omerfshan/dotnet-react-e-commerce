import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../Model/IProduct";
import requests from "../../Api/Api";

interface FavoriteState {
  items: IProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const storedFavorites = localStorage.getItem("favorites");

const initialState: FavoriteState = {
  items: storedFavorites ? JSON.parse(storedFavorites) : [],
  status: "idle",
};

export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await requests.Favorites.getFavorites();
      return response as IProduct[];
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Favoriler alınamadı");
    }
  }
);

export const toggleFavoriteAsync = createAsyncThunk(
  "favorite/toggleFavoriteAsync",
  async (product: IProduct, { getState, rejectWithValue }) => {
    const state = getState() as { account: { user: any }; favorite: FavoriteState };
    const isUserLoggedIn = !!state.account.user;
    const isFav = state.favorite.items.some((item) => item.id === product.id);

    if (isUserLoggedIn) {
      try {
        if (isFav) {
          await requests.Favorites.removeFavorite(product.id);
        } else {
          await requests.Favorites.addFavorite(product.id);
        }
      } catch (err: any) {
        return rejectWithValue(err?.message ?? "Favori işlemi başarısız");
      }
    }

    return { product, isFav };
  }
);

export const clearFavoritesAsync = createAsyncThunk(
  "favorite/clearFavoritesAsync",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { account: { user: any }; favorite: FavoriteState };
    const isUserLoggedIn = !!state.account.user;

    if (isUserLoggedIn) {
      try {
        for (const item of state.favorite.items) {
          await requests.Favorites.removeFavorite(item.id);
        }
      } catch (err: any) {
        return rejectWithValue(err?.message ?? "Favoriler temizlenemedi");
      }
    }

    return true;
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<IProduct[]>) => {
      state.items = action.payload;
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    clearFavoritesLocal: (state) => {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
        localStorage.setItem("favorites", JSON.stringify(state.items));
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
        const { product, isFav } = action.payload;
        if (isFav) {
          state.items = state.items.filter((item) => item.id !== product.id);
        } else {
          state.items.push(product);
        }
        localStorage.setItem("favorites", JSON.stringify(state.items));
      })
      .addCase(clearFavoritesAsync.fulfilled, (state) => {
        state.items = [];
        localStorage.removeItem("favorites");
      });
  },
});

export const { setFavorites, clearFavoritesLocal } = favoriteSlice.actions;
export default favoriteSlice.reducer;

