// public/theme-init.js
(function () {
  try {
    const ls = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldDark = ls ? ls === "dark" : prefersDark;
    const el = document.documentElement; // <html>
    if (shouldDark) el.classList.add("dark");
    else el.classList.remove("dark");
  } catch (_) {}
})();
