import { NextResponse } from "next/server";
import { getKursuses, setKursuses, Kursus } from "@/lib/data-store";

// GET /api/kursus - List all courses with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const kategori = searchParams.get("kategori") || "all";
    const level = searchParams.get("level") || "all";

    let list = getKursuses();

    if (search) {
      list = list.filter(
        (c) =>
          c.judul.toLowerCase().includes(search) ||
          c.kategori.toLowerCase().includes(search) ||
          c.instruktur.toLowerCase().includes(search)
      );
    }

    if (kategori && kategori !== "all") {
      list = list.filter((c) => c.kategori.toLowerCase() === kategori.toLowerCase());
    }

    if (level && level !== "all") {
      list = list.filter((c) => c.level.toLowerCase() === level.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      message: "Data kursus berhasil diambil",
      total: list.length,
      data: list,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data kursus", error: String(error) },
      { status: 500 }
    );
  }
}

// POST /api/kursus - Create new course
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.judul || !body.kategori || !body.level || !body.instruktur) {
      return NextResponse.json(
        {
          success: false,
          message: "Validasi gagal: judul, kategori, level, dan instruktur wajib diisi",
        },
        { status: 422 }
      );
    }

    const currentList = getKursuses();
    const newCourse: Kursus = {
      id: currentList.length > 0 ? Math.max(...currentList.map((c) => c.id)) + 1 : 1,
      judul: body.judul,
      kategori: body.kategori,
      level: body.level,
      harga: Number(body.harga) || 0,
      instruktur: body.instruktur,
      deskripsi: body.deskripsi || "",
      jumlah_siswa: Number(body.jumlah_siswa) || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updatedList = [newCourse, ...currentList];
    setKursuses(updatedList);

    return NextResponse.json(
      {
        success: true,
        message: `Kursus "${newCourse.judul}" berhasil ditambahkan`,
        data: newCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan kursus", error: String(error) },
      { status: 500 }
    );
  }
}
