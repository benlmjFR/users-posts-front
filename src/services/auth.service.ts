import { api } from "./api";
import type { User } from "@/types/user";

export const loginRequest = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const res = await api<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("access_token", res.token);

  return null;
};

export const registerRequest = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const res = await api<{ token: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("access_token", res.token);

  return null;
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    return await api<User>("/users/profile");
  } catch {
    return null;
  }
};

export const logoutRequest = () => {
  localStorage.removeItem("access_token");
};