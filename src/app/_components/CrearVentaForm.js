"use client";

import ActionButton from "./ActionButton";
import { createVentaAction } from "../_lib/actions";
import { useActionState, useEffect, useCallback } from "react";
import { invertParseFecha } from "../_lib/auxiliar";
const initialState = { ok: false, error: null };

function CrearVentaForm({
  open,
  onClose,
  extraData,
  isEditing = false,
  editData,
  id = null,
}) {
  console.log("ENTRE A VENTA FORM?");
  const actionWithArgs = useCallback(
    (prevState, formData) =>
      createVentaAction(prevState, formData, isEditing, id),
    [isEditing, id]
  );

  const [state, formAction, isPending] = useActionState(
    actionWithArgs,
    initialState
  );
  const [impresiones, clientes] = extraData;
  console.log(impresiones, " A ER COMO LLEGAN LAS IMPRESIONES");

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

      {clientes.length > 0 && (
        <>
          <div className="space-y-2 flex flex-col max-w-full">
            <label htmlFor="insumo">Selecciona el Cliente</label>
            <select
              id="cliente"
              name="cliente"
              defaultValue={isEditing ? editData.clienteId : ""}
              className="max-w-full py-2 shadow-lg shadow-stone-800 text-stone-800"
              required
            >
              <option value="" disabled>
                — Elegí —
              </option>
              {clientes.map((i, ind) => {
                return (
                  <option key={i.id + i.nombre_cliente + ind} value={i.id}>
                    {i.nombre_cliente + " - " + i.telefono}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="space-y-2 flex flex-col max-w-full">
            <label htmlFor="insumo">Selecciona la impresion</label>
            <select
              id="impresion"
              name="impresion"
              defaultValue={isEditing ? editData.impresionId : ""}
              className="max-w-full py-2 shadow-lg shadow-stone-800 text-stone-800"
              required
            >
              <option value="" disabled>
                — Elegí —
              </option>
              {impresiones.map((i, ind) => {
                return (
                  <option
                    key={i.id + i.modelo.nombre_modelo + ind}
                    value={i.id}
                  >
                    {i.modelo.nombre_modelo +
                      " - " +
                      i.tamaño.tamaño +
                      " - " +
                      i.calidad.calidad}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}

      {/* CANTIDAD */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="descuento">Observaciones</label>
        <input
          id="observaciones"
          name="observaciones"
          type="text"
          defaultValue={isEditing ? editData.cantidad : ""}
          placeholder="Ingrese si tiene alguna observacion"
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="descuento">Cantidad</label>
        <input
          id="cantidad"
          name="cantidad"
          type="number"
          defaultValue={isEditing ? editData.cantidad : ""}
          placeholder="Ingrese la cantidad"
          min={0}
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>

      {clientes.length > 0 && (
        <div className="space-y-2 flex flex-col max-w-full">
          <label htmlFor="fecha">Fecha Entrega</label>
          <input
            id="fecha_entrega"
            name="fecha_entrega"
            type="date"
            defaultValue={
              isEditing ? invertParseFecha(editData.fecha_entrega) : ""
            }
            placeholder="Seleccione la fecha"
            className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
            required
          />
        </div>
      )}

      <div className="flex justify-end gap-4 pt-4 max-w-full">
        <ActionButton type="cancel" onClick={onClose}>
          Cancelar
        </ActionButton>
        <ActionButton type="primary" isSubmit isPending={isPending}>
          {isPending
            ? `${isEditing ? "Editando..." : "Registrar"}`
            : `${isEditing ? "Editar" : "Registrar Venta"}`}
        </ActionButton>
      </div>
    </form>
  );
}

export default CrearVentaForm;
