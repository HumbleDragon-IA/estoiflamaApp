import CrearCompraForm from "./CrearCompraForm";
import CrearImpresionForm from "./CrearImpresionForm";
import CrearInsumoForm from "./CrearInsumoForm";
import CrearModeloForm from "./CrearModeloForm";
import CrearVentaForm from "./CrearVentaForm";
import Modal from "./Modal";

function TableModal({ extraData, nombreTabla, open, setOpen }) {
  return (
    <div>
      {nombreTabla === "Impresiones" && open && (
        <Modal
          open={open}
          title="Crear Impresion"
          onClose={() => setOpen(false)}
        >
          <CrearImpresionForm
            extraData={extraData}
            open={open}
            onClose={() => setOpen(false)}
          ></CrearImpresionForm>
        </Modal>
      )}
      {nombreTabla === "Modelos" && open && (
        <Modal
          open={open}
          title={"Registrar Modelo"}
          onClose={() => setOpen(false)}
        >
          <CrearModeloForm
            extraData={extraData}
            open={open}
            onClose={() => setOpen(false)}
          ></CrearModeloForm>
        </Modal>
      )}
      {nombreTabla === "Insumos" && open && (
        <Modal
          open={open}
          title={"Registrar nuevo insumo"}
          onClose={() => setOpen(false)}
        >
          <CrearInsumoForm
            extraData={extraData}
            open={open}
            onClose={() => setOpen(false)}
          ></CrearInsumoForm>
        </Modal>
      )}
      {nombreTabla === "Compras" && open && (
        <Modal
          open={open}
          title={"Registrar Nueva Compra"}
          onClose={() => setOpen(false)}
        >
          <CrearCompraForm
            extraData={extraData}
            open={open}
            onClose={() => setOpen(false)}
          ></CrearCompraForm>
        </Modal>
      )}{" "}
      {nombreTabla === "Ventas" && open && (
        <Modal
          open={open}
          title={"Registrar Nueva Venta"}
          onClose={() => setOpen(false)}
        >
          <CrearVentaForm
            extraData={extraData}
            open={open}
            onClose={() => setOpen(false)}
          ></CrearVentaForm>
        </Modal>
      )}
    </div>
  );
}

export default TableModal;
