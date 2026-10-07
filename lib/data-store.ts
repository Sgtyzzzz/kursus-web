export interface Kursus {
  id: number;
  judul: string;
  kategori: string;
  level: "Pemula" | "Menengah" | "Mahir" | string;
  harga: number;
  instruktur: string;
  deskripsi: string;
  jumlah_siswa: number;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Initial seed data matching CodeDev Laravel project
export const INITIAL_KURSUSES: Kursus[] = [
  {
    id: 1,
    judul: "Fullstack Web Development with Laravel & Next.js",
    kategori: "Fullstack",
    level: "Menengah",
    harga: 350000,
    instruktur: "Sigit - CodeDev Team",
    deskripsi: "Kuasai pembuatan aplikasi web skala industri dari perancangan REST API modern hingga performa rendering Next.js App Router yang cepat.",
    jumlah_siswa: 128,
    created_at: "2026-08-15T09:00:00Z",
    updated_at: "2026-08-15T09:00:00Z",
  },
  {
    id: 2,
    judul: "Modern Frontend Mastery with React & Tailwind CSS",
    kategori: "Frontend",
    level: "Pemula",
    harga: 0,
    instruktur: "Putra Sigit",
    deskripsi: "Panduan lengkap fundamental React, hooks, komponen dinamis, manajemen state, serta implementasi UI modern yang memukau.",
    jumlah_siswa: 240,
    created_at: "2026-08-20T10:30:00Z",
    updated_at: "2026-08-20T10:30:00Z",
  },
  {
    id: 3,
    judul: "Backend API Engineering with Node.js & PostgreSQL",
    kategori: "Backend",
    level: "Menengah",
    harga: 275000,
    instruktur: "gitzxy team",
    deskripsi: "Belajar merancang arsitektur backend, autentikasi aman, validasi schema, query database performa tinggi, dan Prisma ORM.",
    jumlah_siswa: 94,
    created_at: "2026-08-25T14:15:00Z",
    updated_at: "2026-08-25T14:15:00Z",
  },
  {
    id: 4,
    judul: "Python for Artificial Intelligence & Data Science",
    kategori: "AI & Data",
    level: "Mahir",
    harga: 450000,
    instruktur: "Sigit Pratama",
    deskripsi: "Eksplorasi machine learning, deep learning, integrasi model Large Language Models (LLM), dan data visualization terkini.",
    jumlah_siswa: 85,
    created_at: "2026-09-01T08:00:00Z",
    updated_at: "2026-09-01T08:00:00Z",
  },
  {
    id: 5,
    judul: "DevOps & Cloud Infrastructure Automation",
    kategori: "DevOps",
    level: "Mahir",
    harga: 390000,
    instruktur: "gitzxy DevOps",
    deskripsi: "Otomatisasi deployment dengan CI/CD GitHub Actions, containerization Docker, orchestrasi Kubernetes, dan manajemen Cloud Server.",
    jumlah_siswa: 62,
    created_at: "2026-09-10T11:45:00Z",
    updated_at: "2026-09-10T11:45:00Z",
  },
  {
    id: 6,
    judul: "Cross-Platform Mobile Apps with Flutter & Dart",
    kategori: "Mobile",
    level: "Pemula",
    harga: 0,
    instruktur: "Putra Sigit",
    deskripsi: "Membangun aplikasi mobile iOS & Android dari nol dengan desain elegan, animasi halus, dan integrasi backend real-time.",
    jumlah_siswa: 180,
    created_at: "2026-09-18T13:20:00Z",
    updated_at: "2026-09-18T13:20:00Z",
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: "Putra Admin",
    email: "putra@gmail.com",
    password: "password123",
    role: "admin",
    created_at: "2026-08-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Budi User",
    email: "budi@gmail.com",
    password: "password123",
    role: "user",
    created_at: "2026-08-10T15:30:00Z",
  },
  {
    id: 3,
    name: "Sigit Pratama",
    email: "sigit@codedev.id",
    password: "password123",
    role: "admin",
    created_at: "2026-08-12T12:00:00Z",
  },
];

// Global in-memory storage for Server Side / API runtime
declare global {
  var __codedev_kursuses: Kursus[] | undefined;
  var __codedev_users: User[] | undefined;
  var __codedev_messages: ContactMessage[] | undefined;
}

if (!globalThis.__codedev_kursuses) {
  globalThis.__codedev_kursuses = [...INITIAL_KURSUSES];
}
if (!globalThis.__codedev_users) {
  globalThis.__codedev_users = [...INITIAL_USERS];
}
if (!globalThis.__codedev_messages) {
  globalThis.__codedev_messages = [];
}

export function getKursuses(): Kursus[] {
  return globalThis.__codedev_kursuses || INITIAL_KURSUSES;
}

export function setKursuses(kursuses: Kursus[]) {
  globalThis.__codedev_kursuses = kursuses;
}

export function getUsers(): User[] {
  return globalThis.__codedev_users || INITIAL_USERS;
}

export function setUsers(users: User[]) {
  globalThis.__codedev_users = users;
}

export function getMessages(): ContactMessage[] {
  return globalThis.__codedev_messages || [];
}

export function addMessage(msg: Omit<ContactMessage, "id" | "created_at">): ContactMessage {
  const newMsg: ContactMessage = {
    ...msg,
    id: (globalThis.__codedev_messages?.length || 0) + 1,
    created_at: new Date().toISOString(),
  };
  globalThis.__codedev_messages = [...(globalThis.__codedev_messages || []), newMsg];
  return newMsg;
}
