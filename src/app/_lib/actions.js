"use server";

import { auth, signIn, signOut } from "./auth";
import { createImpresion } from "./data-service";
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
  await createImpresion(newImpresion);
  revalidatePath("/impresiones");
  // createImpresion();
  // Validaciones rápidas
  // if (!modeloId || !tamanoId || !calidadId) {
  //   throw new Error("Seleccioná modelo, tamaño y calidad.");
  // }

  // TODO: persistir en tu DB...
  return { ok: true, error: null };
}
