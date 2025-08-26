// app/_components/ThemeToggle.jsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState("system"); // 'light' | 'dark' | 'system'
  const [isDark, setIsDark] = useState(false);

  // inicializa desde DOM (ya configurado por /theme-init.js) y localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme");
      const nextMode = saved === "light" || saved === "dark" ? saved : "system";
      setMode(nextMode);

      const currentDark = document.documentElement.classList.contains("dark");
      setIsDark(currentDark);

      // si estás en "system", escuchá cambios del sistema
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => {
        if (nextMode === "system") {
          document.documentElement.classList.toggle("dark", mq.matches);
          setIsDark(mq.matches);
        }
      };
      mq.addEventListener?.("change", onChange);
      return () => mq.removeEventListener?.("change", onChange);
    } catch {}
  }, []);

  function applyTheme(next) {
    setMode(next);
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else if (next === "light") {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      // system
      localStorage.removeItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.toggle("dark", prefersDark);
      setIsDark(prefersDark);
    }
  }

  // Mientras no montó, devolvé un botón “fantasma” para que SSR y CSR coincidan
  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden
        className="p-2 rounded-lg border border-border opacity-0 pointer-events-none"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-lg border border-border hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-foreground]"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      {isDark ? (
        // ☀️ Sol
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 6.93-1.41-1.41M6.34 6.34 4.93 4.93m12.73 0-1.41 1.41M6.34 17.66l-1.41 1.41" />
        </svg>
      ) : (
        // 🌙 Luna
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
