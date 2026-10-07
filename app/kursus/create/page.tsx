"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCourses } from "@/lib/courses-context";

export default function CreateKursusPage() {
  const router = useRouter();
  const { addCourse } = useCourses();

  const [formData, setFormData] = useState({
    judul: "",
    kategori: "Frontend",
    level: "Pemula",
    harga: 0,
    instruktur: "Sigit - CodeDev Team",
    deskripsi: "",
    jumlah_siswa: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.judul.trim()) newErrors.judul = "Judul kursus wajib diisi.";
    if (!formData.kategori.trim()) newErrors.kategori = "Kategori kursus wajib dipilih/diisi.";
    if (!formData.level) newErrors.level = "Level kursus wajib dipilih.";
    if (formData.harga < 0) newErrors.harga = "Harga tidak boleh negatif.";
    if (!formData.instruktur.trim()) newErrors.instruktur = "Nama instruktur wajib diisi.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    await addCourse({
      judul: formData.judul,
      kategori: formData.kategori,
      level: formData.level,
      harga: Number(formData.harga),
      instruktur: formData.instruktur,
      deskripsi: formData.deskripsi,
      jumlah_siswa: Number(formData.jumlah_siswa),
    });

    setSubmitting(false);
    router.push("/kursus");
  };

  return (
    <div style={{ maxWidth: "680px", margin: "20px auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/kursus" style={{ color: "var(--secondary-text)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Kembali ke Daftar Kursus
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ margin: 0 }}>
        <span className="badge badge-green" style={{ marginBottom: "12px" }}>
          FORMULIR KURSUS BARU
        </span>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "8px" }}>
          Tambah Kursus <span style={{ color: "var(--accent-1)" }}>CodeDev</span>
        </h2>
        <p style={{ color: "var(--secondary-text)", fontSize: "0.88rem", marginBottom: "25px" }}>
          Lengkapi formulir di bawah ini untuk menerbitkan materi pembelajaran baru.
        </p>

        <div className="form-group">
          <label htmlFor="judul">Judul Kursus :</label>
          <input
            type="text"
            id="judul"
            value={formData.judul}
            onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
            placeholder="Contoh: Fullstack Laravel 13 & Next.js Pro"
            required
            autoFocus
          />
          {errors.judul && <span className="error-text">{errors.judul}</span>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div className="form-group">
            <label htmlFor="kategori">Kategori Teknologi :</label>
            <input
              type="text"
              id="kategori"
              value={formData.kategori}
              onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
              placeholder="Frontend, Backend, AI, dll."
              required
            />
            {errors.kategori && <span className="error-text">{errors.kategori}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="level">Tingkat Kesulitan :</label>
            <select
              id="level"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            >
              <option value="Pemula">Pemula</option>
              <option value="Menengah">Menengah</option>
              <option value="Mahir">Mahir</option>
            </select>
            {errors.level && <span className="error-text">{errors.level}</span>}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div className="form-group">
            <label htmlFor="harga">Harga Kursus (IDR) :</label>
            <input
              type="number"
              id="harga"
              value={formData.harga}
              onChange={(e) => setFormData({ ...formData, harga: Number(e.target.value) })}
              min="0"
              required
            />
            <div className="form-helper">Isi 0 jika kelas gratis</div>
            {errors.harga && <span className="error-text">{errors.harga}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="jumlah_siswa">Jumlah Siswa Terdaftar :</label>
            <input
              type="number"
              id="jumlah_siswa"
              value={formData.jumlah_siswa}
              onChange={(e) => setFormData({ ...formData, jumlah_siswa: Number(e.target.value) })}
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="instruktur">Instruktur Pengajar :</label>
          <input
            type="text"
            id="instruktur"
            value={formData.instruktur}
            onChange={(e) => setFormData({ ...formData, instruktur: e.target.value })}
            placeholder="Nama instruktur / Mentor"
            required
          />
          {errors.instruktur && <span className="error-text">{errors.instruktur}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="deskripsi">Deskripsi & Kurikulum Materi :</label>
          <textarea
            id="deskripsi"
            rows={4}
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
            placeholder="Jelaskan ringkasan materi dan apa yang akan dipelajari siswa..."
          />
        </div>

        <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ flex: 2, padding: "13px" }}
          >
            {submitting ? "Menyimpan..." : "Simpan Kursus Baru"}
          </button>
          <Link href="/kursus" className="btn btn-secondary" style={{ flex: 1, padding: "13px" }}>
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
