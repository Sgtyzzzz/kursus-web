"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      setLoading(false);
      return;
    }

    const res = await login(email);
    setLoading(false);

    if (res.success) {
      if (email.toLowerCase().includes("putra") || email.toLowerCase().includes("admin")) {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } else {
      setError(res.message || "Email atau password yang Anda masukkan salah.");
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("12345678");
  };

  return (
    <div style={{ maxWidth: "460px", margin: "30px auto" }}>
      {error && (
        <div className="alert alert-danger">
          <div>⚠️ {error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ margin: 0 }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px", fontSize: "1.8rem", fontWeight: 800 }}>
          Login Code<span style={{ color: "var(--accent-1)" }}>Dev</span>
        </h2>
        <p style={{ textAlign: "center", fontSize: "0.88rem", marginBottom: "25px", color: "var(--secondary-text)" }}>
          Masuk ke akun Anda untuk mengelola kursus & materi coding
        </p>

        <div className="form-group">
          <label htmlFor="email">Email Pengguna :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@domain.com"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password Anda"
            required
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", fontSize: "0.85rem" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", margin: 0 }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ accentColor: "var(--accent-1)", margin: 0 }}
            />{" "}
            Ingat Saya
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: "100%", padding: "13px" }}
        >
          {loading ? "Memproses..." : "Masuk ke Dashboard"}
        </button>

        <div
          style={{
            marginTop: "20px",
            padding: "14px",
            background: "rgba(255,255,255,0.03)",
            border: "1px dashed var(--border-color)",
            borderRadius: "8px",
            fontSize: "0.85rem",
            color: "var(--secondary-text)",
          }}
        >
          <strong style={{ color: "var(--main-text)" }}>Akun Demo (Klik untuk auto-fill):</strong>
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <button
              type="button"
              onClick={() => handleQuickLogin("putra@gmail.com")}
              style={{
                background: "transparent",
                border: "none",
                color: "#c084fc",
                textAlign: "left",
                cursor: "pointer",
                padding: "2px 0",
                fontSize: "0.82rem",
              }}
            >
              👑 <strong>Admin:</strong> putra@gmail.com | 12345678
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("budi@gmail.com")}
              style={{
                background: "transparent",
                border: "none",
                color: "#34d399",
                textAlign: "left",
                cursor: "pointer",
                padding: "2px 0",
                fontSize: "0.82rem",
              }}
            >
              👤 <strong>User:</strong> budi@gmail.com | 12345678
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "18px", fontSize: "0.88rem", color: "var(--secondary-text)" }}>
          Belum punya akun?{" "}
          <Link href="/register" style={{ fontWeight: 600, color: "var(--accent-1)" }}>
            Daftar Sekarang
          </Link>
        </div>
      </form>
    </div>
  );
}
