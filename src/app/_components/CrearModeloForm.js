"use client";
import ActionButton from "./ActionButton";
import { createModeloAction } from "../_lib/actions";
import { useActionState, useEffect } from "react";
const initialState = { ok: false, error: null };

function CrearModeloForm({ open, onClose, extraData }) {
  const [state, formAction, isPending] = useActionState(
    createModeloAction,
    initialState
  );
  const [categorias] = extraData;
  console.log(categorias, "EN FORM");
  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

  if (!open) return null;

  return (
    <form
      action={formAction}
      className="bg-stone-600 py-8 px-12 text-lg flex gap-6 flex-col w-md rounded-2xl shadow-lg shadow-stone-800 text-white"
    >
      {state.error && (
        <p className="rounded-md bg-red-600/20 border border-red-600 px-3 py-2 text-red-200">
          {state.error}
        </p>
      )}

      {/* nombre modelo */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="nombre">Ingresá el nombre del modelo</label>
        <input
          id="nombre"
          name="nombre"
          defaultValue=""
          className="w-3xs py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        />
      </div>

      {/* fuente modelo */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="fuente">Fuente del modelo</label>
        <input
          id="fuente"
          name="fuente"
          defaultValue=""
          className="w-3xs py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        />
      </div>

      {/* url modelo */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="url">Ingresá la Url del modelo</label>
        <input
          id="url"
          name="url"
          defaultValue=""
          className="w-3xs py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        />
      </div>

      {/* Categoria modelo */}
      <div className="space-y-2 flex flex-col w-xs">
        <label htmlFor="categoria">Seleccioná la categoria del modelo</label>
        <select
          id="categoria"
          name="categoria"
          defaultValue="0"
          className="w-3xs py-2 shadow-lg shadow-stone-800 text-stone-800"
        >
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre_categoria_modelo}
            </option>
          ))}
        </select>
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

export default CrearModeloForm;
