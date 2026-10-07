"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const projects = [
  {
    title: "Website Perpustakaan",
    slug: "perpustakaan",
    description:
      "Website untuk membantu mengelola data buku, peminjaman, pengguna, dan aktivitas perpustakaan.",
    tech: ["PHP", "MySQL", "JavaScript"],
    image: "/projects/perpustakaan.png",
    icon: "📚",
  },
  {
    title: "Website Kasir Grosir",
    slug: "kasir",
    description:
      "Sistem kasir untuk mengelola produk, kategori, pengguna, dan transaksi penjualan.",
    tech: ["PHP", "MySQL", "JavaScript"],
    image: "/projects/kasir.png",
    icon: "💰",
  },
  {
    title: "Website SPP",
    slug: "spp",
    description:
      "Sistem informasi pembayaran SPP untuk membantu pengelolaan data siswa dan tagihan.",
    tech: ["PHP", "MySQL"],
    image: "/projects/spp.png",
    icon: "🏫",
  },
  {
    title: "CodeJourney",
    slug: "codejourney",
    description:
      "Konsep aplikasi pembelajaran pemrograman berbasis Android untuk membantu siswa belajar coding.",
    tech: ["Kotlin", "Android Studio"],
    image: "/projects/codejourney.png",
    icon: "📱",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">

      <Navbar />

      {/* Background Glow */}

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


      {/* Header */}

      <section className="max-w-6xl mx-auto px-6 pt-40 pb-20">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <p className="text-cyan-400 font-mono mb-4">
            &gt; My Projects
          </p>

          <h1 className="text-5xl md:text-6xl font-bold">

            Things I've{" "}

            <span className="text-cyan-400">
              Built
            </span>

          </h1>

          <p className="text-gray-400
          mt-6
          max-w-2xl
          text-lg
          leading-relaxed">

            Beberapa project yang pernah saya kerjakan
            selama belajar pemrograman dan Software Engineering.

          </p>

        </motion.div>


        {/* Project Grid */}

        <div className="grid md:grid-cols-2 gap-8 mt-20">

          {projects.map((project, index) => (

            <motion.div
              key={project.slug}

              initial={{
                opacity: 0,
                y: 50,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}

              whileHover={{
                y: -10,
              }}

              className="group
              overflow-hidden
              rounded-3xl
              bg-white/5
              border border-white/10
              hover:border-cyan-400/40
              transition-all"
            >

              {/* Image */}

              <div className="relative
              h-64
              overflow-hidden
              bg-slate-900">

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-700"
                />


                {/* Overlay */}

                <div className="absolute
                inset-0
                bg-gradient-to-t
                from-black/80
                via-transparent
                to-transparent"
                />

              </div>


              {/* Content */}

              <div className="p-8">

                <div className="flex
                items-center
                gap-3">

                  <span className="text-3xl">
                    {project.icon}
                  </span>

                  <h2 className="text-2xl
                  font-bold">

                    {project.title}

                  </h2>

                </div>


                <p className="text-gray-400
                mt-5
                leading-relaxed">

                  {project.description}

                </p>


                {/* Technologies */}

                <div className="flex
                flex-wrap
                gap-2
                mt-6">

                  {project.tech.map((tech) => (

                    <span
                      key={tech}
                      className="px-3
                      py-1
                      rounded-full
                      text-xs
                      text-cyan-400
                      bg-cyan-400/10
                      border border-cyan-400/20"
                    >

                      {tech}

                    </span>

                  ))}

                </div>


                {/* Button */}

                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex
                  items-center
                  gap-2
                  mt-8
                  text-cyan-400
                  hover:text-cyan-300
                  transition"
                >

                  View Project

                  <span className="group-hover:translate-x-2 transition">
                    →
                  </span>

                </Link>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

    </main>
  );
}