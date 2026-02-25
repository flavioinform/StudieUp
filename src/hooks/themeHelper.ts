
export const applyTheme = (theme: "dark" | "light") => {
  const root = document.documentElement

  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }

  localStorage.setItem("theme", theme)
}