"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    api("/users/profile")
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch {
      // ignore errors
    }

    setIsAuthenticated(false);
    window.location.href = "/";
  }

  return {
    isAuthenticated,
    logout,
  };
}

