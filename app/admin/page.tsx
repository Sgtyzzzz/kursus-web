import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FormTambahSiswa from "@/components/formTambahSiswa";
import TombolHapus from "@/components/TombolHapus";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const daftarSiswa = await prisma.pm_siswa.findMany({
    orderBy: { no_urut: "asc" },
  });

  return (
    <main className="min-h-screen bg-[#050816] text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-36 pb-20">
        {/* Header */}
        <div className="mb-8">
          <p className="text-cyan-400 font-mono mb-2 text-sm tracking-wide">
            &gt; Admin Panel
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Panel Data{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Siswa
            </span>
          </h1>
        </div>

        {/* 2. Pasang Form Tambah (Client Component) */}
        <FormTambahSiswa />

        {/* Tabel Data Siswa */}
        <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-xl shadow-cyan-950/20">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>📋</span> Data Siswa
            </h2>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">
              {daftarSiswa.length} Siswa
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">No Urut</th>
                  <th className="py-4 px-6 font-semibold">Nama Siswa</th>
                  <th className="py-4 px-6 font-semibold">Jenis Kelamin</th>
                  <th className="py-4 px-6 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {daftarSiswa.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-gray-500">
                      Belum ada data siswa.
                    </td>
                  </tr>
                ) : (
                  daftarSiswa.map((pm_siswa) => (
                    <tr key={pm_siswa.no_urut} className="hover:bg-white/[0.04] transition-colors">
                      <td className="py-4 px-6 font-mono text-cyan-400 font-semibold">
                        #{pm_siswa.no_urut}
                      </td>
                      <td className="py-4 px-6 font-medium text-white">
                        {pm_siswa.nama_lengkap}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${pm_siswa.jenis_kelamin?.toLowerCase().includes("laki")
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            }`}
                        >
                          {pm_siswa.jenis_kelamin}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Link pindah halaman Edit */}
                          <Link href={`/admin/edit/${pm_siswa.no_urut}`}>
                            <button className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition font-medium text-xs cursor-pointer">
                              Edit
                            </button>
                          </Link>

                          {/* Pasang Tombol Hapus & oper props no_urut */}
                          <TombolHapus no_urut={pm_siswa.no_urut} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
