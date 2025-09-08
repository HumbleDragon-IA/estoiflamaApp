import { supabase } from "./supabase.js";
import { auth } from "./auth.js";
//GET

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getImpresionbyId(id) {
  const { data, error } = await supabase
    .from("impresiones")
    .select(
      "id,modelo: modelos(categoriaId,nombre_modelo ,categoria:categoria_modelos( nombre_categoria_modelo)) , tiempo_impresion, cantidades_por_impresion, modeloId, tamañoId,calidadId, tamaño:tamaño_enum( tamaño) , calidad: calidad_enum( calidad)"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getImpresionbyModeloId(modeloId) {
  const { data, error } = await supabase
    .from("impresiones")
    .select(
      "id,modelo: modelos(categoriaId,nombre_modelo ,categoria:categoria_modelos( nombre_categoria_modelo)) , tiempo_impresion, cantidades_por_impresion, modeloId, tamañoId,calidadId, tamaño:tamaño_enum( tamaño) , calidad: calidad_enum( calidad)"
    )
    .eq("modeloId", modeloId)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getImpresiones = async function () {
  const { data, error } = await supabase
    .from("impresiones")
    .select(
      "modelo: modelos(categoriaId,nombre_modelo ,categoria:categoria_modelos( nombre_categoria_modelo)) ,id, tiempo_impresion, cantidades_por_impresion, modeloId, tamañoId,calidadId, tamaño:tamaño_enum( tamaño) , calidad: calidad_enum( calidad), detalleGastos: tabla_detalle_gasto_filamento(filamentoId, costo_modelo)"
    )
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const getVentas = async function () {
  const { data, error } = await supabase
    .from("ventas")
    .select(
      "id, clienteId, impresionId, cantidad, precio_unitario_sugerido, precio_unitario_final, precio_total_venta, fecha_entrega, observaciones, cliente:clientes(nombre_cliente), impresion:impresiones(modelo:modelos(nombre_modelo), tamaño:tamaño_enum(tamaño), calidad:calidad_enum(calidad))"
    )
    .order("id");
  if (error) {
    console.error(error.message);
    throw new Error("Ventas could not be loaded");
  }
  return data;
};

export const getComprasInsumos = async function () {
  const { data, error } = await supabase
    .from("compras_insumos")
    .select(
      "id, cantidad, precio_unitario, descuento,total, numero_factura, fecha_compra, insumoId, insumos(nombre_insumo,proveedorId, proveedor:proveedor(razon_social), unidad_medida, caracteristica,  categoria_insumo:categoria_de_insumos(nombre_categoria_insumo), marca_insumo:marca_de_insumos(nombre_marca_insumo))"
    )
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("compras could not be loaded");
  }
  return data;
};

export const getStocks = async function () {
  const { data, error } = await supabase
    .from("insumos")
    .select(
      "id, caracteristica, stock, proveedorId, marcaId, categoriaId, unidad_medida, categoriaInsumo:categoria_de_insumos(nombre_categoria_insumo), codigo_insumo, nombre_insumo, marca_de_insumos(nombre_marca_insumo)"
    )
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("compras could not be loaded");
  }
  return data;
};

export const getModelos = async function () {
  const { data, error } = await supabase
    .from("modelos")
    .select(
      "id, nombre_modelo, categoriaId, categoria:categoria_modelos(nombre_categoria_modelo)"
    )
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("Modelos could not be loaded");
  }
  return data;
};
export const getTamañosModelos = async function () {
  const { data, error } = await supabase
    .from("tamaño_enum")
    .select("id, tamaño, coeficiente_tamaño")
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("tamaños could not be loaded");
  }

  return data;
};

export const getCalidadesModelos = async function () {
  const { data, error } = await supabase
    .from("calidad_enum")
    .select("id, calidad, coeficiente_calidad")
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("calidades could not be loaded");
  }

  return data;
};

export const getCategoriasModelos = async function () {
  const { data, error } = await supabase
    .from("categoria_modelos")
    .select("id, nombre_categoria_modelo")
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("Categorias Modelos could not be loaded");
  }

  return data;
};

export const getPedidos = async function () {
  const { data, error } = await supabase
    .from("pedidos")
    .select("id,modeloId, clienteId,calidadId,tamañoId")
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("pedidos could not be loaded");
  }

  return data;
};

export const getAllDetalleGastos = async function () {
  const { data, error } = await supabase
    .from("tabla_detalle_gasto_filamento")
    .select(
      "id, impresionId, costo_modelo, costo_soporte, costo_expulsado, costo_torre, filamento:insumos(caracteristica, nombre_insumo)"
    );

  if (error) {
    console.error(error);
  }
  return data;
};

export const getCategoriasInsumos = async function () {
  const { data, error } = await supabase
    .from("categoria_de_insumos")
    .select("id, nombre_categoria_insumo")
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("categorias could not be loaded");
  }

  return data;
};

export const getMarcasInsumos = async function () {
  const { data, error } = await supabase
    .from("marca_de_insumos")
    .select("id, nombre_marca_insumo")
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("marcas could not be loaded");
  }

  return data;
};

export const getProveedores = async function () {
  const { data, error } = await supabase
    .from("proveedor")
    .select(
      "id,cuit, categoria, telefono, email,domicilio,razon_social, persona_contacto"
    )
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("proveedores could not be loaded");
  }

  return data;
};

export async function createRegister(newData, table) {
  const { data, error } = await supabase.from(table).insert(newData);
  if (error) {
    console.error(error.message);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function updateRegister(id, updatedImpresion, keyword) {
  const { data, error } = await supabase
    .from(`${keyword}`)
    .update(updatedImpresion)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("no se pudo actualizar");
  }

  return data;
}

///////////////////DELETE//////////////////////

export async function deleteRegister(keyword, id) {
  const { data, error } = await supabase.from(keyword).delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`${keyword} no se pudo eliminar`);
  }
  return data;
}
