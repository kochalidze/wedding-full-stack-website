import { create } from "zustand";

export const dressFilterStore = create((set) => ({
    // საწყის მნიშვნელობებად ჯობია ცარიელი სტრინგები
    search: '', 
    color: '',
    size: '',
    category: '',
    price: '',

    setSearch: (val) => set({ search: val }),
    setColor: (val) => set({ color: val }),
    setSize: (val) => set({ size: val }),
    setCategory: (val) => set({ category: val }),
    setPrice: (val) => set({ price: val }),

    resetFilters: () => set({
        search: '',
        color: '',
        size: '',
        category: '',
        price: ''
    })
}));