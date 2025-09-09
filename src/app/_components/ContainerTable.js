"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ActionButton from "./ActionButton";
import { useState } from "react";

function ContainerTable({ children, section }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(section);
  function handleClick(option) {
    const params = new URLSearchParams(searchParams.toString());
    setSelected((s) => (s = params));
    params.set("view", option);
    router.replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div>
      {section === "ventas" && (
        <div className="flex gap-4 mx-0.5 py-2 border-2 w-sm justify-between">
          <ActionButton onClick={() => handleClick("Ventas")}>
            Ventas
          </ActionButton>
          <ActionButton onClick={() => handleClick("Impresiones")}>
            Impresiones
          </ActionButton>
          <ActionButton onClick={() => handleClick("Modelos")}>
            Modelos
          </ActionButton>
        </div>
      )}

      {section === "compras" && (
        <div className="flex gap-4 mx-0.5 mb-7">
          <ActionButton type={"button"} onClick={() => handleClick("Compras")}>
            Compras
          </ActionButton>
          <ActionButton onClick={() => handleClick("Insumos")}>
            Insumos
          </ActionButton>
        </div>
      )}

      <div className="bg-stone-400 px-0.5 py-0.5">{children}</div>
    </div>
  );
}

export default ContainerTable;
