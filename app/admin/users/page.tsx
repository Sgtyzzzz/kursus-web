"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";

export default function AdminUsersPage() {
  const { users, user: currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const totalAdmin = users.filter((u) => u.role === "admin").length;
  const totalUser = users.filter((u) => u.role === "user").length;

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        search === "" ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchRole = roleFilter === "all" || u.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
            Kelola Pengguna & <span style={{ color: "var(--accent-1)" }}>Role Akun</span>
          </h2>
          <p style={{ color: "var(--secondary-text)", marginBottom: 0 }}>
            Daftar seluruh akun pengguna yang terdaftar di platform CodeDev.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/dashboard" className="btn btn-secondary">
            ← Kembali ke Dashboard
          </Link>
        </div>
      </div>

      {/* Stat Mini Cards */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "25px", flexWrap: "wrap" }}>
        <div className="card" style={{ flex: 1, minWidth: "200px", padding: "15px 20px" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>Total Akun Terdaftar</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>{users.length}</div>
        </div>
        <div className="card" style={{ flex: 1, minWidth: "200px", padding: "15px 20px" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>Administrator</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#c084fc" }}>{totalAdmin}</div>
        </div>
        <div className="card" style={{ flex: 1, minWidth: "200px", padding: "15px 20px" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>User / Siswa</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#34d399" }}>{totalUser}</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card" style={{ padding: "18px 24px", marginBottom: "25px" }}>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 2, minWidth: "200px" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau email pengguna..."
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ flex: 1, minWidth: "150px" }}>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{ marginBottom: 0 }}
            >
              <option value="all">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="user">User (Siswa)</option>
            </select>
          </div>
          {(search || roleFilter !== "all") && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setRoleFilter("all");
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

      {/* User Table */}
      <div className="table-container">
        <table className="tech-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pengguna</th>
              <th>Alamat Email</th>
              <th>Role</th>
              <th>Status Hak Akses</th>
              <th>Tanggal Terdaftar</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u, index) => (
                <tr key={u.id}>
                  <td style={{ color: "var(--secondary-text)" }}>{index + 1}</td>
                  <td>
                    <strong style={{ color: "#ffffff" }}>{u.name}</strong>
                    {currentUser?.email === u.email && (
                      <span style={{ fontSize: "0.75rem", color: "var(--accent-1)", marginLeft: "6px" }}>
                        (Akun Anda)
                      </span>
                    )}
                  </td>
                  <td style={{ color: "var(--accent-blue)" }}>{u.email}</td>
                  <td>
                    {u.role === "admin" ? (
                      <span className="badge badge-purple" style={{ fontWeight: 700 }}>
                        ADMINISTRATOR
                      </span>
                    ) : (
                      <span className="badge badge-green" style={{ fontWeight: 700 }}>
                        USER / SISWA
                      </span>
                    )}
                  </td>
                  <td>
                    {u.role === "admin" ? (
                      <span style={{ color: "#c084fc", fontSize: "0.85rem" }}>
                        Full Control (CRUD & Admin Panel)
                      </span>
                    ) : (
                      <span style={{ color: "#34d399", fontSize: "0.85rem" }}>
                        Student Area (Catalog & Belajar)
                      </span>
                    )}
                  </td>
                  <td style={{ color: "var(--secondary-text)", fontSize: "0.85rem" }}>
                    {formatDate(u.created_at)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--secondary-text)" }}>
                  Tidak ada data pengguna yang sesuai dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
