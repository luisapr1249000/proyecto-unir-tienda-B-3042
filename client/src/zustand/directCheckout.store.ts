import { create } from "zustand";
import { CartItem } from "../types/user";

interface DirectCheckoutStore {
  // The current CartItem (or null if none is set)
  cartItem: CartItem | null;
  // Action to set the cart item
  setCartItem: (item: CartItem) => void;
  // Action to clear the cart item
  clearCartItem: () => void;
}

// Create the store
export const useDirectCheckoutStore = create<DirectCheckoutStore>((set) => ({
  cartItem: null,
  setCartItem: (item: CartItem) => set({ cartItem: item }),
  clearCartItem: () => set({ cartItem: null }),
}));
