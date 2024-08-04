"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="cursor-pointer">
      {theme === "light" ? (
        <Moon onClick={() => setTheme("dark")} />
      ) : (
        <Sun onClick={() => setTheme("light")} />
      )}
    </div>
  );
}
