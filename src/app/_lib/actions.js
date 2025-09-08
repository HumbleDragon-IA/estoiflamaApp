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

export async function createCompraAction(prevState, formData, isEditing, id) {
  const session = await auth();
  if (!session) return { ok: false, error: "Tenés que estar logueado." };

  const insumoId = Number(formData.get("insumo"));
  const cantidad = Number(formData.get("cantidad"));
  const descuento = Number(formData.get("descuento"));
  const precio_unitario = Number(formData.get("precioUnitario"));
  const numero_factura = String(formData.get("factura"));
  const fecha_compra = formData.get("fecha");

  const newCompra = {
    insumoId,
    cantidad,
    descuento,
    precio_unitario,
    numero_factura,
    fecha_compra,
    sub_total: precio_unitario * cantidad,
    total:
      precio_unitario * cantidad -
      precio_unitario * cantidad * (descuento / 100),
  };

  if (!insumoId) {
    return { ok: false, error: "No se pudo crear la compra" };
  }

  if (!isEditing) {
    await createRegister(newCompra, "compras_insumos");
  } else {
    await updateRegister(id, newCompra, "compras_insumos");
  }
  revalidatePath("/compras");
  // TODO: persistir en tu DB...
  return { ok: true, error: null };
}

export async function createInsumosAction(prevState, formData, isEditing, id) {
  const session = await auth();
  if (!session) return { ok: false, error: "Tenés que estar logueado." };

  const caracteristica = String(formData.get("caracteristica"));
  const proveedorId = Number(formData.get("proveedor"));
  const marcaId = Number(formData.get("marca"));
  const categoriaId = Number(formData.get("categoria"));
  const codigo_insumo = String(formData.get("codigoInsumo"));
  const nombre_insumo = String(formData.get("nombreInsumo"));
  const unidad_medida = String(formData.get("unidadMedida"));
  const stock = Number(formData.get("stockInicial"));

  const newInsumo = {
    caracteristica,
    proveedorId,
    marcaId,
    categoriaId,
    codigo_insumo,
    nombre_insumo,
    unidad_medida,
    stock,
  };
  if (!proveedorId || !marcaId || !categoriaId) {
    return { ok: false, error: "No se pudo crear el insumo" };
  }

  if (!isEditing) {
    await createRegister(newInsumo, "insumos");
  } else {
    await updateRegister(id, newInsumo, "insumos");
  }
  revalidatePath("/insumos");
  // TODO: persistir en tu DB...
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
        : keyword.toLowerCase() === "compras"
        ? "compras_insumos"
        : keyword
    }`,
    id
  );
  revalidatePath(`/${keyword}`);
}
