import { create } from "zustand";

interface ProductState {
  sortBy: string;
  page: number;
  limit: number;
  setSortBy: (sort: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const useProductStore = create<ProductState>((set) => ({
  sortBy: "-createdAt",
  page: 1,
  limit: 12,
  setSortBy: (sort) => set({ sortBy: sort, page: 1 }), // Resetea la página al cambiar el orden
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}));

export default useProductStore;
