import { NextRequest,NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET() {
    try {
        const dataSiswa = await prisma.pm_siswa.findMany();
        return NextResponse.json(dataSiswa);
    } catch (error: any) {
        console.error("GET /api/siswa error:", error);
        return NextResponse.json(
            { error: error?.message || "Gagal mengambil data siswa" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const nama = body.nama_lengkap || body.nama_siswa;
        const jenisKelamin = body.jenis_kelamin;

        if (!nama || !jenisKelamin) {
            return NextResponse.json(
                { error: "Field 'nama_lengkap' (atau 'nama_siswa') dan 'jenis_kelamin' wajib diisi!" },
                { status: 400 }
            );
        }

        const siswaBaru = await prisma.pm_siswa.create({
            data: {
                nama_lengkap: nama,
                jenis_kelamin: jenisKelamin,
            },
        });

        return NextResponse.json(siswaBaru, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/siswa error:", error);
        return NextResponse.json(
            { error: error?.message || "Gagal menyimpan data siswa" },
            { status: 500 }
        );
    }
}