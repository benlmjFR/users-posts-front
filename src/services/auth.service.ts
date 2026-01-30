import { api } from "./api";
import type { User } from "@/types/user";

export const login = async (email: string, password: string) => {
  const res = await api<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("access_token", res.token);
};

export const register = async (email: string, password: string) => {
  const res = await api<{ token: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("access_token", res.token);
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    return await api<User>("/users/profile");
  } catch {
    return null;
  }
};