"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AdminContextType {
  isLoggedIn: boolean
  login: (email: string, pass: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const login = (email: string, pass: string) => {
    // Demo credentials
    if (email === "admin@artisan.com" && pass === "admin123") {
      setIsLoggedIn(true)
      localStorage.setItem("admin_auth", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("admin_auth")
    router.push("/admin/login")
  }

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
