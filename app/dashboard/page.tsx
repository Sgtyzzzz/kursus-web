"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function DashboardDispatcher() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (isAdmin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  }, [isAuthenticated, isAdmin, router]);

  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <p style={{ color: "var(--secondary-text)" }}>Mengarahkan ke dashboard Anda...</p>
    </div>
  );
}
