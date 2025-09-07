import { formatPrecio, replaceUnderscore } from "../_lib/auxiliar";

function TableData({ children }) {
  return (
    <td className="text-center capitalize px-0.4 sm:px-2 md:px-3 lg:px-4 xl:px-6 py-2 text-xs sm:text-sm md:text-md  max-w-dvw  min-w-full  ">
      {typeof children === "string" ? replaceUnderscore(children) : children}
    </td>
  );
}

export default TableData;
