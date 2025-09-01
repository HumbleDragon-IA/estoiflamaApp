import { supabase } from "./supabase.js";
import { auth } from "./auth.js";
//GET
// const session = await auth();
// console.log(session);

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
      "modelo: modelos(categoriaId,nombre_modelo ,categoria:categoria_modelos( nombre_categoria_modelo)) ,id, tiempo_impresion, cantidades_por_impresion, modeloId, tamañoId,calidadId, tamaño:tamaño_enum( tamaño) , calidad: calidad_enum( calidad)"
      //  modelo: modelos(categoriaId,nombre ,categoria:categoriaModelos(id, nombre)), materialesUtilizados:tableDetalleGastoFilamento(id,filamentoId,modelo, filamento: insumos(id, codigo, nombre,caracteristica,unidadMedida, proveedorId, marcaId, categoriaId,categoria:categoriaDeInsumos(id, nombre) ,proveedor:proveedor(id, razonSocial),marca: marcaDeInsumos(id,nombre)))  "
    )
    .order("id");

  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be loaded");
  }
  // console.log(JSON.stringify(data, null, 4), "QONDA ACA");
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
      "id, cantidad, precio_unitario, descuento,total, numero_factura, fecha_compra, insumoId, insumos(nombre_insumo, unidad_medida, caracteristica,  categoria_insumo:categoria_de_insumos(nombre_categoria_insumo), marca_insumo:marca_de_insumos(nombre_marca_insumo))"
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
      "id, caracteristica, stock, proveedorId, marcaId, categoriaId, codigo_insumo, nombre_insumo"
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
  console.log(data, "en server");
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
  // console.log(data, "en server");
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
  // console.log(data, "en server");
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
  // console.log(data, "en server");
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
  // console.log(data, "en server");
  return data;
};

//POST
// getImpresiones();
// // console.log("hola");
// // getImpresionbyModeloId(1);
// getImpresionbyId(2);
// getImpresionbyId(3);

export async function createImpresion(newImpresion) {
  const { data, error } = await supabase
    .from("impresiones")
    .insert([newImpresion]);
  console.log(newImpresion, " aver como viene");
  if (error) {
    console.error(error.message);
    throw new Error("Impresion could not be created");
  }
  console.log(data);
  return data;
}
export async function createModelo(newModelo) {
  const { data, error } = await supabase.from("modelos").insert([newModelo]);
  console.log(newModelo, " aver como viene el modelo en data services");
  if (error) {
    console.error(error.message);
    throw new Error("Modelo could not be created");
  }
  console.log(data, "modelo en service");
  return data;
}

export async function createDetalleGastos(detalleGastos) {
  const { data, error } = await supabase
    .from("tableDetalleGastoFilamento")
    .insert(detalleGastos);
  console.log(error);
  if (error) {
    console.error(error.message);
    throw new Error("Guest could not be created");
  }
  console.log(data, "LA DATA ES");
  return data;
}
