"use client";

import { useContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type UserRole = "admin" | "intern" | "corporate" | "counselling";

interface ProtectedProps {
  children: ReactNode;
  allow?: UserRole[];       // e.g., ["admin","intern"]
  redirectTo?: string;      // login route
}

export function ProtectedRoute({
  children,
  allow = ["admin", "intern", "corporate", "counselling"],
  redirectTo = "/auth",
}: ProtectedProps) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [role, setRole] = useState<UserRole | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);

  const uid = user?.uid ?? null;

  useEffect(() => {
    if (loading) return;
    if (!uid) {
      router.push(redirectTo);
      return;
    }
    // fetch role once per uid
    let active = true;
    (async () => {
      setRoleLoading(true);
      try {
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);
        const fetched = (snap.exists() ? (snap.data().role as UserRole) : "intern");
        if (active) setRole(fetched);
      } catch {
        if (active) setRole("intern");
      } finally {
        if (active) setRoleLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading, uid, router, redirectTo]);

  const blocked = useMemo(() => {
    if (loading || roleLoading) return false;
    if (!uid) return true;
    if (!role) return true;
    return !allow.includes(role);
  }, [loading, roleLoading, uid, role, allow]);

  if (loading || roleLoading) return <div>Loading...</div>;
  if (!uid) return <div>Redirecting…</div>;
  if (blocked) return <div>Access denied</div>;

  return <>{children}</>;
}