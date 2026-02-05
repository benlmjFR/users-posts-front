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
  isAuthenticated: boolean | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const me = await getCurrentUser();
        setUser(me);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
  
    init();
  }, []);  

  const login = async (email: string, password: string) => {
    const me = await loginRequest(email, password);
    setUser(me);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
