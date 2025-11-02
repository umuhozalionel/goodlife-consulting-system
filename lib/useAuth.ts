// lib/useAuth.ts
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ensureUserDoc } from "@/lib/user";

type AuthContextValue = {
  user: FirebaseUser | null;
  role: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({ user: null, role: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setLoading(true);
      if (!u) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      setUser(u);

      // ONE LINE: ensure users/<uid> exists so rules and guards relying on it won't fail
      await ensureUserDoc(u.uid, { email: u.email || undefined, displayName: u.displayName || undefined, role: "intern" });

      // minimal role resolution: try to read from users/<uid> to get role, but keep it fast
      try {
        const token = await u.getIdTokenResult(true);
        if (token && token.claims && token.claims.role) {
          setRole(String(token.claims.role));
        } else {
          // fallback: attempt to read users doc via serverless endpoint or client read if allowed
          // conservative default when missing: "intern"
          setRole("intern");
        }
      } catch {
        setRole("intern");
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return <AuthContext.Provider value={{ user, role, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}