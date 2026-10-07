"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCourses } from "@/lib/courses-context";

export default function AdminKursusDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { getCourseById } = useCourses();

  const kursus = getCourseById(id);

  if (!kursus) {
    return (
      <div className="card" style={{ marginTop: "30px", textAlign: "center", padding: "40px" }}>
        <h2>Kursus Tidak Ditemukan</h2>
        <p style={{ color: "var(--secondary-text)", marginTop: "10px" }}>
          Data kursus dengan ID tersebut tidak ditemukan.
        </p>
        <Link href="/kursus" className="btn btn-primary" style={{ marginTop: "15px" }}>
          ← Kembali ke Kelola Kursus
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

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/kursus" style={{ color: "var(--secondary-text)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Kembali ke Kelola Kursus
        </Link>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href={`/kursus/${kursus.id}/edit`} className="btn btn-sm btn-edit">
            ✏️ Edit Kursus
          </Link>
        </div>
      </div>

      <div className="card" style={{ padding: "35px" }}>
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

        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "15px" }}>
          {kursus.judul}
        </h1>

        <p style={{ color: "var(--secondary-text)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "25px" }}>
          {kursus.deskripsi || "Tidak ada deskripsi rinci untuk materi kursus ini."}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", borderTop: "1px solid var(--border-color)", paddingTop: "20px" }}>
          <div>
            <div style={{ fontSize: "0.82rem", color: "var(--secondary-text)" }}>Harga Kelas:</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-1)" }}>
              {kursus.harga === 0 ? "GRATIS" : formatRupiah(kursus.harga)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.82rem", color: "var(--secondary-text)" }}>Instruktur:</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
              {kursus.instruktur}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.82rem", color: "var(--secondary-text)" }}>Siswa Terdaftar:</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
              {kursus.jumlah_siswa} Siswa
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
