import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "./Modal";
import CrearImpresionForm from "./CrearImpresionForm";
import { useState, useTransition, useCallback } from "react";
import SpinnerMini from "./SpinnerMini";
import { deleteAction } from "../_lib/actions";
import CrearRegistroGastoForm from "./CrearRegistroGastoForm";
import Tabla from "./Tabla";
import { filterDetalleGastoByImpresionId } from "../_lib/auxiliar";

const ITEM_HEIGHT = 48;

export default function MenuButton({
  options,
  rowData,
  nombreTabla,
  extraData,
  detalleFilamentos,
  detalleInsumos,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [option, setOption] = useState("");
  const [isPending, startTransition] = useTransition();
  const open = Boolean(anchorEl);
  nombreTabla.toLowerCase() === "impresiones" ? "" : [];
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setModalOpen(false);
    // si tu Modal maneja estado interno, que se cierre con esta prop
  }, []);

  const handleDelete = useCallback(async () => {
    const ok = window.confirm(
      `¿Está seguro que desea eliminar la impresión de ${rowData.cantidad} ${rowData.modelo}?`
    );
    if (!ok) {
      handleClose();
      return false;
    }

    setAnchorEl(null);
    startTransition(async () => {
      await deleteAction(nombreTabla.toLowerCase(), rowData.id);
    });
    return true;
  }, [rowData, nombreTabla, handleClose]);

  async function handleSelect(opt) {
    setOption(opt);

    if (opt === "Eliminar") {
      const started = await handleDelete();
      return;
    }

    setModalOpen(true);
    setAnchorEl(null);
  }

  const gerundio = option ? option.slice(0, -1) + "ndo..." : "Procesando...";

  return (
    <>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" } },
            list: { "aria-labelledby": "long-button" },
          }}
        >
          {options.map((opt) => (
            <MenuItem key={opt} onClick={() => handleSelect(opt)}>
              {!isPending ? (
                opt
              ) : (
                <span>
                  <SpinnerMini />
                </span>
              )}
            </MenuItem>
          ))}
        </Menu>

        {modalOpen && !isPending && (
          <Modal
            open
            title={
              nombreTabla.toLowerCase() === "detalle gastos"
                ? `${option + " gastos"}`
                : option
            }
            onClose={handleClose}
          >
            {option === "Editar" && nombreTabla === "Impresiones" && (
              <CrearImpresionForm
                open
                onClose={handleClose}
                extraData={extraData}
                isEditing={true}
                editData={rowData}
                id={rowData.id}
              />
            )}
            {option.toLowerCase() === "registrar detalle gastos" &&
              nombreTabla.toLowerCase() === "impresiones" && (
                <CrearRegistroGastoForm
                  open
                  onClose={handleClose}
                  extraData={extraData}
                  isEditing={false}
                  editData={rowData}
                  id={rowData.id}
                ></CrearRegistroGastoForm>
              )}
            {option.toLowerCase() === "ver detalle" &&
              nombreTabla.toLowerCase() === "impresiones" && (
                <div className="min-w-full max-w-dvw ">
                  <Tabla
                    data={filterDetalleGastoByImpresionId(
                      rowData.id,
                      detalleFilamentos
                    )}
                    nombreTabla={"Detalle Gastos"}
                    detalleInsumos={detalleInsumos}
                  ></Tabla>
                </div>
              )}
            {option.toLowerCase() === "registrar detalle" &&
              nombreTabla.toLowerCase() === "impresiones" && (
                <CrearRegistroGastoForm
                  open
                  onClose={handleClose}
                  extraData={detalleInsumos}
                  isEditing={false}
                  editData={rowData}
                  id={rowData.id}
                ></CrearRegistroGastoForm>
              )}
          </Modal>
        )}
        {option.toLowerCase() === "editar" &&
          nombreTabla.toLowerCase() === "detalle gastos" &&
          modalOpen &&
          !isPending && (
            <Modal
              open
              title={
                nombreTabla.toLowerCase() === "detalle gastos"
                  ? `${option + " gastos"}`
                  : option
              }
              onClose={handleClose}
            >
              <CrearRegistroGastoForm
                open
                onClose={handleClose}
                extraData={detalleInsumos}
                isEditing={true}
                editData={rowData}
                id={rowData.id}
              ></CrearRegistroGastoForm>
            </Modal>
          )}

        {isPending && (
          <Modal open title={gerundio} onClose={handleClose}>
            <SpinnerMini />
          </Modal>
        )}
      </div>
    </>
  );
}
