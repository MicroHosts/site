import create from "zustand";

export const useHostStore = create((set) => ({
    host: null,
    setHost: () => set((host) => ({ host: host })),
}))
