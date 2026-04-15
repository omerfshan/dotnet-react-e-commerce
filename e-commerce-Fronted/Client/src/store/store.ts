import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../Features/CartBasket/cartSlice";
import productsReducer from "../Features/ProductCard/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
     products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;