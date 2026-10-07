import { NextResponse } from "next/server";
import { getUsers, setUsers, User } from "@/lib/data-store";

// GET /api/users - List all users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const role = searchParams.get("role") || "all";

    let list = getUsers();

    if (search) {
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
      );
    }

    if (role && role !== "all") {
      list = list.filter((u) => u.role === role);
    }

    // Sanitize passwords
    const sanitized = list.map(({ password, ...rest }) => rest);

    return NextResponse.json({
      success: true,
      total: sanitized.length,
      data: sanitized,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data user", error: String(error) },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: "Nama dan email wajib diisi" },
        { status: 422 }
      );
    }

    const currentList = getUsers();
    if (currentList.some((u) => u.email.toLowerCase() === body.email.toLowerCase())) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: currentList.length + 1,
      name: body.name,
      email: body.email,
      role: body.role === "admin" ? "admin" : "user",
      created_at: new Date().toISOString(),
    };

    setUsers([...currentList, newUser]);

    return NextResponse.json(
      {
        success: true,
        message: `Pengguna "${newUser.name}" berhasil dibuat`,
        data: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal membuat user", error: String(error) },
      { status: 500 }
    );
  }
}
