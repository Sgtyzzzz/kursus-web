import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="card" style={{ marginTop: "30px", maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
      <span className="badge badge-purple" style={{ marginBottom: "12px" }}>
        🚀 Mengenal Platform
      </span>
      <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
        Tentang <span style={{ color: "var(--accent-1)" }}>CodeDev</span>
      </h2>
      <p style={{ marginTop: "15px", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--secondary-text)" }}>
        CodeDev dibangun menggunakan ekosistem framework modern Next.js 16 & React 19 yang tangguh, cepat, dan siap skala. Platform ini bertujuan memberikan pengalaman belajar coding terbaik dengan silabus berbasis industri nyata.
      </p>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--secondary-text)" }}>
        Pengembang Fullstack utama adalah <strong style={{ color: "#fff" }}>Sigit (Putra)</strong> bersama <strong style={{ color: "#fff" }}>gitzxy team</strong> yang berpengalaman dalam merancang arsitektur web modern, API berkinerja tinggi, dan desain antarmuka pengguna yang memukau.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px", marginTop: "25px" }}>
        <div style={{ background: "rgba(0, 232, 135, 0.05)", border: "1px solid rgba(0, 232, 135, 0.2)", padding: "18px", borderRadius: "12px" }}>
          <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>🎯</div>
          <strong style={{ color: "var(--accent-1)" }}>Misi Kami</strong>
          <p style={{ fontSize: "0.85rem", marginTop: "5px", marginBottom: 0, color: "var(--secondary-text)" }}>
            Mencetak talenta developer siap kerja dengan kurikulum terstruktur dan materi aplikatif.
          </p>
        </div>
        <div style={{ background: "rgba(139, 92, 246, 0.05)", border: "1px solid rgba(139, 92, 246, 0.2)", padding: "18px", borderRadius: "12px" }}>
          <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>⚡</div>
          <strong style={{ color: "#c084fc" }}>Teknologi Terdepan</strong>
          <p style={{ fontSize: "0.85rem", marginTop: "5px", marginBottom: 0, color: "var(--secondary-text)" }}>
            Menggabungkan praktik pemrograman modern, Next.js Server Components, dan integrasi REST API.
          </p>
        </div>
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
        <Link href="/" className="btn btn-secondary">
          ← Kembali ke Beranda
        </Link>
        <Link href="/contact" className="btn btn-primary">
          Hubungi Tim Kami
        </Link>
      </div>
    </div>
  );
}