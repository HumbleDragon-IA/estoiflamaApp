"use client";
import { useState } from "react";
import { generateTableData } from "../_lib/auxiliar";
import ActionButton from "./ActionButton";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";
import CrearImpresionForm from "./CrearImpresionForm";
import Modal from "./Modal";
import CrearModeloForm from "./CrearModeloForm";

function Tabla({ data, nombreTabla, extraData }) {
  const { headers3: headers, row2: rows } = generateTableData(data);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between gap-4 bg-background text-foreground font-sans antialiased w-xl sm:w-xl md:w-2xl lg:w-4xl xl:w-7xl ">
      <div className="flex flex-row justify-between items-center  w-md sm:w-lg md:w-2xl lg:w-4xl xl:w-7xl mb-2 ">
        <h2 className="text-sm lg:text-lg">Tabla de {nombreTabla}</h2>
        <div className="bg-red-50">
          {nombreTabla === "Impresiones" && !open && (
            <ActionButton onClick={() => setOpen(true)} type="primary">
              Registrar Impresion
            </ActionButton>
          )}
          {nombreTabla === "Modelos" && !open && (
            <ActionButton onClick={() => setOpen(true)} type="primary">
              Agregar Modelo
            </ActionButton>
          )}
        </div>
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

      {nombreTabla === "Modelos" && open && (
        <Modal
          open={open}
          title={"Registrar Modelo"}
          onClose={() => setOpen(false)}
        >
          <CrearModeloForm
            extraData={extraData}
            open={open}
            onClose={() => setOpen(false)}
          ></CrearModeloForm>
        </Modal>
      )}
      <table
        className={`table-auto border-spacing-3  mx-auto border-stone-300 border-collapse border-2 w-md sm:w-lg md:w-2xl lg:w-4xl xl:w-7xl ${
          open && "hidden"
        }`}
      >
        <thead className="border-b-2 ">
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
