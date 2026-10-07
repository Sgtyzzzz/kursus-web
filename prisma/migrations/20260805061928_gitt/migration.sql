-- CreateTable
CREATE TABLE "siswa_pplg" (
    "no_urut" SERIAL NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,

    CONSTRAINT "siswa_pplg_pkey" PRIMARY KEY ("no_urut")
);
