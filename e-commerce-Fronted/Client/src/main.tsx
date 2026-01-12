import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Routes";
import { CartProvider } from "./Context/CartContext";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>      
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
