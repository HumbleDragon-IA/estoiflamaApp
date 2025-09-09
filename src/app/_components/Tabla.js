"use client";
import { useState } from "react";
import { generateTableData } from "../_lib/auxiliar";
import TableHeaders from "./TableHeaders";

import TableBody from "./TableBody";
import TableTitle from "./TableTitle";
import TableModal from "./TableModal";

function Tabla({
  data,
  nombreTabla,
  extraData = [],
  detalleFilamentos,
  detalleInsumos,
  options,
}) {
  const { headers3: headers } = generateTableData(data);

  const [open, setOpen] = useState(false);

  //</div>;
  return (
    <div className="flex flex-col items-center mx-auto px-1 justify-between gap-4 bg-background text-foreground font-sans antialiased min-w-full max-w-dvw  ">
      <TableTitle
        nombreTabla={nombreTabla}
        open={open}
        setOpen={setOpen}
      ></TableTitle>
      <TableModal
        extraData={extraData}
        nombreTabla={nombreTabla}
        open={open}
        setOpen={setOpen}
      ></TableModal>

      {data.length > 0 ? (
        <table
          className={`table-auto border-spacing-3 max-w-dvw  min-w-full border-stone-300 border-collapse border-2   ${
            open && "hidden"
          }`}
        >
          <TableHeaders headers={headers}></TableHeaders>

          <TableBody
            data={data}
            headers={headers}
            nombreTabla={nombreTabla}
            extraData={extraData}
            detalleFilamentos={detalleFilamentos}
            detalleInsumos={detalleInsumos}
            options={options}
          ></TableBody>
        </table>
      ) : (
        <span>No hay {nombreTabla} registradas</span>
      )}
    </div>
  );
}

export default Tabla;
