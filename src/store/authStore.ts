import { create } from "zustand";

type AuthStore = {
  token: string | null | undefined;
  user: any;
  setUser: (user: any | null) => void;
  setToken: (token: string | null) => void;
};

const useAuthStore = create<AuthStore>((set:any) => ({
  token: "",
  user: null,
  setUser: (user:any) => set({ user }),
  setToken: (token:any) => set({ token }),
}));

export default useAuthStore;
