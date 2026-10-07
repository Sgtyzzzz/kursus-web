"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCourses } from "@/lib/courses-context";

export default function UserKursusDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { getCourseById, courses } = useCourses();
  const [enrolled, setEnrolled] = useState(false);

  const kursus = getCourseById(id);

  if (!kursus) {
    return (
      <div className="card" style={{ marginTop: "30px", textAlign: "center", padding: "50px" }}>
        <h2>Kursus Tidak Ditemukan</h2>
        <p style={{ color: "var(--secondary-text)", marginTop: "10px" }}>
          Maaf, data kursus yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link href="/user/kursus" className="btn btn-primary" style={{ marginTop: "20px" }}>
          ← Kembali ke Katalog Kursus
        </Link>
      </div>
    );
  }

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const relatedCourses = courses
    .filter((c) => c.kategori === kursus.kategori && c.id !== kursus.id)
    .slice(0, 3);

  const handleEnroll = () => {
    setEnrolled(true);
  };

  return (
    <div>
      <div style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Link href="/user/kursus" style={{ color: "var(--secondary-text)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Kembali ke Katalog Kursus
        </Link>
      </div>

      {enrolled && (
        <div className="alert alert-success">
          <span>✓</span> Selamat! Anda telah terdaftar dalam kursus <strong>{kursus.judul}</strong>. Silakan akses modul pembelajaran pertama Anda di portal!
        </div>
      )}

      {/* Course Overview Hero */}
      <div className="card" style={{ padding: "35px 40px", marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "25px" }}>
          <div style={{ flex: 2, minWidth: "280px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
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

            <h1 style={{ fontSize: "2.2rem", lineHeight: 1.25, marginBottom: "16px", fontWeight: 800 }}>
              {kursus.judul}
            </h1>

            <p style={{ color: "var(--secondary-text)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "25px" }}>
              {kursus.deskripsi ||
                "Dalam kursus ini, Anda akan mempelajari konsep dasar hingga implementasi nyata materi secara komprehensif bersama instruktur berpengalaman."}
            </p>

            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", color: "var(--secondary-text)", fontSize: "0.95rem" }}>
              <div>
                👨‍🏫 Instruktur: <strong style={{ color: "#ffffff" }}>{kursus.instruktur}</strong>
              </div>
              <div>
                👥 Siswa Terdaftar: <strong style={{ color: "#ffffff" }}>{kursus.jumlah_siswa + (enrolled ? 1 : 0)} orang</strong>
              </div>
              <div>
                ⭐ Rating: <strong style={{ color: "#fbbf24" }}>4.9 / 5.0</strong>
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div
            className="card"
            style={{
              flex: 1,
              minWidth: "260px",
              maxWidth: "340px",
              padding: "25px",
              border: "1px solid var(--accent-1)",
              background: "rgba(13, 17, 23, 0.9)",
            }}
          >
            <div style={{ fontSize: "0.85rem", color: "var(--secondary-text)", marginBottom: "6px" }}>
              Biaya Investasi Belajar
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent-1)", marginBottom: "18px" }}>
              {kursus.harga === 0 ? "GRATIS" : formatRupiah(kursus.harga)}
            </div>

            <ul style={{ padding: 0, listStyle: "none", marginBottom: "20px", fontSize: "0.88rem", color: "var(--secondary-text)" }}>
              <li style={{ padding: "6px 0" }}>✓ Akses Materi Selamanya</li>
              <li style={{ padding: "6px 0" }}>✓ Sertifikat Kelulusan Resmi</li>
              <li style={{ padding: "6px 0" }}>✓ Forum Diskusi & Bantuan Mentor</li>
              <li style={{ padding: "6px 0" }}>✓ Source Code & Project Files</li>
            </ul>

            <button
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px", fontSize: "1rem", fontWeight: 700 }}
              onClick={handleEnroll}
            >
              {enrolled ? "✅ Anda Sudah Terdaftar" : "🚀 Mulai Belajar Sekarang"}
            </button>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <div>
          <h3 style={{ marginTop: "40px", marginBottom: "20px", fontSize: "1.3rem" }}>Kursus Terkait Lainnya</h3>
          <div className="course-grid">
            {relatedCourses.map((related) => (
              <div key={related.id} className="course-card">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span className="badge badge-purple">{related.kategori}</span>
                    <span className="badge badge-green">{related.level}</span>
                  </div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    <Link href={`/user/kursus/${related.id}`} style={{ color: "#ffffff", textDecoration: "none" }}>
                      {related.judul}
                    </Link>
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--secondary-text)", marginTop: "6px" }}>
                    {related.deskripsi.length > 80
                      ? related.deskripsi.substring(0, 80) + "..."
                      : related.deskripsi}
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px" }}>
                  <span style={{ color: "var(--accent-1)", fontWeight: 700 }}>
                    {related.harga === 0 ? "GRATIS" : formatRupiah(related.harga)}
                  </span>
                  <Link href={`/user/kursus/${related.id}`} className="btn btn-sm btn-secondary">
                    Lihat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
