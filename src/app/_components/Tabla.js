"use client";
import { useState } from "react";
import { generateTableData } from "../_lib/auxiliar";
import ActionButton from "./ActionButton";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";
import CrearImpresionForm from "./CrearImpresionForm";
import Modal from "./Modal";

function Tabla({ data, nombreTabla, extraData }) {
  const { headers3: headers, row2: rows } = generateTableData(data);
  const [open, setOpen] = useState(false);

  return (
    <div className="grid min-w-dvh grid-rows-[auto_1fr_auto] gap-4 bg-background text-foreground font-sans antialiased">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-sm">Tabla de {nombreTabla}</h2>
        {!open && (
          <ActionButton onClick={() => setOpen(true)} type="primary">
            Registrar Impresion
          </ActionButton>
        )}
      </div>
      {nombreTabla === "Impresiones" && open && (
        <Modal
          open={open}
          title="Crear Impresion"
          onClose={() => setOpen(false)}
        >
          <CrearImpresionForm
            extraData={extraData}
            open={open}
            onClose={() => setOpen(false)}
          ></CrearImpresionForm>
        </Modal>
      )}
      <table
        className={`table-auto border-spacing-3 rounded-xl border-stone-300 border-collapse border-2 w-7xl ${
          open && "hidden"
        }`}
      >
        <thead className="border-b-2">
          <TableHeaders headers={headers}></TableHeaders>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            return (
              <TableRow row={row} headers={headers} key={row.id}></TableRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;
