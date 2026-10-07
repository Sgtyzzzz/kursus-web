import { NextResponse } from "next/server";
import { getKursuses, setKursuses } from "@/lib/data-store";

// GET /api/kursus/[id] - Get single course
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const courseId = Number(id);
    const list = getKursuses();
    const course = list.find((c) => c.id === courseId);

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Kursus tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", error: String(error) },
      { status: 500 }
    );
  }
}

// PUT /api/kursus/[id] - Update course
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const courseId = Number(id);
    const body = await request.json();
    const list = getKursuses();
    const index = list.findIndex((c) => c.id === courseId);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Kursus tidak ditemukan untuk diupdate" },
        { status: 404 }
      );
    }

    const updated = {
      ...list[index],
      ...body,
      id: courseId, // preserve ID
      updated_at: new Date().toISOString(),
    };

    list[index] = updated;
    setKursuses([...list]);

    return NextResponse.json({
      success: true,
      message: `Data kursus "${updated.judul}" berhasil diperbarui`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui kursus", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/kursus/[id] - Delete course
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const courseId = Number(id);
    const list = getKursuses();
    const course = list.find((c) => c.id === courseId);

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Kursus tidak ditemukan untuk dihapus" },
        { status: 404 }
      );
    }

    const filtered = list.filter((c) => c.id !== courseId);
    setKursuses(filtered);

    return NextResponse.json({
      success: true,
      message: `Kursus "${course.judul}" telah berhasil dihapus`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus kursus", error: String(error) },
      { status: 500 }
    );
  }
}
