"use client";

import ActionButton from "./ActionButton";
import { createCompraAction } from "../_lib/actions";
import { useActionState, useEffect, useCallback } from "react";
import { invertParseFecha } from "../_lib/auxiliar";
const initialState = { ok: false, error: null };

function CrearCompraForm({
  open,
  onClose,
  extraData,
  isEditing = false,
  editData,
  id = null,
}) {
  const actionWithArgs = useCallback(
    (prevState, formData) =>
      createCompraAction(prevState, formData, isEditing, id),
    [isEditing, id]
  );

  const [state, formAction, isPending] = useActionState(
    actionWithArgs,
    initialState
  );
  const [insumos] = extraData;
  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

  if (!open) return null;
  return (
    <form
      action={formAction}
      className="bg-stone-600 py-8 px-12 text-lg flex gap-6 flex-col max-w-full rounded-2xl shadow-lg shadow-stone-800 text-white"
    >
      {state.error && (
        <p className="rounded-md bg-red-600/20 border border-red-600 px-3 py-2 text-red-200">
          {state.error}
        </p>
      )}

      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="insumo">Selecciona el Insumo</label>
        <select
          id="insumo"
          name="insumo"
          defaultValue={isEditing ? editData.insumoId : ""}
          className="max-w-full py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        >
          <option value="" disabled>
            — Elegí —
          </option>
          {insumos.map((i, ind) => {
            return (
              <option key={i.id + i.nombre + ind} value={i.id}>
                {i.categoria_insumo +
                  " " +
                  i.nombre +
                  " - " +
                  i.caracteristica +
                  " - " +
                  i.marca}
              </option>
            );
          })}
        </select>
      </div>

      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="cantidad">Cantidad Comprada</label>
        <input
          id="cantidad"
          name="cantidad"
          type="number"
          min={0}
          defaultValue={isEditing ? editData.cantidad : ""}
          placeholder="Ingrese cantidad comprada"
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>

      {/* CANTIDAD */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="descuento">Descuento</label>
        <input
          id="descuento"
          name="descuento"
          type="number"
          step="any"
          defaultValue={isEditing ? editData.descuento : ""}
          placeholder="Ingrese el % de descuento"
          min={0}
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="precioUnitario">Precio Unitario</label>
        <input
          id="precioUnitario"
          name="precioUnitario"
          type="number"
          step="any"
          min={0}
          defaultValue={isEditing ? editData.precio_unitario : ""}
          placeholder="Ingrese el precio unitario"
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>
      {/* CANTIDAD */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="factura">Numero Factura</label>
        <input
          id="factura"
          name="factura"
          type="text"
          defaultValue={isEditing ? editData.factura : ""}
          placeholder="Ingrese Numero de factura"
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>
      {/* CANTIDAD */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="fecha">Fecha Compra</label>
        <input
          id="fecha"
          name="fecha"
          type="date"
          defaultValue={isEditing ? invertParseFecha(editData.fecha) : ""}
          placeholder="Seleccione la fecha"
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>
      <div className="flex justify-end gap-4 pt-4 max-w-full">
        <ActionButton type="cancel" onClick={onClose}>
          Cancelar
        </ActionButton>
        <ActionButton type="primary" isSubmit isPending={isPending}>
          {isPending
            ? `${isEditing ? "Editando..." : "Registrando"}`
            : `${isEditing ? "Editar" : "Registrar"}`}
        </ActionButton>
      </div>
    </form>
  );
}

export default CrearCompraForm;
