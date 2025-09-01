// app/_components/NavBar.jsx
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

function NavBar({ user }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // refs para detectar click afuera
  const btnRef = useRef(null); // botón hamburguesa
  const menuRef = useRef(null); // contenedor del menú mobile

  // Cerrar cuando cambia la ruta (navegaste a un link)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Cerrar con Escape + click/touch fuera (SIN backdrop)
  useEffect(() => {
    if (!open) return;

    const onOutside = (e) => {
      const t = e.target;
      const clickedInsideMenu = menuRef.current?.contains(t);
      const clickedToggle = btnRef.current?.contains(t);
      if (!clickedInsideMenu && !clickedToggle) setOpen(false);
    };

    const onEsc = (e) => e.key === "Escape" && setOpen(false);

    // pointerdown capta click y touch, y se dispara antes
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);
  if (!user) return null;

  return (
    <div className="relative">
      {/* Botón mobile */}
      <button
        ref={btnRef}
        type="button"
        className="md:hidden p-0.5 md:p-1.5  rounded border text-xs border-zinc-300 dark:border-zinc-700 "
        aria-expanded={open ? "true" : "false"}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Abrir menú</span> ☰
      </button>

      {/* Links desktop */}
      <nav className="hidden lg:flex gap-8 items-center">
        <Link className="hover:underline" href="/impresiones">
          Impresiones
        </Link>
        <Link className="hover:underline" href="/modelos">
          Modelos
        </Link>
        <Link className="hover:underline" href="/ventas">
          Ventas
        </Link>
        <Link className="hover:underline" href="/stocks">
          Stocks
        </Link>
        <Link className="hover:underline" href="/compras">
          Compras
        </Link>
        <SignOutButton />
      </nav>

      {/* Menú mobile: ancho completo, tema claro/oscuro */}
      {open && (
        <nav
          ref={menuRef}
          id="mobile-menu"
          className="
            fixed inset-x-0 top-16 z-50    /* ancho viewport y por encima del header */
            border-t border-zinc-200 dark:border-zinc-800
            bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100
            shadow-md
          "
          role="dialog"
          aria-modal="true"
        >
          <div className="px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-3">
            <Link className="py-2 hover:opacity-80" href="/impresiones">
              Impresiones
            </Link>
            <Link className="py-2 hover:opacity-80" href="/modelos">
              Modelos
            </Link>
            <Link className="py-2 hover:opacity-80" href="/ventas">
              Ventas
            </Link>
            <Link className="py-2 hover:opacity-80" href="/stocks">
              Stocks
            </Link>
            <Link className="py-2 hover:opacity-80" href="/compras">
              Compras
            </Link>
            <SignOutButton />
          </div>
        </nav>
      )}
    </div>
  );
}

export default NavBar;
