import create from "zustand";

export const useHostStore = create((set) => ({
    host: null,
    open: false,
}))
