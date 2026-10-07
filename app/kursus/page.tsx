"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useCourses } from "@/lib/courses-context";

export default function KursusIndexPage() {
  const { courses, categories, deleteCourse } = useCourses();
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("all");
  const [successMsg, setSuccessMsg] = useState("");

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

      return matchSearch && matchCat;
    });
  }, [courses, search, kategori]);

  const handleDelete = async (id: number, judul: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kursus "${judul}"?`)) {
      await deleteCourse(id);
      setSuccessMsg(`Kursus "${judul}" telah berhasil dihapus.`);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
            Kelola Kursus & Kelas <span style={{ color: "var(--accent-1)" }}>CodeDev</span>
          </h2>
          <p style={{ color: "var(--secondary-text)", marginBottom: 0 }}>
            Kelola daftar materi kursus pemrograman, harga, level, dan statistik siswa.
          </p>
        </div>
        <Link href="/kursus/create" className="btn btn-primary">
          <span>+</span> Tambah Kursus Baru
        </Link>
      </div>

      {successMsg && (
        <div className="alert alert-success">
          <span>✓</span> {successMsg}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="card" style={{ padding: "18px 24px", marginBottom: "25px" }}>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 2, minWidth: "200px" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, kategori, atau instruktur..."
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ flex: 1, minWidth: "150px" }}>
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
          {(search || kategori !== "all") && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setKategori("all");
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

      {/* Table of Courses */}
      <div className="table-container">
        <table className="tech-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul Kursus</th>
              <th>Kategori</th>
              <th>Level</th>
              <th>Harga</th>
              <th>Instruktur</th>
              <th>Siswa Terdaftar</th>
              <th style={{ textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ color: "var(--secondary-text)" }}>{index + 1}</td>
                  <td>
                    <strong style={{ color: "#ffffff" }}>{item.judul}</strong>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--secondary-text)",
                        maxWidth: "320px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.deskripsi || "Tidak ada deskripsi"}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-purple">{item.kategori}</span>
                  </td>
                  <td>
                    <span
                      className={
                        item.level === "Pemula"
                          ? "badge badge-green"
                          : item.level === "Menengah"
                          ? "badge badge-blue"
                          : "badge badge-amber"
                      }
                    >
                      {item.level}
                    </span>
                  </td>
                  <td style={{ color: "var(--accent-1)", fontWeight: 700 }}>
                    {item.harga === 0 ? "GRATIS" : formatRupiah(item.harga)}
                  </td>
                  <td>{item.instruktur}</td>
                  <td>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{item.jumlah_siswa}</span> siswa
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/kursus/${item.id}`} className="btn btn-sm btn-secondary">
                        Lihat
                      </Link>
                      <Link href={`/kursus/${item.id}/edit`} className="btn btn-sm btn-edit">
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.judul)}
                        className="btn btn-sm btn-danger"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "var(--secondary-text)" }}>
                  Belum ada data kursus yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
