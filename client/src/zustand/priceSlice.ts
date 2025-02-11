import { create } from "zustand";

interface PriceState {
  price: {
    min: number;
    max: number;
  };
  setMinPrice: (min: number) => void;
  setMaxPrice: (max: number) => void;
  setPrice: (min: number, max: number) => void;
}

const usePriceStore = create<PriceState>((set) => ({
  price: {
    min: 1,
    max: 5000,
  },
  setMinPrice: (min) => set((state) => ({ price: { ...state.price, min } })),
  setMaxPrice: (max) => set((state) => ({ price: { ...state.price, max } })),
  setPrice: (min, max) => set(() => ({ price: { min, max } })),
  restoreInitialState: () => set(() => ({ price: { min: 1, max: 5000 } })),
}));

export default usePriceStore;
