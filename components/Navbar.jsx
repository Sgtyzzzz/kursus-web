"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-5"
    >
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between
        px-6 py-4 rounded-2xl
        bg-white/5 backdrop-blur-lg
        border border-white/10">

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold"
          >
            PUTRA<span className="text-cyan-400">.DEV</span>
          </Link> 


          {/* Menu */}
          <div className="hidden md:flex gap-8 text-sm">

            <Link
              href="/"
              className="hover:text-cyan-400 transition"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="hover:text-cyan-400 transition"
            >
              About
            </Link>

            <Link
              href="/skills"
              className="hover:text-cyan-400 transition"
            >
              Skills
            </Link>

            <Link
              href="/projects"
              className="hover:text-cyan-400 transition"
            >
              Projects
            </Link>

            <Link
              href="/admin"
              className="hover:text-cyan-400 transition"
            >
              Admin
            </Link>

            <Link
              href="/gallery"
              className="hover:text-cyan-400 transition"
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              className="hover:text-cyan-400 transition"
            >
              Contact
            </Link>

            <Link
              href="/login"
              className="px-4 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition font-medium"
            >
              Login
            </Link>

          </div>

        </div>

      </div>
    </motion.nav>
  );
}