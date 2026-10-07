"use client";

import Link from "next/link";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCourses } from "@/lib/courses-context";

function KursusCatalogContent() {
  const { courses, categories } = useCourses();
  const searchParams = useSearchParams();

  const initialCat = searchParams.get("kategori") || "all";
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState(initialCat);
  const [level, setLevel] = useState("all");

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((item) => {
      const matchSearch =
        search === "" ||
        item.judul.toLowerCase().includes(search.toLowerCase()) ||
        item.kategori.toLowerCase().includes(search.toLowerCase()) ||
        item.instruktur.toLowerCase().includes(search.toLowerCase());

      const matchCat = kategori === "all" || item.kategori.toLowerCase() === kategori.toLowerCase();
      const matchLevel = level === "all" || item.level.toLowerCase() === level.toLowerCase();

      return matchSearch && matchCat && matchLevel;
    });
  }, [courses, search, kategori, level]);

  return (
    <div>
      <div style={{ marginTop: "10px", marginBottom: "25px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
          Katalog Kursus & Materi Belajar <span style={{ color: "var(--accent-1)" }}>CodeDev</span>
        </h2>
        <p style={{ color: "var(--secondary-text)", marginBottom: 0 }}>
          Pilih topik pemrograman yang ingin Anda kuasai. Mulai dari level pemula hingga mahir bersama mentor handal.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: "18px 24px", marginBottom: "30px" }}>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 2, minWidth: "200px" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul materi, kategori, instruktur..."
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ flex: 1, minWidth: "140px" }}>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              style={{ marginBottom: 0 }}
            >
              <option value="all">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: "140px" }}>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              style={{ marginBottom: 0 }}
            >
              <option value="all">Semua Level</option>
              <option value="Pemula">Pemula</option>
              <option value="Menengah">Menengah</option>
              <option value="Mahir">Mahir</option>
            </select>
          </div>
          {(search || kategori !== "all" || level !== "all") && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setKategori("all");
                  setLevel("all");
                }}
                className="btn btn-secondary"
                style={{ padding: "12px 16px" }}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Course Grid */}
      <div className="course-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((kursus) => (
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
                      Pelajari Kursus →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            <p style={{ color: "var(--secondary-text)", fontSize: "1.05rem" }}>
              Tidak ada kursus yang sesuai dengan kriteria pencarian.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setKategori("all");
                setLevel("all");
              }}
              className="btn btn-secondary"
              style={{ marginTop: "15px" }}
            >
              Lihat Semua Kursus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UserKursusIndexPage() {
  return (
    <Suspense fallback={<div className="card" style={{ textAlign: "center", padding: "40px" }}>Memuat katalog kursus...</div>}>
      <KursusCatalogContent />
    </Suspense>
  );
}
