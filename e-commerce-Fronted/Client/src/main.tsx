import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Routes";
// import { CartProvider } from "./Context/CartContext";
import { Provider } from "react-redux";        // ✅ ekle
import { store } from "./store/store";          // ✅ ekle

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>                    {/* ✅ ekle */}
      {/* <CartProvider> */}
        <RouterProvider router={router} />
      {/* </CartProvider> */}
    </Provider>                                 {/* ✅ ekle */}
  </StrictMode>
);