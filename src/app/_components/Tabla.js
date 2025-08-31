"use client";
import { generateTableData } from "../_lib/auxiliar";
import ActionButton from "./ActionButton";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";

function Tabla({ data, nombreTabla }) {
  const { headers3: headers, row2: rows } = generateTableData(data);

  return (
    <div className="grid min-w-dvh grid-rows-[auto_1fr_auto] gap-4 bg-background text-foreground font-sans antialiased">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-sm">Tabla de {nombreTabla}</h2>
        <ActionButton type="primary">Registrar Impresion</ActionButton>
      </div>
      <table className="table-auto border-spacing-3 rounded-xl border-stone-300 border-collapse border-2 w-7xl">
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
