"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";

const gallery = [
  {
    title: "My Profile",
    category: "About Me",
    image: "/gallery/profile.jpg",
  },
  {
    title: "Coding Journey",
    category: "Development",
    image: "/gallery/coding.jpg",
  },
  {
    title: "My Project",
    category: "Project",
    image: "/gallery/project.jpg",
  },
  {
    title: "School Activity",
    category: "Activity",
    image: "/gallery/activity.jpg",
  },
  {
    title: "Learning Process",
    category: "Learning",
    image: "/gallery/learning.jpg",
  },
  {
    title: "Project Documentation",
    category: "Documentation",
    image: "/gallery/documentation.jpg",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      (selectedImage + 1) % gallery.length
    );
  };

  const previousImage = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      (selectedImage - 1 + gallery.length) % gallery.length
    );
  };

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
            &gt; My Gallery
          </p>

          <h1 className="text-5xl md:text-6xl font-bold">

            Moments &{" "}

            <span className="text-cyan-400">
              Journey
            </span>

          </h1>

          <p className="text-gray-400
          mt-6
          max-w-2xl
          text-lg
          leading-relaxed">

            Beberapa dokumentasi perjalanan saya dalam
            belajar, mengembangkan project, dan menjalani
            aktivitas sebagai siswa RPL.

          </p>

        </motion.div>


        {/* Gallery */}

        <div
          className="grid
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          mt-20"
        >

          {gallery.map((item, index) => (

            <motion.div
              key={item.title}

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
                duration: 0.5,
                delay: index * 0.1,
              }}

              whileHover={{
                y: -10,
              }}

              onClick={() => setSelectedImage(index)}

              className="group
              relative
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-white/5
              cursor-pointer"
            >

              {/* Image */}

              <div className="aspect-[4/5]
              overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-700"
                />

              </div>


              {/* Overlay */}

              <div
                className="absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-black/20
                to-transparent
                opacity-80"
              />


              {/* View Icon */}

              <div
                className="absolute
                top-5
                right-5
                w-10
                h-10
                rounded-full
                bg-black/40
                backdrop-blur-md
                border border-white/20
                flex
                items-center
                justify-center
                opacity-0
                group-hover:opacity-100
                transition"
              >

                🔍

              </div>


              {/* Text */}

              <div
                className="absolute
                bottom-0
                left-0
                right-0
                p-6
                translate-y-2
                group-hover:translate-y-0
                transition"
              >

                <p className="text-cyan-400
                text-sm
                font-mono">

                  {item.category}

                </p>

                <h2 className="text-2xl
                font-bold
                mt-2">

                  {item.title}

                </h2>

              </div>

            </motion.div>

          ))}

        </div>

      </section>


      {/* Quote */}

      <section className="max-w-5xl mx-auto px-6 pb-32">

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

          className="text-center
          p-10
          md:p-16
          rounded-3xl
          bg-white/5
          border border-white/10"
        >

          <p className="text-2xl
          md:text-3xl
          font-semibold
          leading-relaxed">

            "Every project is a step forward
            in my journey to become
            a Software Engineer."

          </p>

          <p className="text-cyan-400
          mt-6
          font-mono">

            — Putra Sigit Nurteja

          </p>

        </motion.div>

      </section>


      {/* LIGHTBOX */}

      <AnimatePresence>

        {selectedImage !== null && (

          <motion.div
            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            className="fixed
            inset-0
            z-50
            bg-black/90
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-6"
          >

            {/* Close */}

            <button
              onClick={() => setSelectedImage(null)}

              className="absolute
              top-6
              right-6
              w-12
              h-12
              rounded-full
              bg-white/10
              border border-white/20
              text-2xl
              hover:bg-white/20
              transition
              z-10"
            >

              ×

            </button>


            {/* Previous */}

            <button
              onClick={previousImage}

              className="absolute
              left-4
              md:left-10
              w-12
              h-12
              rounded-full
              bg-white/10
              border border-white/20
              text-2xl
              hover:bg-cyan-400/20
              transition"
            >

              ←

            </button>


            {/* Image */}

            <motion.div
              key={selectedImage}

              initial={{
                opacity: 0,
                scale: 0.9,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              transition={{
                duration: 0.3,
              }}

              className="max-w-5xl
              max-h-[80vh]
              text-center"
            >

              <img
                src={gallery[selectedImage].image}
                alt={gallery[selectedImage].title}
                className="max-w-full
                max-h-[70vh]
                object-contain
                rounded-2xl
                shadow-2xl"
              />

              <p className="text-cyan-400
              font-mono
              mt-5">

                {gallery[selectedImage].category}

              </p>

              <h2 className="text-2xl
              font-bold
              mt-2">

                {gallery[selectedImage].title}

              </h2>

              <p className="text-gray-400
              mt-2">

                {selectedImage + 1} / {gallery.length}

              </p>

            </motion.div>


            {/* Next */}

            <button
              onClick={nextImage}

              className="absolute
              right-4
              md:right-10
              w-12
              h-12
              rounded-full
              bg-white/10
              border border-white/20
              text-2xl
              hover:bg-cyan-400/20
              transition"
            >

              →

            </button>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
}