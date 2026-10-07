"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

const features = [
  "Login dan autentikasi pengguna",
  "Pengelolaan data buku",
  "Upload cover buku",
  "Peminjaman buku",
  "Pengelolaan denda",
  "Manajemen data pengguna",
];

const technologies = [
  "PHP Native",
  "MySQL",
  "JavaScript",
  "HTML",
  "CSS",
];

export default function Perpustakaan() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">

      <Navbar />

      {/* Background */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div
          className="absolute top-20 left-10
          w-72 h-72
          bg-cyan-500/20
          rounded-full
          blur-[120px]"
        />

        <div
          className="absolute bottom-20 right-10
          w-72 h-72
          bg-purple-500/20
          rounded-full
          blur-[120px]"
        />

      </div>


      {/* Hero */}

      <section className="max-w-6xl mx-auto px-6 pt-40 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <p className="text-cyan-400 font-mono mb-4">
            &gt; Featured Project
          </p>

          <h1 className="text-5xl md:text-7xl font-bold">

            Website{" "}

            <span className="text-cyan-400">
              Perpustakaan
            </span>

          </h1>

          <p className="text-gray-400
          text-lg
          max-w-3xl
          mt-8
          leading-relaxed">

            Sebuah sistem informasi perpustakaan yang saya
            kembangkan untuk membantu pengelolaan buku,
            pengguna, peminjaman, dan denda secara digital.

          </p>

        </motion.div>


        {/* Main Screenshot */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 0.8,
            delay: 0.2,
          }}

          className="mt-16
          rounded-3xl
          overflow-hidden
          border border-white/10
          shadow-2xl
          shadow-cyan-500/10"
        >

          <img
            src="/projects/perpustakaan.png"
            alt="Website Perpustakaan"
            className="w-full
            object-cover"
          />

        </motion.div>

      </section>


      {/* About Project */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-3 gap-12">


          {/* Description */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
            }}

            className="md:col-span-2"
          >

            <p className="text-cyan-400 font-mono">
              ABOUT PROJECT
            </p>

            <h2 className="text-4xl font-bold mt-4">
              Tentang Project
            </h2>

            <p className="text-gray-400
            mt-6
            leading-relaxed
            text-lg">

              Project ini dibuat sebagai bagian dari proses
              pembelajaran saya dalam mengembangkan aplikasi
              berbasis web.

            </p>

            <p className="text-gray-400
            mt-5
            leading-relaxed
            text-lg">

              Dalam project ini saya mempelajari bagaimana
              membuat sistem yang dapat mengelola data,
              menghubungkan aplikasi dengan database,
              serta menerapkan sistem login dan role pengguna.

            </p>

          </motion.div>


          {/* Project Info */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            viewport={{
              once: true,
            }}

            className="p-6
            rounded-2xl
            bg-white/5
            border border-white/10
            h-fit"
          >

            <p className="text-gray-500">
              Project Type
            </p>

            <p className="font-semibold mt-2">
              Web Application
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

          </motion.div>

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
                  x: index % 2 === 0 ? -30 : 30,
                }}

                whileInView={{
                  opacity: 1,
                  x: 0,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  delay: index * 0.08,
                }}

                className="flex
                items-center
                gap-4
                p-5
                rounded-xl
                bg-white/5
                border border-white/10
                hover:border-cyan-400/30
                transition"
              >

                <span className="text-cyan-400 text-xl">
                  ✓
                </span>

                <span>
                  {feature}
                </span>

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
          Teknologi yang Digunakan
        </h2>


        <div className="flex flex-wrap gap-4 mt-10">

          {technologies.map((tech) => (

            <motion.span
              key={tech}

              whileHover={{
                scale: 1.08,
              }}

              className="px-6 py-3
              rounded-full
              bg-cyan-400/10
              border border-cyan-400/20
              text-cyan-400"
            >

              {tech}

            </motion.span>

          ))}

        </div>

      </section>


      {/* Learning */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          className="p-10
          md:p-14
          rounded-3xl
          bg-gradient-to-br
          from-cyan-400/10
          to-purple-500/10
          border border-cyan-400/20"
        >

          <p className="text-cyan-400 font-mono">
            WHAT I LEARNED
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Pengalaman yang Saya Dapatkan
          </h2>

          <p className="text-gray-400
          text-lg
          leading-relaxed
          max-w-3xl
          mt-6">

            Melalui project ini, saya belajar bagaimana
            merancang struktur database, membuat sistem CRUD,
            menghubungkan aplikasi dengan database MySQL,
            serta memahami proses pengembangan aplikasi
            web dari sisi frontend dan backend.

          </p>

        </motion.div>

      </section>


      {/* Navigation */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="flex
        flex-wrap
        justify-between
        gap-4">

          <Link
            href="/projects"
            className="px-6 py-3
            rounded-xl
            border border-white/10
            hover:bg-white/10
            transition"
          >

            ← Semua Project

          </Link>

          <Link
            href="/projects/kasir"
            className="px-6 py-3
            rounded-xl
            bg-cyan-500
            text-black
            font-semibold
            hover:scale-105
            transition"
          >

            Project Berikutnya →

          </Link>

        </div>

      </section>

    </main>
  );
}