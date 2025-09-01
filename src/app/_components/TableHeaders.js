import { replaceUnderscore } from "../_lib/auxiliar";
import TableData from "./TableData";

function TableHeaders({ headers }) {
  return (
    <tr className="font-bold max-w-dvw  min-w-full divide-x-1 divide-stone-300 ">
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
