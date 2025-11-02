"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import RoleGuard from "@/components/RoleGuard";
import { Button } from "@/components/ui/button";

export default function DashboardShell({
  children,
  allow = ["admin", "intern", "corporate", "counselling"],
  redirectTo = "/auth/login",
}: {
  children: React.ReactNode;
  allow?: string[];
  redirectTo?: string;
}) {
  return (
    <RoleGuard allow={allow} redirectTo={redirectTo}>
      <Shell>{children}</Shell>
    </RoleGuard>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { user, role } = useAuth();
  const path = usePathname();

  async function onSignOut() {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="px-6 py-4 border-b">
          <Link href="/dashboard/overview" className="text-lg font-semibold text-primary">
            Workspace
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/dashboard/overview" active={path === "/dashboard/overview"}>
            Overview
          </NavItem>

          {role === "intern" && (
            <NavItem href="/dashboard/internship" active={path?.startsWith("/dashboard/internship")}>
              Internship Logbook
            </NavItem>
          )}

          {role === "corporate" && (
            <NavItem href="/dashboard/training" active={path?.startsWith("/dashboard/training")}>
              Training
            </NavItem>
          )}

          {role === "counselling" && (
            <NavItem href="/dashboard/counselling" active={path?.startsWith("/dashboard/counselling")}>
              Counselling
            </NavItem>
          )}

          {role === "admin" && (
            <NavItem href="/admin" active={path?.startsWith("/admin")}>
              Admin Console
            </NavItem>
          )}
        </nav>

        <div className="p-4 border-t">
          <div className="text-sm text-gray-600">Signed in as</div>
          <div className="text-sm font-medium truncate">{user?.email || user?.displayName || "—"}</div>
          <div className="mt-3">
            <Button variant="ghost" onClick={onSignOut} className="w-full">
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="w-full bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Workspace</h2>
            <div className="text-sm text-gray-500 hidden sm:inline">Role: {role || "—"}</div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/profile" className="text-sm text-gray-600">
              Profile
            </Link>
            <Button variant="outline" onClick={onSignOut}>
              Logout
            </Button>
          </div>
        </header>

        <main className="p-6 max-w-full">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded text-sm ${active ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-50"}`}
    >
      {children}
    </Link>
  );
}