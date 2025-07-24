"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../../utils/axios";
import { useRouter } from "next/navigation";

interface User {
  exp: number;
  user_id?: string; // Add user_id to access it easily
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: userRegistrationData) => Promise<void>;
}
interface userRegistrationData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  gender?: string;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();


  useEffect(() => {
    const initAuth = () => {
      const token = Cookies.get("access_token");

      if (token) {
        try {
          const decodedUser: User = jwtDecode(token);
          setUser(decodedUser);
          console.log("User authenticated from token:", decodedUser);
        } catch (error) {
          console.error("Invalid token, logging out.");
          logout();
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/api/user/login/", { email, password });

      Cookies.set("access_token", data.access, { expires: 1, secure: true, sameSite: "Strict" });
      Cookies.set("refresh_token", data.refresh, { expires: 7, secure: true, sameSite: "Strict" });

      const decodedUser: User = jwtDecode(data.access);
      setUser(decodedUser);
      console.log("User logged in:", decodedUser);
      
      // Redirect based on user role
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Keep throwing the error for the login page to handle
    }
  };
  
  const register = async (data: userRegistrationData) => {
    try {
      const response = await api.post("/api/user/register/", {
        ...data,
      });
      
      console.log("Teacher registration successful:", response.data);
      
      // Auto login after registration so the dynamic redirection can happen
      if (response.data && response.data.access && response.data.refresh) {
        Cookies.set("access_token", response.data.access, { expires: 1, secure: true, sameSite: "Strict" });
        Cookies.set("refresh_token", response.data.refresh, { expires: 7, secure: true, sameSite: "Strict" });

        const decodedUser: User = jwtDecode(response.data.access);
        setUser(decodedUser);
        
        // Redirect new teacher to create room page
        router.push("/dashboard/teacher/rooms/create");
      } else {
        // If auto-login isn't implemented on the API, redirect to login
        router.push("/login");
      }
      
      return response.data;
    } catch (error) {
      console.error("Teacher registration failed:", error);
      throw error; // Keep throwing the error for the registration page to handle
    }
  }; // Added this missing closing brace

  const logout = async () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};