import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./Slices/cartSlice";
import productsReducer from "./Slices/productsSlice";
import accountReducer from "../Features/Account/accountSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
     products: productsReducer,
     account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;