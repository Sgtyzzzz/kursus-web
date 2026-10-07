"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password || !passwordConfirmation) {
      setError("Semua bidang formulir wajib diisi.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      setLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    const res = await register(name, email);
    setLoading(false);

    if (res.success) {
      if (email.toLowerCase().includes("admin")) {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } else {
      setError(res.message || "Gagal mendaftar. Silakan coba lagi.");
    }
  };

  return (
    <div style={{ maxWidth: "480px", margin: "30px auto" }}>
      {error && (
        <div className="alert alert-danger">
          <div>⚠️ {error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ margin: 0 }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px", fontSize: "1.8rem", fontWeight: 800 }}>
          Daftar Akun Code<span style={{ color: "var(--accent-1)" }}>Dev</span>
        </h2>
        <p style={{ textAlign: "center", fontSize: "0.88rem", marginBottom: "25px", color: "var(--secondary-text)" }}>
          Bergabunglah dengan platform belajar coding modern
        </p>

        <div className="form-group">
          <label htmlFor="name">Nama Lengkap :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Sigit Pratama"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Alamat Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@domain.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 6 karakter"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password_confirmation">Konfirmasi Password :</label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Ulangi password Anda"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: "100%", padding: "13px", marginTop: "10px" }}
        >
          {loading ? "Mendaftarkan Akun..." : "Buat Akun Sekarang"}
        </button>

        <div style={{ textAlign: "center", marginTop: "22px", fontSize: "0.88rem", color: "var(--secondary-text)" }}>
          Sudah punya akun?{" "}
          <Link href="/login" style={{ fontWeight: 600, color: "var(--accent-1)" }}>
            Masuk di sini
          </Link>
        </div>
      </form>
    </div>
  );
}
