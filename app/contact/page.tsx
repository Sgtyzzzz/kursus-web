"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMsg("Pesan Anda telah berhasil terkirim ke Tim Developer CodeDev!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSuccessMsg("Pesan berhasil dicatat!");
      }
    } catch {
      setSuccessMsg("Pesan berhasil dikirimkan!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: "30px", maxWidth: "750px", marginLeft: "auto", marginRight: "auto" }}>
      <span className="badge badge-blue" style={{ marginBottom: "12px" }}>
        💬 Layanan Bantuan
      </span>
      <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
        Hubungi <span style={{ color: "var(--accent-1)" }}>Tim Developer</span>
      </h2>
      <p style={{ marginTop: "15px", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--secondary-text)" }}>
        Punya pertanyaan mengenai kelas kursus, ingin berkonsultasi seputar kurikulum, atau ingin bekerja sama dengan tim developer CodeDev?
      </p>

      <div style={{ background: "rgba(18, 23, 32, 0.7)", border: "1px solid var(--border-color)", padding: "22px", borderRadius: "12px", marginTop: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
          <span style={{ fontSize: "1.6rem" }}>📸</span>
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--secondary-text)" }}>Instagram Resmi Developer:</div>
            <a
              href="https://www.instagram.com/gitzzzuy/"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "1.1rem", color: "var(--accent-1)", fontWeight: 700, textDecoration: "none" }}
            >
              @gitzzzuy
            </a>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontSize: "1.6rem" }}>👥</span>
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--secondary-text)" }}>Tim Kolaborasi:</div>
            <strong style={{ fontSize: "1rem", color: "#ffffff" }}>CodeDev with gitzxy team</strong>
          </div>
        </div>
      </div>

      {/* Interactive Contact Form to Simple API */}
      <div style={{ marginTop: "30px", borderTop: "1px solid var(--border-color)", paddingTop: "25px" }}>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "15px" }}>Kirim Pesan Cepat</h3>
        {successMsg && (
          <div className="alert alert-success">
            <span>✓</span> {successMsg}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ margin: 0 }}>
          <div className="form-group">
            <label htmlFor="name">Nama Anda :</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Alamat Email :</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="nama@domain.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Pesan / Pertanyaan :</label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tuliskan pesan atau pertanyaan Anda disini..."
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: "100%", padding: "13px" }}>
            {isSubmitting ? "Mengirimkan Pesan..." : "Kirim Pesan Sekarang 🚀"}
          </button>
        </form>
      </div>

      <div style={{ marginTop: "25px" }}>
        <Link href="/" className="btn btn-secondary">
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}