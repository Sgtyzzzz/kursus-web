import { NextResponse } from "next/server";
import { getKursuses, getUsers } from "@/lib/data-store";

// GET /api/stats - Get dashboard statistics
export async function GET() {
  try {
    const kursuses = getKursuses();
    const users = getUsers();

    const totalCourses = kursuses.length;
    const totalStudents = kursuses.reduce((acc, c) => acc + (c.jumlah_siswa || 0), 0);
    const totalUsers = users.length;
    const totalAdmins = users.filter((u) => u.role === "admin").length;
    const totalRegularUsers = users.filter((u) => u.role === "user").length;
    const categories = Array.from(new Set(kursuses.map((c) => c.kategori)));

    return NextResponse.json({
      success: true,
      data: {
        totalCourses,
        totalStudents,
        totalUsers,
        totalAdmins,
        totalRegularUsers,
        categories,
        serverTime: new Date().toISOString(),
        framework: "Next.js 16 (App Router)",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil statistik", error: String(error) },
      { status: 500 }
    );
  }
}
