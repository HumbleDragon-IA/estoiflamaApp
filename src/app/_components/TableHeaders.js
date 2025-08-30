import TableData from "./TableData";

function TableHeaders({ headers }) {
  return (
    <tr className="">
      {headers.map((header, i) => {
        if (header !== "id" && header.slice(-2) !== "Id") {
          // console.log(header);
          return <TableData key={header + i}>{header}</TableData>;
        }
      })}
    </tr>
  );
}

export default TableHeaders;
