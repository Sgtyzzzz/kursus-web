"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Kursus, INITIAL_KURSUSES } from "./data-store";

interface CoursesContextType {
  courses: Kursus[];
  getCourseById: (id: number) => Kursus | undefined;
  addCourse: (course: Omit<Kursus, "id" | "created_at" | "updated_at">) => Promise<Kursus>;
  updateCourse: (id: number, course: Partial<Kursus>) => Promise<Kursus | null>;
  deleteCourse: (id: number) => Promise<boolean>;
  resetCourses: () => void;
  categories: string[];
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Kursus[]>(INITIAL_KURSUSES);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("codedev_courses");
      if (stored) {
        try {
          setCourses(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse stored courses", e);
        }
      }
    }
  }, []);

  const saveCourses = (newCourses: Kursus[]) => {
    setCourses(newCourses);
    if (typeof window !== "undefined") {
      localStorage.setItem("codedev_courses", JSON.stringify(newCourses));
    }
  };

  const getCourseById = (id: number) => {
    return courses.find((c) => c.id === id);
  };

  const addCourse = async (courseData: Omit<Kursus, "id" | "created_at" | "updated_at">) => {
    const newCourse: Kursus = {
      ...courseData,
      id: courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1,
      jumlah_siswa: courseData.jumlah_siswa || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [newCourse, ...courses];
    saveCourses(updated);

    // Also notify API in background
    try {
      fetch("/api/kursus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      }).catch(() => {});
    } catch {}

    return newCourse;
  };

  const updateCourse = async (id: number, partialData: Partial<Kursus>) => {
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updatedCourse: Kursus = {
      ...courses[index],
      ...partialData,
      updated_at: new Date().toISOString(),
    };

    const updatedList = [...courses];
    updatedList[index] = updatedCourse;
    saveCourses(updatedList);

    // Also notify API
    try {
      fetch(`/api/kursus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
      }).catch(() => {});
    } catch {}

    return updatedCourse;
  };

  const deleteCourse = async (id: number) => {
    const updated = courses.filter((c) => c.id !== id);
    saveCourses(updated);

    // Also notify API
    try {
      fetch(`/api/kursus/${id}`, {
        method: "DELETE",
      }).catch(() => {});
    } catch {}

    return true;
  };

  const resetCourses = () => {
    saveCourses(INITIAL_KURSUSES);
  };

  const categories = Array.from(new Set(courses.map((c) => c.kategori)));

  return (
    <CoursesContext.Provider
      value={{
        courses,
        getCourseById,
        addCourse,
        updateCourse,
        deleteCourse,
        resetCourses,
        categories,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }
  return context;
}
