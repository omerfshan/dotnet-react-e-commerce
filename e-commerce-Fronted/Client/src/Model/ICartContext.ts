// src/types/ICartContext.ts

import type { CartDto } from "./ICart";
import type { ICartItem } from "./ICartItem";


export interface ICartContext {
  cart: CartDto | null;
  loading: boolean;
  totalPrice: number;

  increaseItem: (item: ICartItem) => void;
  decreaseItem: (item: ICartItem) => void;
  removeItem: (item: ICartItem) => void;
  refreshCart: () => Promise<void>;

}
