import { formatPrecio, replaceUnderscore } from "../_lib/auxiliar";

function TableData({ children }) {
  return (
    <td className="text-center capitalize px-2 py-4 text-sm">
      {typeof children === "string"
        ? replaceUnderscore(children)
        : typeof children === "number" && children > 500
        ? formatPrecio(children)
        : children}
    </td>
  );
}

export default TableData;
