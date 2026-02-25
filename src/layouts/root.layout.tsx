import { useEffect, useState, createContext, useContext } from "react"
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router"
import { applyTheme } from "@/hooks/themeHelper"

const ThemeContext = createContext<{ theme: "dark" | "light"; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => { },
})

export const useTheme = () => useContext(ThemeContext)

const RootLayout = () => {

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null
    return saved || "light"
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
        <Outlet />
        <Toaster position="top-right" richColors />
      </div>
    </ThemeContext.Provider>
  )
}

export default RootLayout