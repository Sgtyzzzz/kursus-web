"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useCourses } from "@/lib/courses-context";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, users } = useAuth();
  const { courses } = useCourses();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (!isAdmin) {
      router.push("/user/dashboard");
    }
  }, [isAuthenticated, isAdmin, router]);

  const totalSiswa = courses.reduce((acc, c) => acc + (c.jumlah_siswa || 0), 0);
  const totalAdmin = users.filter((u) => u.role === "admin").length;
  const totalUser = users.filter((u) => u.role === "user").length;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const recentCourses = courses.slice(0, 6);
  const recentUsers = users.slice(0, 5);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="badge badge-purple" style={{ marginBottom: "8px" }}>
            PANEL ADMINISTRATOR
          </span>
          <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
            Dashboard Admin <span style={{ color: "var(--accent-1)" }}>CodeDev</span>
          </h2>
          <p style={{ color: "var(--secondary-text)", marginBottom: 0 }}>
            Selamat datang kembali, <strong>{user?.name || "Admin"}</strong>! Ringkasan performa dan metrik platform.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/kursus/create" className="btn btn-primary">
            + Tambah Kursus
          </Link>
          <Link href="/admin/users" className="btn btn-secondary">
            👥 Kelola User
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Total Kursus Aktif</span>
          <div className="stat-number" style={{ color: "var(--accent-1)" }}>
            {courses.length}
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>
            Materi pemrograman tersedia
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Siswa Belajar</span>
          <div className="stat-number" style={{ color: "var(--accent-blue)" }}>
            {totalSiswa}
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>
            Akumulasi seluruh kursus
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Akun Terdaftar</span>
          <div className="stat-number" style={{ color: "#c084fc" }}>
            {users.length}
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>
            {totalAdmin} Admin • {totalUser} Siswa
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Status Server & API</span>
          <div className="stat-number" style={{ color: "#34d399", fontSize: "1.8rem", margin: "8px 0" }}>
            Online ⚡
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>
            Next.js App Router & REST API
          </span>
        </div>
      </div>

      {/* Two Column Layout: Recent Courses & Users */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "25px", marginTop: "10px" }}>
        {/* Recent Courses Table */}
        <div className="card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Materi Kursus Terbaru</h3>
            <Link href="/kursus" style={{ color: "var(--accent-1)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
              Kelola Semua →
            </Link>
          </div>

          <div className="table-container" style={{ margin: 0 }}>
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Judul Kursus</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                {recentCourses.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong style={{ color: "#fff" }}>{item.judul}</strong>
                      <div style={{ fontSize: "0.78rem", color: "var(--secondary-text)" }}>
                        {item.instruktur}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-purple" style={{ fontSize: "0.7rem" }}>
                        {item.kategori}
                      </span>
                    </td>
                    <td style={{ color: "var(--accent-1)", fontWeight: 700 }}>
                      {item.harga === 0 ? "GRATIS" : formatRupiah(item.harga)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users List */}
        <div className="card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Pengguna Terdaftar Terbaru</h3>
            <Link href="/admin/users" style={{ color: "var(--accent-1)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
              Lihat Detail →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentUsers.map((u) => (
              <div
                key={u.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <strong style={{ color: "#fff" }}>{u.name}</strong>
                  <div style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>
                    {u.email}
                  </div>
                </div>
                <div>
                  {u.role === "admin" ? (
                    <span className="badge badge-purple" style={{ fontSize: "0.72rem" }}>
                      ADMIN
                    </span>
                  ) : (
                    <span className="badge badge-green" style={{ fontSize: "0.72rem" }}>
                      USER
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Link href="/admin/users" className="btn btn-sm btn-secondary" style={{ width: "100%" }}>
              Lihat Data Lengkap User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
