"use client";

import ActionButton from "./ActionButton";
import { createInsumosAction } from "../_lib/actions";
import { useActionState, useEffect, useCallback } from "react";
const initialState = { ok: false, error: null };

function CrearInsumoForm({
  open,
  onClose,
  extraData,
  isEditing = false,
  editData,
  id = null,
}) {
  const actionWithArgs = useCallback(
    (prevState, formData) =>
      createInsumosAction(prevState, formData, isEditing, id),
    [isEditing, id]
  );

  const [state, formAction, isPending] = useActionState(
    actionWithArgs,
    initialState
  );
  const [proveedores, marcas, categorias] = extraData;
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
        <label htmlFor="proveedor">Selecciona el Proveedor</label>
        <select
          id="proveedor"
          name="proveedor"
          defaultValue={isEditing ? editData.proveedorId : ""}
          className="max-w-full py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        >
          <option value="" disabled>
            — Elegí —
          </option>
          {proveedores.map((p) => {
            return (
              <option key={p.id + p.razon_social} value={p.id}>
                {p.razon_social}
              </option>
            );
          })}
        </select>
      </div>

      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="marca">Selecciona la marca</label>
        <select
          id="marca"
          name="marca"
          defaultValue={isEditing ? editData.marcaId : ""}
          className="max-w-full py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        >
          <option value="" disabled>
            — Elegí —
          </option>
          {marcas.map((m) => {
            return (
              <option key={m.id + m.nombre_marca_insumo} value={m.id}>
                {m.nombre_marca_insumo}
              </option>
            );
          })}
        </select>
      </div>

      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="categoria">Selecciona la categoria</label>
        <select
          id="categoria"
          name="categoria"
          defaultValue={isEditing ? editData.categoriaId : ""}
          className="max-w-full py-2 shadow-lg shadow-stone-800 text-stone-800"
          required
        >
          <option value="" disabled>
            — Elegí —
          </option>
          {categorias.map((c) => {
            return (
              <option key={c.id + c.nombre_categoria_insumo} value={c.id}>
                {c.nombre_categoria_insumo}
              </option>
            );
          })}
        </select>
      </div>

      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="codigoInsumo">Codigo Insumo</label>
        <input
          id="codigoInsumo"
          name="codigoInsumo"
          type="text"
          defaultValue={isEditing ? editData.codigo : ""}
          placeholder="Ingrese codigo de insumo"
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>

      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="nombreInsumo">Nombre Insumo</label>
        <input
          id="nombreInsumo"
          name="nombreInsumo"
          type="text"
          defaultValue={isEditing ? editData.nombre : ""}
          placeholder="Ingrese nombre insumo"
          min={0}
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>
      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="caracteristica">Caracteristica</label>
        <input
          id="caracteristica"
          name="caracteristica"
          type="text"
          defaultValue={isEditing ? editData.caracteristica : ""}
          placeholder="Ingrese caracteristica"
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>

      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="unidadMedida">Unidad de Medida</label>
        <input
          id="unidadMedida"
          name="unidadMedida"
          type="text"
          defaultValue={isEditing ? editData.unidadMedida : ""}
          placeholder="Ingrese unidad de medida"
          className="bg-stone-200 text-stone-700 max-w-full py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
          required
        />
      </div>

      <div className="space-y-2 flex flex-col max-w-full">
        <label htmlFor="stockInicial">Stock inicial</label>
        <input
          id="stockInicial"
          name="stockInicial"
          type="number"
          step="any"
          defaultValue={isEditing ? editData.stock : 0}
          min={0}
          placeholder="Ingrese stock inicial"
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

export default CrearInsumoForm;
