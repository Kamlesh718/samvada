import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("isDark");
    if (stored === "true") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = theme === "dark";
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("isDark", newTheme === "dark" ? "true" : "false");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-white mb-4 rounded bg-primary"
    >
      {theme === "dark" ? (
        <Moon className="cursor-pointer h-5 w-5" />
      ) : (
        <Sun className="cursor-pointer h-5 w-5" />
      )}
    </button>
  );
}

export default ThemeToggle;
