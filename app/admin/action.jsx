'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahSiswa(formDataOrData) {
    let nama_lengkap = "";
    let jenis_kelamin = "laki laki";

    if (formDataOrData instanceof FormData || (formDataOrData && typeof formDataOrData.get === "function")) {
        nama_lengkap = formDataOrData.get("nama_lengkap") || formDataOrData.get("nama") || "";
        jenis_kelamin = formDataOrData.get("jenis_kelamin") || formDataOrData.get("kelas") || "laki laki";
    } else if (formDataOrData && typeof formDataOrData === "object") {
        nama_lengkap = formDataOrData.nama_lengkap || formDataOrData.nama || "";
        jenis_kelamin = formDataOrData.jenis_kelamin || formDataOrData.kelas || "laki laki";
    }

    if (!nama_lengkap || !String(nama_lengkap).trim()) {
        throw new Error("Nama lengkap wajib diisi.");
    }

    const created = await prisma.pm_siswa.create({
        data: {
            nama_lengkap: String(nama_lengkap).trim(),
            jenis_kelamin: String(jenis_kelamin),
        },
    });

    revalidatePath("/admin");
    revalidatePath("/admin", "page");
    return created;
}

export async function updateSiswa(formData) {
    const no_urut = Number(formData.get("no_urut"));
    const nama_lengkap = formData.get("nama_lengkap");
    const jenis_kelamin = formData.get("jenis_kelamin");
    
    await prisma.pm_siswa.update({
        where: { no_urut },
        data: {
            nama_lengkap, // Sesuaikan dengan schema database
            jenis_kelamin,
        },
    });

    revalidatePath("/admin");
    redirect("/admin");
}

export async function hapusSiswa(no_urut) {
    await prisma.pm_siswa.delete({
        where: { no_urut: Number(no_urut) },
    });
    revalidatePath("/admin");
}

export async function deleteSiswa(no_urut) {
    return hapusSiswa(no_urut);
}