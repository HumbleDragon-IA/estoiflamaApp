import React from "react";
import MenuButton from "./MenuButton";
import TableData from "./TableData";
function TableRow({
  row,
  headers,
  nombreTabla,
  extraData,
  detalleFilamentos,
  detalleInsumos,
}) {
  return (
    <tr className="text-center border-b-1 odd:bg-stone-800 even:bg-stone-700  ">
      {headers.map((header, i) => {
        if (headers.length - 1 === i) {
          return (
            <React.Fragment key={row.id + header}>
              <TableData key={row[header] + i}>{row[header]}</TableData>
              <TableData key={row[header] + "menu"}>
                <MenuButton
                  options={[
                    "Editar",
                    "Eliminar",
                    "Ver Detalle",
                    "Registrar Detalle",
                  ]}
                  rowData={row}
                  nombreTabla={nombreTabla}
                  extraData={extraData}
                  detalleFilamentos={detalleFilamentos}
                  detalleInsumos={detalleInsumos}
                ></MenuButton>
              </TableData>
            </React.Fragment>
          );
        }
        if (header !== "id" && header.slice(-2) !== "Id") {
          return <TableData key={row[header] + i}>{row[header]}</TableData>;
        }
      })}
    </tr>
  );
}

export default TableRow;
