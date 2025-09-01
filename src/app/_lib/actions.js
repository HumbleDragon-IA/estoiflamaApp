"use server";

import { auth, signIn, signOut } from "./auth";
import { createImpresion, createModelo } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/impresiones",
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createImpresionAction(prevState, formData) {
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

  await createImpresion(newImpresion);
  revalidatePath("/impresiones");
  // TODO: persistir en tu DB...
  return { ok: true, error: null };
}

export async function createModeloAction(prevState, formData) {
  const session = await auth();
  if (!session) return { ok: false, error: "Tenés que estar logueado." };
  console.log(formData, "FORMDATA EN SERVER");
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

  await createModelo(newModelo);
  revalidatePath("/modelos");

  // TODO: persistir en tu DB...
  return { ok: true, error: null };
}
