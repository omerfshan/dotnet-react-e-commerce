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

  const increaseItem = async (item: ICartItem) => {
  await requests.Cart.addItem(item.productId, 1);
  refreshCart();
};

 const decreaseItem = async (item: ICartItem) => {
  if (item.quantity <= 1) {
    await requests.Cart.deleteItem(item.productId, item.quantity);
  } else {
    await requests.Cart.deleteItem(item.productId, 1);
  }
  refreshCart();
};

  const removeItem = async (item: ICartItem) => {
  await requests.Cart.deleteItem(item.productId, item.quantity);
  refreshCart();
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
