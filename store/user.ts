import create from "zustand";
import {SessionUser} from "../types/user";

export const useUserStore = create((set) => ({
    user: null,
    setUser: () => set((user) => ({ user: user })),
}))
