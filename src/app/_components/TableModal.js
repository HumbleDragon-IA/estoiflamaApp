import CrearImpresionForm from "./CrearImpresionForm";
import CrearModeloForm from "./CrearModeloForm";
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
    </div>
  );
}

export default TableModal;
