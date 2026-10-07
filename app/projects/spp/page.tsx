"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

const features = [
  "Login pengguna dan admin",
  "Role management",
  "Manajemen data siswa",
  "Pengelolaan tagihan SPP",
  "Sistem pembayaran",
  "Pengelolaan data pengguna",
];

const technologies = [
  "PHP Native",
  "MySQL",
  "HTML",
  "CSS",
];

export default function SPP() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">

      <Navbar />

      {/* Background */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />

      </div>


      {/* Hero */}

      <section className="max-w-6xl mx-auto px-6 pt-40 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <p className="text-cyan-400 font-mono">
            &gt; Project #3
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mt-4">

            Sistem{" "}

            <span className="text-cyan-400">
              Pembayaran SPP
            </span>

          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mt-8 leading-relaxed">

            Sistem informasi berbasis web yang dibuat
            untuk membantu pengelolaan data siswa,
            tagihan, dan pembayaran SPP.

          </p>

        </motion.div>


        {/* Screenshot */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 rounded-3xl overflow-hidden border border-white/10"
        >

          <img
            src="/projects/spp.png"
            alt="Sistem Pembayaran SPP"
            className="w-full object-cover"
          />

        </motion.div>

      </section>


      {/* About */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-3 gap-12">

          <div className="md:col-span-2">

            <p className="text-cyan-400 font-mono">
              ABOUT PROJECT
            </p>

            <h2 className="text-4xl font-bold mt-4">
              Tentang Project
            </h2>

            <p className="text-gray-400 mt-6 text-lg leading-relaxed">

              Project ini dibuat sebagai sistem informasi
              untuk membantu proses pengelolaan pembayaran
              SPP secara lebih terstruktur.

            </p>

            <p className="text-gray-400 mt-5 text-lg leading-relaxed">

              Dalam project ini saya belajar menerapkan
              sistem login dengan role yang berbeda,
              mengelola data siswa, serta menghubungkan
              aplikasi dengan database MySQL.

            </p>

          </div>


          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-fit">

            <p className="text-gray-500">
              Project Type
            </p>

            <p className="font-semibold mt-2">
              Information System
            </p>

            <p className="text-gray-500 mt-6">
              Role
            </p>

            <p className="font-semibold mt-2">
              Developer
            </p>

            <p className="text-gray-500 mt-6">
              Status
            </p>

            <p className="text-cyan-400 font-semibold mt-2">
              Completed
            </p>

          </div>

        </div>

      </section>


      {/* Features */}

      <section className="bg-white/[0.02] py-24">

        <div className="max-w-6xl mx-auto px-6">

          <p className="text-cyan-400 font-mono">
            FEATURES
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Fitur Utama
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-12">

            {features.map((feature, index) => (

              <motion.div
                key={feature}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10"
              >

                <span className="text-cyan-400 text-xl">
                  ✓
                </span>

                {feature}

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* Technologies */}

      <section className="max-w-6xl mx-auto px-6 py-24">

        <p className="text-cyan-400 font-mono">
          TECHNOLOGIES
        </p>

        <h2 className="text-4xl font-bold mt-4">
          Teknologi
        </h2>

        <div className="flex flex-wrap gap-4 mt-10">

          {technologies.map((tech) => (

            <span
              key={tech}
              className="px-6 py-3 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400"
            >

              {tech}

            </span>

          ))}

        </div>

      </section>


      {/* Learning */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/20">

          <p className="text-cyan-400 font-mono">
            WHAT I LEARNED
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Pengalaman yang Saya Dapatkan
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mt-6">

            Dari project ini saya belajar mengenai
            autentikasi pengguna, sistem role,
            pengelolaan data siswa, serta bagaimana
            membuat aplikasi yang terhubung dengan
            database MySQL.

          </p>

        </div>

      </section>


      {/* Navigation */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="flex flex-wrap justify-between gap-4">

          <Link
            href="/projects/kasir"
            className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition"
          >

            ← Project Sebelumnya

          </Link>

          <Link
            href="/projects"
            className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-105 transition"
          >

            Semua Project →

          </Link>

        </div>

      </section>

    </main>
  );
}