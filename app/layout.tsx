import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CoursesProvider } from "@/lib/courses-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CODE DEV - Platform Belajar Coding Modern",
  description: "Sarana belajar interaktif untuk para pelajar, mahasiswa, dan developer bersama CodeDev & gitzxy team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body style={{ padding: "20px 40px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <AuthProvider>
          <CoursesProvider>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </CoursesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
