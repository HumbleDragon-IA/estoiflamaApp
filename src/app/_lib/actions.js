"use server";

import { auth, signIn, signOut } from "./auth";
import {
  createRegister,
  deleteRegister,
  getCompraById,
  getInsumoById,
  getModeloById,
  updateRegister,
  uploadModelImage,
} from "./data-service";

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
  let compraCreada;
  const insumoDeCompra = await getInsumoById(insumoId);
  let nuevoStock;
  if (!isEditing) {
    compraCreada = await createRegister(newCompra, "compras_insumos");
  } else {
    const compraAnterior = await getCompraById(id);
    if (compraAnterior.cantidad !== newCompra.cantidad) {
      nuevoStock = newCompra.cantidad - compraAnterior.cantidad;
    }
    console.log(
      "ENTRE EN EL EDIT ACTION ",
      insumoDeCompra.stock,
      "STOCK DEL INSUMO",
      nuevoStock,
      "stock a actualizar"
    );
    // Si el stock es 0
    // Si la cantidad a editar es<0
    if (insumoDeCompra.stock + nuevoStock < 0) {
      throw new Error("El stock no puede ser menor a 0");
    }
    await updateRegister(id, newCompra, "compras_insumos");
  }

  const insumoUpdated = await updateRegister(
    insumoId,
    {
      ...insumoDeCompra,
      stock: !isEditing
        ? insumoDeCompra.stock + newCompra.cantidad
        : insumoDeCompra.stock + nuevoStock,
    },
    "insumos"
  );
  if (!insumoUpdated) {
    throw new Error("No se pudo actualizar el stock del insumo de la compra");
  }

  // if (compraCreada) {
  //   const insumoAActualizar = await getInsumoById(compra.insumoId);
  //   updateRegister(
  //     compra.insumoId,
  //     {
  //       ...insumoAActualizar,
  //       stock: insumoAActualizar.stock + newCompra.cantidad,
  //     },
  //     "insumos"
  //   );
  // }
  revalidatePath("/compras");
  // TODO: persistir en tu DB...
  return { ok: true, error: null };
}

export async function createVentaAction(prevState, formData, isEditing, id) {
  const session = await auth();
  if (!session) return { ok: false, error: "Tenés que estar logueado." };
  const clienteId = Number(formData.get("cliente"));
  const impresionId = Number(formData.get("impresion"));
  const cantidad = Number(formData.get("cantidad"));
  const observaciones = String(formData.get("observaciones"));
  // const precio_unitario_sugerido = Number(
  //   formData.get("precio_unitario_sugerido")
  // );
  // const precio_unitario_final = Number(formData.get("precio_unitario_final"));
  const fecha_entrega = Date(formData.get("fecha_entrega"));
  // const precio_unitario_sugerido = cotizarImpresion(impresionId);

  const newVenta = {
    clienteId,
    impresionId,
    cantidad,
    observaciones,
    precio_unitario_sugerido,
    // precio_unitario_final: precio_unitario_final || 0,
    precio_total_venta: precio_unitario_sugerido * cantidad,
    fecha_entrega,
  };

  if (!isEditing) {
    await createRegister(newVenta, "ventas");
  } else {
    await updateRegister(id, newVenta, "ventas");
  }

  revalidatePath("/ventas");
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
  // const stock = Number(formData.get("stockInicial"));

  const newInsumo = {
    caracteristica,
    proveedorId,
    marcaId,
    categoriaId,
    codigo_insumo,
    nombre_insumo,
    unidad_medida,
    stock: 0,
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

export async function createModeloAction(prevState, formData, isEditing, id) {
  const session = await auth();
  if (!session) return { ok: false, error: "Tenés que estar logueado." };

  const nombre_modelo = String(formData.get("nombre"));
  const categoriaId = Number(formData.get("categoria"));
  const fuente = String(formData.get("fuente"));
  const url_link = String(formData.get("url"));
  const image = formData.get("image");

  const newModelo = {
    nombre_modelo,
    categoriaId,
    fuente,
    url_link,
  };
  if (!categoriaId || !nombre_modelo) {
    return { ok: false, error: "No se pudo crear el modelo" };
  }

  if (!isEditing) {
    const modeloCreado = await createRegister(newModelo, "modelos");
    const newModeloConImagen = await uploadModelImage(modeloCreado, image);

    await updateRegister(modeloCreado.id, newModeloConImagen, "modelos");
  } else {
    let modeloActualizar;
    if (image.name === "undefined") {
      modeloActualizar = newModelo;
    } else {
      modeloActualizar = await uploadModelImage(newModelo, image);
    }

    const elmodelospost = await updateRegister(id, modeloActualizar, "modelos");
  }

  revalidatePath("/modelos");
  return { ok: true, error: null };
}

export async function deleteAction(keyword, id) {
  const session = await auth();

  if (!session) throw new Error("No estas autorizado");

  if (keyword === "compras") {
    const compra = await getCompraById(id);

    const insumo = await getInsumoById(compra.insumoId);
    if (insumo.stock - compra.cantidad < 0) {
      throw new Error("El stock restante no puede ser menor a 0");
    }

    const actualizado = await updateRegister(
      compra.insumoId,
      {
        ...insumo,
        stock: insumo.stock - compra.cantidad,
      },
      "insumos"
    );

    if (!actualizado)
      throw new Error(
        "No se pudo actualizar el stock antes de eliminar la compra"
      );
  }

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
