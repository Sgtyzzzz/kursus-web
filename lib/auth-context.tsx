"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, INITIAL_USERS } from "./data-store";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  login: (email: string, role?: "admin" | "user", name?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  users: User[];
  refreshUsers: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load persisted auth and users
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("codedev_auth_user");
      const storedUsers = localStorage.getItem("codedev_all_users");

      if (storedUsers) {
        try {
          setUsers(JSON.parse(storedUsers));
        } catch (e) {
          console.error("Failed to parse stored users", e);
        }
      }

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user", e);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  const login = async (email: string, defaultRole?: "admin" | "user", customName?: string) => {
    // Search in current users list
    let existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!existingUser) {
      // If user logs in with admin keywords or email
      const isPutraOrAdmin = email.toLowerCase().includes("putra") || email.toLowerCase().includes("admin");
      existingUser = {
        id: users.length + 1,
        name: customName || (isPutraOrAdmin ? "Putra Admin" : "Pengguna CodeDev"),
        email: email,
        role: defaultRole || (isPutraOrAdmin ? "admin" : "user"),
        created_at: new Date().toISOString(),
      };
      const updatedList = [...users, existingUser];
      setUsers(updatedList);
      if (typeof window !== "undefined") {
        localStorage.setItem("codedev_all_users", JSON.stringify(updatedList));
      }
    }

    setUser(existingUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("codedev_auth_user", JSON.stringify(existingUser));
    }

    return { success: true };
  };

  const register = async (name: string, email: string) => {
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false, message: "Email ini sudah terdaftar. Silakan login." };
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      role: email.toLowerCase().includes("admin") ? "admin" : "user",
      created_at: new Date().toISOString(),
    };

    const updatedList = [...users, newUser];
    setUsers(updatedList);
    setUser(newUser);

    if (typeof window !== "undefined") {
      localStorage.setItem("codedev_all_users", JSON.stringify(updatedList));
      localStorage.setItem("codedev_auth_user", JSON.stringify(newUser));
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("codedev_auth_user");
    }
  };

  const refreshUsers = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("codedev_all_users");
      if (stored) {
        try {
          setUsers(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isUser: user?.role === "user",
        login,
        register,
        logout,
        users,
        refreshUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
