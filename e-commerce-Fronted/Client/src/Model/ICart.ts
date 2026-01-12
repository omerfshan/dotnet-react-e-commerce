import type { ICartItem } from "./ICartItem";

export interface CartDto {
  cartId: number;
  cartItems: ICartItem[];
};