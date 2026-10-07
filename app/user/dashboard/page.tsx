"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useCourses } from "@/lib/courses-context";

export default function UserDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { courses, categories } = useCourses();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const featuredCourses = courses.slice(0, 6);

  return (
    <div>
      {/* Hero / Welcome Banner for Student */}
      <div
        className="card"
        style={{
          marginTop: "10px",
          marginBottom: "30px",
          padding: "35px 40px",
          background: "linear-gradient(135deg, rgba(13, 17, 23, 0.95), rgba(24, 30, 42, 0.85))",
          border: "1px solid rgba(0, 232, 135, 0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: "12px", fontSize: "0.8rem" }}>
              PORTAL SISWA / MEMBER
            </span>
            <h1 style={{ fontSize: "2.2rem", marginBottom: "10px", fontWeight: 800 }}>
              Selamat Datang, <span style={{ color: "var(--accent-1)" }}>{user?.name || "Siswa"}</span> 👋
            </h1>
            <p style={{ color: "var(--secondary-text)", maxWidth: "650px", fontSize: "1.05rem", marginBottom: 0 }}>
              Tingkatkan skill coding Anda dengan materi terstruktur, instruktur berpengalaman, dan proyek industri terkini.
            </p>
          </div>
          <div>
            <Link href="/user/kursus" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
              🎓 Jelajahi Katalog Kursus
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="stat-grid" style={{ marginBottom: "35px" }}>
        <div className="stat-card">
          <span className="stat-label">Kursus Siap Dipelajari</span>
          <div className="stat-number" style={{ color: "var(--accent-1)" }}>
            {courses.length}
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>
            Materi interaktif dari pemula hingga mahir
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Kategori Teknologi</span>
          <div className="stat-number" style={{ color: "var(--accent-blue)" }}>
            {categories.length}
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>
            Web, Mobile, Backend, AI, & DevOps
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Status Keanggotaan</span>
          <div className="stat-number" style={{ color: "#34d399", fontSize: "1.8rem", margin: "8px 0" }}>
            Aktif (User)
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>
            Akses materi gratis & kelas berbayar
          </span>
        </div>
      </div>

      {/* Categories Pills */}
      {categories.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", fontWeight: 700 }}>
            Pilih Kategori Belajar Favoritmu
          </h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link href="/user/kursus" className="btn btn-sm btn-secondary">
              Semua Kategori
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/user/kursus?kategori=${encodeURIComponent(cat)}`}
                className="badge badge-purple"
                style={{ fontSize: "0.88rem", padding: "8px 16px", textDecoration: "none", cursor: "pointer" }}
              >
                # {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Courses Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700 }}>🔥 Rekomendasi Kursus Terbaru</h3>
        <Link href="/user/kursus" style={{ color: "var(--accent-1)", fontWeight: 600, textDecoration: "none" }}>
          Lihat Semua Kursus →
        </Link>
      </div>

      <div className="course-grid">
        {featuredCourses.length > 0 ? (
          featuredCourses.map((kursus) => (
            <div key={kursus.id} className="course-card">
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span className="badge badge-purple">{kursus.kategori}</span>
                  <span
                    className={
                      kursus.level === "Pemula"
                        ? "badge badge-green"
                        : kursus.level === "Menengah"
                        ? "badge badge-blue"
                        : "badge badge-amber"
                    }
                  >
                    {kursus.level}
                  </span>
                </div>

                <h3 style={{ marginBottom: "8px", lineHeight: 1.3, fontSize: "1.25rem", fontWeight: 700 }}>
                  <Link href={`/user/kursus/${kursus.id}`} style={{ color: "#ffffff", textDecoration: "none" }}>
                    {kursus.judul}
                  </Link>
                </h3>

                <p style={{ fontSize: "0.88rem", color: "var(--secondary-text)", marginBottom: "16px" }}>
                  {kursus.deskripsi.length > 110
                    ? kursus.deskripsi.substring(0, 110) + "..."
                    : kursus.deskripsi}
                </p>

                <ul style={{ padding: "12px 16px", marginBottom: "18px", listStyle: "none", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                  <li style={{ padding: "4px 0", fontSize: "0.85rem", color: "var(--secondary-text)" }}>
                    👨‍🏫 Instruktur: <strong style={{ color: "#fff" }}>{kursus.instruktur}</strong>
                  </li>
                  <li style={{ padding: "4px 0", fontSize: "0.85rem", color: "var(--secondary-text)" }}>
                    👥 Siswa belajar: <strong style={{ color: "#fff" }}>{kursus.jumlah_siswa} siswa</strong>
                  </li>
                </ul>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "14px" }}>
                  <div className="course-price">
                    {kursus.harga === 0 ? "GRATIS" : formatRupiah(kursus.harga)}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link href={`/user/kursus/${kursus.id}`} className="btn btn-sm btn-primary">
                      Mulai Belajar →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            <p>Belum ada kursus yang tersedia saat ini. Silakan cek kembali nanti.</p>
          </div>
        )}
      </div>
    </div>
  );
}
