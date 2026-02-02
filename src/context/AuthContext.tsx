"use client";

import { createContext, useEffect, useState } from "react";
import type { User } from "@/types/user";
import {
  getCurrentUser,
  loginRequest,
  logoutRequest,
} from "@/services/auth.service";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const init = async () => {
      const me = await getCurrentUser();
      setUser(me);
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const me = await loginRequest(email, password);
    setUser(me);
  };

  const logout = () => {
    logoutRequest();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
