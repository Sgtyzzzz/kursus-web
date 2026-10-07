import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import { updateSiswa } from "@/app/admin/action";

export default async function EditPage({ params }) {
  const { no_urut } = await params;
  const id = Number(no_urut);

  const siswa = await prisma.pm_siswa.findUnique({
    where: { no_urut: id },
  });

  if (!siswa) {
    return (
      <main className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center p-6">
        <Navbar />
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center max-w-md">
          <p className="text-xl font-bold mb-4">Data siswa tidak ditemukan</p>
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-sm inline-block"
          >
            ← Kembali ke Admin
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-36 pb-20">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-cyan-400 font-mono mb-2 text-sm tracking-wide">
              &gt; Admin Panel / Edit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Edit Data{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Siswa
              </span>
            </h1>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white transition inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Kembali</span>
          </Link>
        </div>

        {/* Card Form */}
        <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl shadow-cyan-950/20">
          <form className="space-y-6" action={updateSiswa}>
            <input type="hidden" name="no_urut" value={siswa.no_urut} />

            {/* Input Teks */}
            <div>
              <label
                htmlFor="nama_lengkap"
                className="block text-xs font-medium text-gray-300 mb-2 uppercase tracking-wider"
              >
                Nama Lengkap
              </label>
              <input
                id="nama_lengkap"
                type="text"
                name="nama_lengkap"
                defaultValue={siswa.nama_lengkap}
                required
                placeholder="Nama Lengkap"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>

            {/* Dropdown Select */}
            <div>
              <label
                htmlFor="jenis_kelamin"
                className="block text-xs font-medium text-gray-300 mb-2 uppercase tracking-wider"
              >
                Jenis Kelamin
              </label>
              <div className="relative">
                <select
                  id="jenis_kelamin"
                  name="jenis_kelamin"
                  defaultValue={siswa.jenis_kelamin}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#090d24] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition appearance-none cursor-pointer pr-10"
                >
                  <option value="laki laki" className="bg-[#090d24] text-white">
                    Laki-Laki
                  </option>
                  <option value="perempuan" className="bg-[#090d24] text-white">
                    Perempuan
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition duration-200 cursor-pointer"
              >
                Simpan Perubahan
              </button>
              <Link
                href="/admin"
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white transition"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}