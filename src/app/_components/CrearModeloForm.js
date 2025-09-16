"use client";
import ActionButton from "./ActionButton";
import { createModeloAction } from "../_lib/actions";
import { useActionState, useCallback, useEffect } from "react";
const initialState = { ok: false, error: null };

function CrearModeloForm({
  open,
  onClose,
  extraData,
  isEditing = false,
  editData,
  id = null,
}) {
  const actionWithArgs = useCallback(
    (prevState, formData) =>
      createModeloAction(prevState, formData, isEditing, id),
    [isEditing, id]
  );

  const [state, formAction, isPending] = useActionState(
    actionWithArgs,
    initialState
  );
  const [categorias] = extraData;
  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

  if (!open) return null;
  console.log(editData, " A VER LA EDITA DATA");
  return (
    <form
      action={formAction}
      className="bg-stone-600 py-8 px-12 text-lg flex gap-6 max-w-full flex-col  min-h-full max-h-dvh rounded-2xl shadow-lg shadow-stone-800 text-white"
    >
      {state.error && (
        <p className="rounded-md bg-red-600/20 border border-red-600 px-3 py-2 text-red-200">
          {state.error}
        </p>
      )}

      {/* nombre modelo */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="nombre">Nombre del modelo</label>
        <input
          id="nombre"
          name="nombre"
          defaultValue={isEditing ? editData.nombre_modelo : ""}
          placeholder="Ingresa Nombre del modelo"
          className=" py-2 shadow-lg shadow-stone-800 text-stone-800 max-w-full pl-2"
          required
        />
      </div>

      {/* fuente modelo */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="fuente">Fuente del modelo</label>
        <input
          id="fuente"
          name="fuente"
          defaultValue={isEditing ? editData.fuente : ""}
          placeholder="Ingresa la fuente del modelo"
          className="py-2 shadow-lg shadow-stone-800 text-stone-800 max-w-full  pl-2"
          required
        />
      </div>

      {/* url modelo */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="url">URL/Link del Modelo</label>
        <input
          id="url"
          name="url"
          defaultValue={isEditing ? editData.url : ""}
          placeholder="Ingresa la URL o Link del modelo"
          className="py-2 shadow-lg shadow-stone-800 text-stone-800 max-w-full  pl-2"
          required
        />
      </div>

      {/* Categoria modelo */}
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="categoria">Categoria del modelo</label>
        <select
          id="categoria"
          name="categoria"
          defaultValue={isEditing ? editData.categoriaId : ""}
          className="py-2 shadow-lg shadow-stone-800 text-stone-800 max-w-full  pl-2"
        >
          <option>Seleccione una categoria</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre_categoria_modelo}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-5 mt-2 items-start flex-col">
        <label className="">Imagen del modelo</label>
        <input
          className="file-input "
          type="file"
          disabled={isPending}
          id="image"
          name="image"
          accept="image/*"
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

export default CrearModeloForm;
