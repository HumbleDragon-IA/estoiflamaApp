import { replaceUnderscore } from "../_lib/auxiliar";
import TableData from "./TableData";

function TableHeaders({ headers }) {
  return (
    <tr className="text-md font-bold">
      {headers.map((header, i) => {
        if (header !== "id" && header.slice(-2) !== "Id") {
          // console.log(header);
          return (
            <TableData key={header + i}>{replaceUnderscore(header)}</TableData>
          );
        }
      })}
    </tr>
  );
}

export default TableHeaders;
