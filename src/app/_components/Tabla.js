"use client";
import { generateTableData } from "../_lib/auxiliar";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";

function Tabla({ data, nombreTabla }) {
  const { headers3: headers, row2: rows } = generateTableData(data);
  return (
    <div className="grid w-2xl grid-row-2">
      <h2>Tabla de {nombreTabla}</h2>
      <table className="table-fixed border-spacing-3 rounded-xl border-stone-300 border-collapse border-1">
        <thead className="border-b-2 py-5">
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
