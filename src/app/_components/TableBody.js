import TableRow from "./TableRow";

function TableBody({
  data,
  headers,
  nombreTabla,
  extraData,
  detalleFilamentos = [],
  detalleInsumos,
  options,
}) {
  return (
    <tbody>
      {data?.map((row, i) => {
        return (
          <TableRow
            row={row}
            headers={headers}
            key={row.id}
            nombreTabla={nombreTabla}
            extraData={extraData}
            detalleFilamentos={detalleFilamentos}
            detalleInsumos={detalleInsumos}
            options={options}
          ></TableRow>
        );
      })}
    </tbody>
  );
}

export default TableBody;
