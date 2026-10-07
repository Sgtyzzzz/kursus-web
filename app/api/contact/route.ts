import { NextResponse } from "next/server";
import { getMessages, addMessage } from "@/lib/data-store";

// GET /api/contact - List submitted messages
export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json({
      success: true,
      total: messages.length,
      data: messages,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil pesan", error: String(error) },
      { status: 500 }
    );
  }
}

// POST /api/contact - Submit contact message
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "Nama, email, dan pesan wajib diisi" },
        { status: 422 }
      );
    }

    const saved = addMessage({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pesan Anda telah berhasil diterima oleh Tim CodeDev!",
        data: saved,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengirim pesan", error: String(error) },
      { status: 500 }
    );
  }
}
