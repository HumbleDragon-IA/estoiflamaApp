"use client";
import ActionButton from "./ActionButton";
import { createRegistroGastoFilamentoAction } from "../_lib/actions";
import { useActionState, useEffect, useCallback } from "react";

const initialState = { ok: false, error: null };

function CrearRegistroGastoForm({
  open,
  onClose,
  extraData,
  isEditing = false,
  editData,
  id = null,
}) {
  const actionWithArgs = useCallback(
    (prevState, formData) =>
      createRegistroGastoFilamentoAction(prevState, formData, isEditing, id),
    [isEditing, id]
  );

  const [state, formAction, isPending] = useActionState(
    actionWithArgs,
    initialState
  );

  const insumos = !isEditing ? extraData.pop() : extraData;

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

      {/* MODELO */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="modelo">Selecciona el Filamento</label>
        <select
          id="filamento"
          name="filamento"
          defaultValue={isEditing ? editData.filamentoId : ""}
          className="max-w-full py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        >
          <option value="" disabled>
            — Elegí —
          </option>
          {insumos.map((i) => {
            if (i.categoriaId === 1) {
              return (
                <option key={i.id + i.codigo_insumo} value={i.id}>
                  {i.categoriaInsumo.nombre_categoria_insumo +
                    " - " +
                    i.caracteristica}
                </option>
              );
            }
          })}
        </select>
      </div>

      <div className="hidden">
        <input
          type="hidden"
          id="impresion"
          name="impresion"
          defaultValue={isEditing ? editData.impresionId : id}
        ></input>
      </div>

      {/* CANTIDAD */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="cantidad">
          Ingrese cantidad (grms) gastados en modelo
        </label>
        <input
          id="modelo"
          name="modelo"
          type="number"
          step="any"
          defaultValue={isEditing ? editData.costo_modelo : 0}
          min={0}
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>
      {/* CANTIDAD */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="cantidad">
          Ingrese cantidad (grms) gastados en soporte
        </label>
        <input
          id="soporte"
          name="soporte"
          type="number"
          step="any"
          defaultValue={isEditing ? editData.costo_soporte : 0}
          min={0}
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>

      {/* CANTIDAD */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="cantidad">Ingrese cantidad (grms) expulsado</label>
        <input
          id="expulsado"
          name="expulsado"
          type="number"
          step="any"
          defaultValue={isEditing ? editData.costo_expulsado : 0}
          min={0}
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>
      {/* CANTIDAD */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="cantidad">
          Ingrese cantidad (grms) gastados en torre
        </label>
        <input
          id="torre"
          name="torre"
          type="number"
          step="any"
          defaultValue={isEditing ? editData.costo_torre : 0}
          min={0}
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>
      <div className="flex justify-end gap-4 pt-4 max-w-full">
        <ActionButton type="cancel" onClick={onClose}>
          Cancelar
        </ActionButton>
        <ActionButton type="primary" isSubmit>
          {isPending
            ? `${isEditing ? "Editando..." : "Registrando"}`
            : `${isEditing ? "Editar" : "Registrar"}`}
        </ActionButton>
      </div>
    </form>
  );
}

export default CrearRegistroGastoForm;
