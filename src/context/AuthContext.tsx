"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  googleLogin: (credential: string) => Promise<User>;
  register: (input: { name: string; email: string; photoURL: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore the session from the HTTPOnly cookie on every full page load so private routes survive a reload.
  useEffect(() => {
    let active = true;
    api<{ user: User }>("/auth/me")
      .then((d) => active && setUser(d.user))
      .catch(() => active && setUser(null))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const d = await api<{ user: User }>("/auth/login", { method: "POST", body: { email, password } });
    setUser(d.user);
    return d.user;
  }, []);

  const googleLogin = useCallback(async (credential: string) => {
    const d = await api<{ user: User }>("/auth/google", { method: "POST", body: { credential } });
    setUser(d.user);
    return d.user;
  }, []);

  const register = useCallback(async (input: { name: string; email: string; photoURL: string; password: string }) => {
    await api("/auth/register", { method: "POST", body: input });
  }, []);

  const logout = useCallback(async () => {
    try {
      await api("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({ user, loading, login, googleLogin, register, logout }), [user, loading, login, googleLogin, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
