"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCourses } from "@/lib/courses-context";

export default function HomePage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { courses } = useCourses();

  const featuredCourses = courses.slice(0, 6);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="card" style={{ marginTop: "10px", padding: "45px 35px", textAlign: "center" }}>
        <span className="badge badge-green" style={{ marginBottom: "16px", fontSize: "0.82rem" }}>
          🚀 Platform Kursus & Bootcamp Pemrograman Modern
        </span>
        <h1 style={{ margin: "0 auto 20px auto", maxWidth: "850px", fontSize: "2.8rem", fontWeight: 800 }}>
          Belajar Coding Lebih Cepat Bersama <span style={{ color: "var(--accent-1)" }}>CodeDev</span>
        </h1>
        <p style={{ margin: "0 auto 30px auto", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: "750px", color: "var(--secondary-text)" }}>
          Sarana belajar interaktif untuk para pelajar, mahasiswa, dan developer. Dapatkan panduan intensif dari mentor ahli di bidang Frontend, Backend, dan Fullstack Web Development.
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          {isAuthenticated ? (
            <>
              <Link
                href={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
                className="btn btn-primary"
                style={{ padding: "13px 30px", fontSize: "1rem" }}
              >
                🎓 Buka Dashboard Kursus
              </Link>
              {isAdmin ? (
                <Link
                  href="/kursus"
                  className="btn btn-secondary"
                  style={{ padding: "13px 25px", fontSize: "1rem" }}
                >
                  Kelola Kursus Coding
                </Link>
              ) : (
                <Link
                  href="/user/kursus"
                  className="btn btn-secondary"
                  style={{ padding: "13px 25px", fontSize: "1rem" }}
                >
                  Jelajahi Katalog Kursus
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="btn btn-primary"
                style={{ padding: "13px 30px", fontSize: "1rem" }}
              >
                Daftar Akun Gratis
              </Link>
              <Link
                href="/login"
                className="btn btn-secondary"
                style={{ padding: "13px 25px", fontSize: "1rem" }}
              >
                Masuk ke Akun
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Featured Courses Section */}
      <div style={{ marginTop: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
          <div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700 }}>
              Materi Kursus <span style={{ color: "var(--accent-1)" }}>Populer</span>
            </h2>
            <p style={{ marginBottom: 0, color: "var(--secondary-text)" }}>Pilih jalur belajar pemrograman sesuai target karir Anda.</p>
          </div>
          {isAuthenticated && (
            <Link
              href={isAdmin ? "/kursus" : "/user/kursus"}
              className="btn btn-outline"
            >
              Lihat Semua →
            </Link>
          )}
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

                  <h3 style={{ marginBottom: "8px", fontSize: "1.25rem", fontWeight: 700 }}>
                    <Link
                      href={isAdmin ? `/kursus/${kursus.id}` : `/user/kursus/${kursus.id}`}
                      style={{ color: "#ffffff", textDecoration: "none" }}
                    >
                      {kursus.judul}
                    </Link>
                  </h3>

                  <p style={{ fontSize: "0.88rem", color: "var(--secondary-text)", marginBottom: "16px", minHeight: "44px" }}>
                    {kursus.deskripsi.length > 110
                      ? kursus.deskripsi.substring(0, 110) + "..."
                      : kursus.deskripsi}
                  </p>

                  <ul style={{ padding: "12px 16px", marginBottom: "18px", listStyle: "none", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                    <li style={{ padding: "4px 0", fontSize: "0.85rem", color: "var(--secondary-text)" }}>
                      👨‍🏫 Instruktur: <strong style={{ color: "#fff" }}>{kursus.instruktur}</strong>
                    </li>
                    <li style={{ padding: "4px 0", fontSize: "0.85rem", color: "var(--secondary-text)" }}>
                      👥 Siswa terdaftar: <strong style={{ color: "#fff" }}>{kursus.jumlah_siswa} siswa</strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "14px" }}>
                    <div className="course-price">
                      {kursus.harga === 0 ? "GRATIS" : formatRupiah(kursus.harga)}
                    </div>
                    {isAuthenticated ? (
                      <Link
                        href={isAdmin ? `/kursus/${kursus.id}` : `/user/kursus/${kursus.id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Lihat Detail
                      </Link>
                    ) : (
                      <Link href="/login" className="btn btn-sm btn-outline">
                        Mulai Belajar
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card" style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              <p>Materi kursus sedang dipersiapkan oleh tim mentor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}