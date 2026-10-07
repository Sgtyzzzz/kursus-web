"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    logout();
    router.push("/login");
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header style={{ marginBottom: "30px" }}>
      <div className="navbar">
        <Link href="/" className="logo">
          Code<span>Dev</span>
        </Link>
        <nav>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link href="/about" className={pathname === "/about" ? "active" : ""}>
            About
          </Link>
          <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
            Contact
          </Link>

          {isAuthenticated && user ? (
            <>
              {isAdmin ? (
                <>
                  {/* Admin Navigation Links */}
                  <Link
                    href="/admin/dashboard"
                    className={isActive("/admin/dashboard") || pathname === "/dashboard" ? "active" : ""}
                  >
                    📊 Admin Dashboard
                  </Link>
                  <Link
                    href="/kursus"
                    className={isActive("/kursus") ? "active" : ""}
                  >
                    📑 Kelola Kursus
                  </Link>
                  <Link
                    href="/admin/users"
                    className={isActive("/admin/users") ? "active" : ""}
                  >
                    👥 Kelola User
                  </Link>
                  <span
                    style={{
                      color: "var(--secondary-text)",
                      fontSize: "0.85rem",
                      padding: "0 10px",
                      borderLeft: "1px solid var(--border-color)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>
                      👤 <strong style={{ color: "var(--main-text)" }}>{user.name}</strong>
                    </span>
                    <span className="badge badge-purple" style={{ fontSize: "0.72rem", padding: "2px 8px" }}>
                      ADMIN
                    </span>
                  </span>
                </>
              ) : (
                <>
                  {/* Regular User (Student) Navigation Links */}
                  <Link
                    href="/user/dashboard"
                    className={isActive("/user/dashboard") || pathname === "/dashboard" ? "active" : ""}
                  >
                    🎓 Dashboard Siswa
                  </Link>
                  <Link
                    href="/user/kursus"
                    className={isActive("/user/kursus") ? "active" : ""}
                  >
                    📖 Katalog Kursus
                  </Link>
                  <span
                    style={{
                      color: "var(--secondary-text)",
                      fontSize: "0.85rem",
                      padding: "0 10px",
                      borderLeft: "1px solid var(--border-color)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>
                      👤 <strong style={{ color: "var(--main-text)" }}>{user.name}</strong>
                    </span>
                    <span className="badge badge-green" style={{ fontSize: "0.72rem", padding: "2px 8px" }}>
                      USER
                    </span>
                  </span>
                </>
              )}

              <form onSubmit={handleLogout} style={{ display: "inline", margin: 0, padding: 0 }}>
                <button
                  type="submit"
                  className="btn btn-sm btn-danger"
                  style={{ margin: 0, padding: "6px 14px" }}
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={pathname === "/login" ? "active" : ""}>
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-sm btn-primary"
                style={{ margin: 0, padding: "6px 16px", color: "#020617", fontWeight: 700 }}
              >
                Daftar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
