import ActionButton from "./ActionButton";

function TableTitle({ nombreTabla, open, setOpen }) {
  return (
    <div className="flex flex-row justify-between items-center mx-auto min-w-full  max-w-dvw  mb-2 md:max-w-xl">
      <h2 className="text-sm lg:text-lg">Tabla de {nombreTabla}</h2>
      <div className="">
        {nombreTabla === "Impresiones" && !open && (
          <ActionButton onClick={() => setOpen(true)} type="primary">
            Registrar Impresion
          </ActionButton>
        )}
        {nombreTabla === "Modelos" && !open && (
          <ActionButton onClick={() => setOpen(true)} type="primary">
            Agregar Modelo
          </ActionButton>
        )}
        {nombreTabla === "Insumos" && !open && (
          <ActionButton onClick={() => setOpen(true)} type="primary">
            Agregar nuevo insumo
          </ActionButton>
        )}
        {nombreTabla === "Compras" && !open && (
          <ActionButton onClick={() => setOpen(true)} type="primary">
            Registrar nueva compra
          </ActionButton>
        )}
      </div>
    </div>
  );
}

export default TableTitle;
