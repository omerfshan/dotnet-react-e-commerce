import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Counter/CounterSlice";
import cartReducer from "./Cart/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;