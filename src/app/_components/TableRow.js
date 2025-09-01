import TableData from "./TableData";
function TableRow({ row, headers }) {
  return (
    <tr className="text-center border-b-1 odd:bg-stone-800 even:bg-stone-700 divide-x-1 divide-stone-300 ">
      {/* {console.log(rows, "ROWS")} */}
      {headers.map((header, i) => {
        if (header !== "id" && header.slice(-2) !== "Id") {
          return <TableData key={row[header] + i}>{row[header]}</TableData>;
        }
      })}
    </tr>
  );
}

export default TableRow;
