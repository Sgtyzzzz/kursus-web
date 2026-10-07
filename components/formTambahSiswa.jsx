'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tambahSiswa } from '@/app/admin/actions';

export default function FormTambahSiswa() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        nama_lengkap: '',
        jenis_kelamin: 'laki laki'
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await tambahSiswa(formData);
            alert('Data berhasil disimpan!');
            setFormData({ nama_lengkap: '', jenis_kelamin: 'laki laki' });
            router.refresh();
        } catch (error) {
            console.error('Gagal tambah data:', error);
            alert('Gagal menyimpan data: ' + (error?.message || 'Terjadi kesalahan'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl mb-8 shadow-xl shadow-cyan-950/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>➕</span> Tambah Data Siswa
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                <input
                    type="text"
                    name="nama_lengkap"
                    value={formData.nama_lengkap}
                    onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                    placeholder="Nama Lengkap"
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
                <div className="relative">
                    <select
                        name="jenis_kelamin"
                        value={formData.jenis_kelamin}
                        onChange={(e) => setFormData({ ...formData, jenis_kelamin: e.target.value })}
                        required
                        className="w-full md:w-44 px-4 py-2.5 rounded-xl bg-[#090d24] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition appearance-none cursor-pointer pr-10"
                    >
                        <option value="laki laki" className="bg-[#090d24] text-white">
                            Laki-laki
                        </option>
                        <option value="perempuan" className="bg-[#090d24] text-white">
                            Perempuan
                        </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition duration-200 cursor-pointer text-center"
                >
                    {isLoading ? 'Menyimpan...' : 'Simpan data'}
                </button>
            </form>
        </div>
    );
}
