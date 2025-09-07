"use server";

import { auth, signIn, signOut } from "./auth";
import { createRegister, deleteRegister, updateRegister } from "./data-service";

import { revalidatePath } from "next/cache";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/impresiones",
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function getDetalleGastosByImpresionIdAction(id) {
  const session = await auth();
  if (!session) return { ok: false, error: "Tenes que estar logueado" };

  // const { data, error } = await getDetalleGastosByImpresionId(id);

  if (error) return { ok: false, error: "No se pudo obtener el detalle" };

  return data;
}

export async function createRegistroGastoFilamentoAction(
  prevState,
  formData,
  isEditing,
  id
) {
  const session = await auth();
  if (!session) return { ok: false, error: "Tenes que estar logueado" };

  const filamentoId = Number(formData.get("filamento"));
  const impresionId = Number(formData.get("impresion"));
  const costo_modelo = Number(formData.get("modelo"));
  const costo_soporte = Number(formData.get("soporte"));
  const costo_expulsado = Number(formData.get("expulsado"));
  const costo_torre = Number(formData.get("torre"));

  const newRegistro = {
    filamentoId,
    impresionId,
    costo_modelo,
    costo_soporte,
    costo_expulsado,
    costo_torre,
  };

  if (!filamentoId || !impresionId) {
    return { ok: false, error: "No se pudo crear el registro" };
  }

  if (!isEditing) {
    await createRegister(newRegistro, "tabla_detalle_gasto_filamento");
  } else {
    await updateRegister(id, newRegistro, "tabla_detalle_gasto_filamento");
  }

  revalidatePath("/impresiones");

  return { ok: true, error: null };
}

export async function createImpresionAction(
  prevState,
  formData,
  isEditing,
  id
) {
  const session = await auth();
  if (!session) return { ok: false, error: "Tenés que estar logueado." };

  const modeloId = Number(formData.get("modelo"));
  const tamañoId = Number(formData.get("tamaño"));
  const calidadId = Number(formData.get("calidad"));
  const pedidoId = Number(formData.get("pedido")) || null;
  const cantidad = Number(formData.get("cantidad"));
  const tiempoImpresion = Number(formData.get("tiempo_impresion"));

  const newImpresion = {
    modeloId,
    tamañoId,
    calidadId,
    pedidoId,
    tiempo_impresion: tiempoImpresion,
    cantidades_por_impresion: cantidad,
  };
  // createImpresion();
  // Validaciones rápidas
  if (!modeloId || !tamañoId || !calidadId) {
    return { ok: false, error: "No se pudo crear la impresion" };
  }

  if (!isEditing) {
    await createRegister(newImpresion, "impresiones");
  } else {
    await updateRegister(id, newImpresion, "impresiones");
  }
  revalidatePath("/impresiones");
  // TODO: persistir en tu DB...
  return { ok: true, error: null };
}

export async function createModeloAction(prevState, formData) {
  const session = await auth();
  if (!session) return { ok: false, error: "Tenés que estar logueado." };
  const nombre_modelo = String(formData.get("nombre"));
  const categoriaId = Number(formData.get("categoria"));
  const fuente = String(formData.get("fuente"));
  const url_link = String(formData.get("url"));

  const newModelo = {
    nombre_modelo,
    categoriaId,
    fuente,
    url_link,
  };
  // createImpresion();
  // Validaciones rápidas
  if (!categoriaId || !nombre_modelo) {
    return { ok: false, error: "No se pudo crear el modelo" };
  }

  await createRegister(newModelo, "modelos");
  revalidatePath("/modelos");

  // TODO: persistir en tu DB...
  return { ok: true, error: null };
}

export async function deleteAction(keyword, id) {
  const session = await auth();

  if (!session) throw new Error("No estas autorizado");
  await deleteRegister(
    `${
      keyword.toLowerCase() === "detalle gastos"
        ? "tabla_detalle_gasto_filamento"
        : keyword
    }`,
    id
  );
  revalidatePath(`/${keyword}`);
}
