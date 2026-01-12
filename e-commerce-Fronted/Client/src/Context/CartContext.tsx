// src/context/CartContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import requests from "../Api/Api";
import type { ICartContext } from "../Model/ICartContext";
import type { CartDto } from "../Model/ICart";
import type { ICartItem } from "../Model/ICartItem";


const CartContext = createContext<ICartContext | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartDto | null>(null);
  const [loading, setLoading] = useState(true);

  // Sepeti yükle
  useEffect(() => {
    requests.Cart.getCart()
      .then((data) => setCart(data))
      .finally(() => setLoading(false));
  }, []);

  const totalPrice =
    cart?.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
    0;

  const increaseItem = (item: ICartItem) => {
    requests.Cart.addItem(item.productId, 1);
    setCart((prev) =>
      prev
        ? {
            ...prev,
            cartItems: prev.cartItems.map((ci) =>
              ci.productId === item.productId
                ? { ...ci, quantity: ci.quantity + 1 }
                : ci
            ),
          }
        : prev
    );
  };

  const decreaseItem = (item: ICartItem) => {
    if (item.quantity <= 1) return removeItem(item);

    requests.Cart.deleteItem(item.productId, 1);
    setCart((prev) =>
      prev
        ? {
            ...prev,
            cartItems: prev.cartItems.map((ci) =>
              ci.productId === item.productId
                ? { ...ci, quantity: ci.quantity - 1 }
                : ci
            ),
          }
        : prev
    );
  };

  const removeItem = (item: ICartItem) => {
    requests.Cart.deleteItem(item.productId, item.quantity);
    setCart((prev) =>
      prev
        ? {
            ...prev,
            cartItems: prev.cartItems.filter(
              (ci) => ci.productId !== item.productId
            ),
          }
        : prev
    );
  };
const refreshCart = () => {
  return requests.Cart.getCart().then(data => setCart(data));
};

  const value: ICartContext = {
    cart,
    loading,
    totalPrice,
    increaseItem,
    decreaseItem,
    removeItem,
    refreshCart,
   
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart CartProvider içinde kullanılmalı!");
  return ctx;
}
