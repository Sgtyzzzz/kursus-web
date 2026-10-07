"use client";

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";

const categories = [
  {
    title: "Programming",
    icon: "💻",
    description:
      "Bahasa pemrograman yang saya pelajari untuk memahami logika dan membangun aplikasi.",
    skills: [
      {
        name: "JavaScript",
        status: "Used in Projects",
      },
      {
        name: "PHP",
        status: "Used in Projects",
      },
      {
        name: "C++",
        status: "Currently Learning",
      },
    ],
  },

  {
    title: "Backend Development",
    icon: "⚙️",
    description:
      "Bidang yang paling saya minati, terutama dalam membangun sistem dan mengelola data.",
    skills: [
      {
        name: "Laravel",
        status: "Currently Learning",
      },
      {
        name: "Node.js",
        status: "Currently Learning",
      },
      {
        name: "MySQL",
        status: "Used in Projects",
      },
    ],
  },

  {
    title: "Mobile Development",
    icon: "📱",
    description:
      "Mempelajari pengembangan aplikasi mobile dan eksplorasi teknologi Android.",
    skills: [
      {
        name: "Kotlin",
        status: "Currently Learning",
      },
      {
        name: "Android Studio",
        status: "Used in Projects",
      },
    ],
  },

  {
    title: "Tools",
    icon: "🛠️",
    description:
      "Tools yang saya gunakan untuk membantu proses pengembangan software.",
    skills: [
      {
        name: "Git",
        status: "Used in Projects",
      },
      {
        name: "GitHub",
        status: "Used in Projects",
      },
      {
        name: "VS Code",
        status: "Daily Tool",
      },
    ],
  },
];

export default function Skills() {
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
            &gt; My Skills
          </p>

          <h1 className="text-5xl md:text-6xl font-bold">

            Skills &{" "}

            <span className="text-cyan-400">
              Expertise
            </span>

          </h1>

          <p className="text-gray-400
          mt-6
          max-w-2xl
          text-lg
          leading-relaxed">

            Saya terus mengembangkan kemampuan saya
            dalam berbagai bidang teknologi. Saat ini,
            saya memiliki ketertarikan terbesar pada
            Software Engineering dan Backend Development.

          </p>

        </motion.div>


        {/* Categories */}

        <div className="grid md:grid-cols-2 gap-8 mt-20">

          {categories.map((category, index) => (

            <motion.div
              key={category.title}

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
                y: -8,
              }}

              className="group
              p-8
              rounded-3xl
              bg-white/5
              border border-white/10
              backdrop-blur-lg
              hover:border-cyan-400/40
              transition-all
              duration-300"
            >

              {/* Category Header */}

              <div className="flex items-center gap-5">

                <div className="text-5xl
                group-hover:scale-110
                transition">

                  {category.icon}

                </div>

                <div>

                  <h2 className="text-2xl font-bold">

                    {category.title}

                  </h2>

                </div>

              </div>


              {/* Description */}

              <p className="text-gray-400
              mt-6
              leading-relaxed">

                {category.description}

              </p>


              {/* Skills */}

              <div className="mt-8 space-y-4">

                {category.skills.map((skill) => (

                  <div
                    key={skill.name}
                    className="flex
                    items-center
                    justify-between
                    p-4
                    rounded-xl
                    bg-black/20
                    border border-white/5
                    hover:border-cyan-400/30
                    transition"
                  >

                    <span className="font-semibold">

                      {skill.name}

                    </span>

                    <span className="text-xs
                    text-cyan-400
                    font-mono">

                      {skill.status}

                    </span>

                  </div>

                ))}

              </div>


              {/* Bottom Line */}

              <div
                className="mt-8
                h-[2px]
                w-0
                bg-gradient-to-r
                from-cyan-400
                to-purple-500
                group-hover:w-full
                transition-all
                duration-700"
              />

            </motion.div>

          ))}

        </div>

      </section>


      {/* Main Expertise */}

      <section className="max-w-6xl mx-auto px-6 pb-32">

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.95,
          }}

          whileInView={{
            opacity: 1,
            scale: 1,
          }}

          viewport={{
            once: true,
          }}

          className="relative
          overflow-hidden
          p-10 md:p-16
          rounded-3xl
          border border-cyan-400/20
          bg-gradient-to-br
          from-cyan-400/10
          to-purple-500/10"
        >

          {/* Glow */}

          <div
            className="absolute
            -top-20
            -right-20
            w-72
            h-72
            bg-cyan-400/10
            rounded-full
            blur-3xl"
          />


          <div className="relative">

            <p className="text-cyan-400
            font-mono">

              CURRENT FOCUS

            </p>


            <h2 className="text-4xl
            md:text-5xl
            font-bold
            mt-4">

              Backend Development

            </h2>


            <p className="text-gray-400
            max-w-2xl
            mt-6
            text-lg
            leading-relaxed">

              Saya tertarik mempelajari bagaimana sebuah
              aplikasi bekerja di balik layar, mulai dari
              pengolahan data, database, API, hingga
              bagaimana sistem dapat berkomunikasi
              dengan frontend.

            </p>


            <div className="flex
            flex-wrap
            gap-3
            mt-8">

              <span className="px-4 py-2
              rounded-full
              bg-cyan-400/10
              border border-cyan-400/20
              text-cyan-400">

                Backend

              </span>

              <span className="px-4 py-2
              rounded-full
              bg-cyan-400/10
              border border-cyan-400/20
              text-cyan-400">

                Database

              </span>

              <span className="px-4 py-2
              rounded-full
              bg-cyan-400/10
              border border-cyan-400/20
              text-cyan-400">

                API

              </span>

              <span className="px-4 py-2
              rounded-full
              bg-cyan-400/10
              border border-cyan-400/20
              text-cyan-400">

                Software Engineering

              </span>

            </div>

          </div>

        </motion.div>

      </section>

    </main>
  );
}