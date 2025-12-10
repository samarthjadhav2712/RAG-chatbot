"use client"

import { createContext, useState, useContext } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => setIsDark(!isDark)

  const colors = isDark
    ? {
        bg: {
          primary: "from-slate-900 via-slate-800 to-slate-900",
          secondary: "bg-slate-900/50",
          tertiary: "bg-slate-800/50",
        },
        border: "border-slate-700",
        text: { primary: "text-slate-100", secondary: "text-slate-400" },
        accent: "from-blue-500 to-cyan-500",
      }
    : {
        bg: { primary: "from-white via-slate-50 to-slate-100", secondary: "bg-white", tertiary: "bg-slate-100/50" },
        border: "border-slate-200",
        text: { primary: "text-slate-900", secondary: "text-slate-600" },
        accent: "from-blue-600 to-cyan-600",
      }

  return <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
