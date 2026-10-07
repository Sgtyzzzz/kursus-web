"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

const features = [
  "Sistem Login dan Register",
  "Kursus pemrograman untuk pemula",
  "Materi pembelajaran coding",
  "Lab coding interaktif",
  "Progress belajar pengguna",
  "Dikembangkan untuk pelajar",
];

const technologies = [
  "Kotlin",
  "Jetpack Compose",
  "Android Studio",
];

export default function CodeJourney() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">

      <Navbar />

      {/* Background */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute
          top-20
          left-10
          w-72
          h-72
          bg-cyan-500/20
          rounded-full
          blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="absolute
          bottom-20
          right-10
          w-72
          h-72
          bg-purple-500/20
          rounded-full
          blur-[120px]"
        />

      </div>


      {/* Hero */}

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

          <div className="flex
          flex-wrap
          items-center
          gap-3
          mb-6">

            <p className="text-cyan-400 font-mono">
              &gt; Mobile Project
            </p>

            <span className="px-3
            py-1
            rounded-full
            bg-yellow-400/10
            border border-yellow-400/20
            text-yellow-400
            text-sm">

              🚧 Currently Building

            </span>

          </div>


          <h1 className="text-5xl
          md:text-7xl
          font-bold">

            Code
            <span className="text-cyan-400">
              Journey
            </span>

          </h1>


          <p className="text-gray-400
          text-lg
          max-w-3xl
          mt-8
          leading-relaxed">

            CodeJourney adalah konsep aplikasi Android
            untuk membantu pelajar mempelajari pemrograman
            secara bertahap melalui kursus, materi,
            dan latihan coding interaktif.

          </p>

        </motion.div>


        {/* App Preview */}

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
          bg-white/5
          p-6
          md:p-10"
        >

          <div className="grid
          md:grid-cols-3
          gap-6
          items-center">

            <div className="md:col-span-2">

              <p className="text-cyan-400 font-mono">
                APP PREVIEW
              </p>

              <h2 className="text-3xl
              font-bold
              mt-4">

                Learning to Code,
                <br />
                One Step at a Time.

              </h2>

              <p className="text-gray-400
              mt-5
              leading-relaxed">

                CodeJourney dirancang sebagai platform
                pembelajaran yang membantu pengguna
                memahami pemrograman dari dasar hingga
                tahap pengembangan aplikasi.

              </p>

            </div>


            {/* Phone Preview */}

            <div className="flex
            justify-center">

              <div className="w-48
              h-96
              rounded-[2rem]
              border-4
              border-gray-700
              bg-[#0a1025]
              overflow-hidden
              shadow-2xl
              shadow-cyan-500/20">

                <div className="p-5">

                  <p className="text-xs
                  text-gray-500">

                    CODEJOURNEY

                  </p>

                  <h3 className="text-lg
                  font-bold
                  mt-6">

                    Learn Coding

                  </h3>

                  <div className="mt-6
                  space-y-3">

                    <div className="h-16
                    rounded-xl
                    bg-cyan-400/10
                    border border-cyan-400/20"
                    />

                    <div className="h-16
                    rounded-xl
                    bg-purple-400/10
                    border border-purple-400/20"
                    />

                    <div className="h-16
                    rounded-xl
                    bg-white/5
                    border border-white/10"
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </section>


      {/* About */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid
        md:grid-cols-3
        gap-12">

          <div className="md:col-span-2">

            <p className="text-cyan-400 font-mono">
              ABOUT PROJECT
            </p>

            <h2 className="text-4xl
            font-bold
            mt-4">

              Tentang CodeJourney

            </h2>

            <p className="text-gray-400
            mt-6
            text-lg
            leading-relaxed">

              CodeJourney merupakan project aplikasi
              Android yang saya kembangkan sebagai
              eksplorasi dalam mobile development.

            </p>

            <p className="text-gray-400
            mt-5
            text-lg
            leading-relaxed">

              Ide utama dari aplikasi ini adalah membuat
              pengalaman belajar pemrograman yang lebih
              mudah dipahami oleh pelajar yang baru mulai
              mengenal dunia coding.

            </p>

          </div>


          {/* Status */}

          <div className="p-6
          rounded-2xl
          bg-white/5
          border border-white/10
          h-fit">

            <p className="text-gray-500">
              Project Type
            </p>

            <p className="font-semibold mt-2">
              Android Application
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

            <p className="text-yellow-400
            font-semibold
            mt-2">

              Currently Building

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

          <h2 className="text-4xl
          font-bold
          mt-4">

            Fitur yang Direncanakan

          </h2>


          <div className="grid
          md:grid-cols-2
          gap-4
          mt-12">

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

                className="flex
                items-center
                gap-4
                p-5
                rounded-xl
                bg-white/5
                border border-white/10"
              >

                <span className="text-cyan-400
                text-xl">

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

        <h2 className="text-4xl
        font-bold
        mt-4">

          Teknologi yang Digunakan

        </h2>


        <div className="flex
        flex-wrap
        gap-4
        mt-10">

          {technologies.map((tech) => (

            <span
              key={tech}

              className="px-6
              py-3
              rounded-full
              bg-cyan-400/10
              border border-cyan-400/20
              text-cyan-400"
            >

              {tech}

            </span>

          ))}

        </div>

      </section>


      {/* Learning */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="p-10
        md:p-14
        rounded-3xl
        bg-gradient-to-br
        from-cyan-400/10
        to-purple-500/10
        border border-cyan-400/20">

          <p className="text-cyan-400 font-mono">
            MY JOURNEY
          </p>

          <h2 className="text-4xl
          font-bold
          mt-4">

            Why I Built This

          </h2>

          <p className="text-gray-400
          text-lg
          leading-relaxed
          max-w-3xl
          mt-6">

            Saya membuat CodeJourney karena saya ingin
            mengeksplorasi pengembangan aplikasi Android
            sekaligus membuat sebuah platform yang dapat
            membantu pelajar lain memulai perjalanan mereka
            dalam dunia pemrograman.

          </p>

        </div>

      </section>


      {/* Navigation */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="flex
        flex-wrap
        justify-between
        gap-4">

          <Link
            href="/projects"
            className="px-6
            py-3
            rounded-xl
            border border-white/10
            hover:bg-white/10
            transition"
          >

            ← Semua Project

          </Link>

          <Link
            href="/gallery"
            className="px-6
            py-3
            rounded-xl
            bg-cyan-500
            text-black
            font-semibold
            hover:scale-105
            transition"
          >

            Lihat Dokumentasi →

          </Link>

        </div>

      </section>

    </main>
  );
}