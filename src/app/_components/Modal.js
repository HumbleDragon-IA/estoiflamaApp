// app/_components/Modal.jsx
"use client";
import { useEffect } from "react";

export default function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 ">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 
                   rounded-2xl bg-stone-700 p-6 shadow-2xl min-w-full max-w-dvw "
      >
        {title && (
          <h2 className="mb-4 text-xl font-semibold text-white ">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
