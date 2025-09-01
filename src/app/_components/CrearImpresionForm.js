"use client";
import ActionButton from "./ActionButton";
import { createImpresionAction } from "../_lib/actions";
import { useActionState, useEffect, useState } from "react";

const initialState = { ok: false, error: null };

function CrearImpresionForm({ open, onClose, extraData }) {
  const [state, formAction, isPending] = useActionState(
    createImpresionAction,
    initialState
  );
  const [modelos, calidades, tamaños, pedidos] = extraData;

  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

  if (!open) return null;

  return (
    <form
      action={formAction}
      className="bg-stone-600 py-8 px-12 text-lg flex gap-6 flex-col w-md sm:w-lg md:w-2xl lg:w-4xl xl:w-7xl  rounded-2xl shadow-lg shadow-stone-800 text-white"
    >
      {state.error && (
        <p className="rounded-md bg-red-600/20 border border-red-600 px-3 py-2 text-red-200">
          {state.error}
        </p>
      )}

      {/* MODELO */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="modelo">Selecciona el modelo</label>
        <select
          id="modelo"
          name="modelo"
          defaultValue=""
          className="w-3xs py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        >
          <option value="" disabled>
            — Elegí —
          </option>
          {modelos.map((m) => (
            <option key={m.id + m.nombre_modelo} value={m.id}>
              {m.nombre_modelo}
            </option>
          ))}
        </select>
      </div>

      {/* TAMAÑO */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="tamaño">Selecciona el Tamaño</label>
        <select
          id="tamaño"
          name="tamaño"
          defaultValue=""
          className="w-3xs py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        >
          <option value="" disabled>
            — Elegí —
          </option>
          {tamaños.map((t) => (
            <option key={t.id + t.tamaño} value={t.id}>
              {t.tamaño}
            </option>
          ))}
        </select>
      </div>

      {/* CALIDAD */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="calidad">Selecciona la calidad</label>
        <select
          id="calidad"
          name="calidad"
          defaultValue=""
          className="w-3xs py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        >
          <option value="" disabled>
            — Elegí —
          </option>
          {calidades.map((c) => (
            <option key={c.id + c.calidad} value={c.id}>
              {c.calidad}
            </option>
          ))}
        </select>
      </div>

      {/* PEDIDO */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="pedido">Pedido Relacionado</label>
        <select
          id="pedido"
          name="pedido"
          defaultValue="0"
          className="w-3xs py-2 shadow-lg shadow-stone-800 text-stone-800"
        >
          <option value="0">No tiene</option>
          {pedidos.map((p) => (
            <option key={p?.id} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* CANTIDAD */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="cantidad">Ingrese cantidad de modelos a imprimir</label>
        <input
          id="cantidad"
          name="cantidad"
          type="number"
          defaultValue={0}
          min={0}
          className="bg-stone-200 text-stone-700 w-3xs py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>

      {/* TIEMPO */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="tiempo_impresion">
          Ingrese (en minutos) la duración total
        </label>
        <input
          id="tiempo_impresion"
          name="tiempo_impresion"
          type="number"
          defaultValue={0}
          min={0}
          className="bg-stone-200 text-stone-700 w-3xs py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 w-sm">
        <ActionButton type="cancel" onClick={onClose}>
          Cancelar
        </ActionButton>
        <ActionButton type="primary" isSubmit>
          {isPending ? "Registrando..." : "Registrar"}
        </ActionButton>
      </div>
    </form>
  );
}

export default CrearImpresionForm;
