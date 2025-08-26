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
  console.log(data, "ENTRE EN GET USER");
  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getImpresionbyId(id) {
  const { data, error } = await supabase
    .from("impresiones")
    .select(
      "id, tiempoImpresion, cantidadesPorImpresion, modeloId, modelos: modelos(categoriaId,nombre ,categoria:categoriaModelos(id, nombre)), materialesUtilizados:tableDetalleGastoFilamento(id,filamentoId,modelo, filamento: insumos(id, codigo, nombre,caracteristica,unidadMedida, proveedorId, marcaId, categoriaId,categoria:categoriaDeInsumos(id, nombre) ,proveedor:proveedor(id, razonSocial),marca: marcaDeInsumos(id,nombre))) "
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
      "id, tiempoImpresion, cantidadesPorImpresion, modeloId, modelos: modelos(categoriaId,nombre ,categoria:categoriaModelos(id, nombre)), materialesUtilizados:tableDetalleGastoFilamento(id,filamentoId,modelo, filamento: insumos(id, codigo, nombre,caracteristica,unidadMedida, proveedorId, marcaId, categoriaId,categoria:categoriaDeInsumos(id, nombre) ,proveedor:proveedor(id, razonSocial),marca: marcaDeInsumos(id,nombre))) "
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
      "id, tiempoImpresion, cantidadesPorImpresion, modeloId, modelos: modelos(categoriaId,nombre ,categoria:categoriaModelos(id, nombre)), materialesUtilizados:tableDetalleGastoFilamento(id,filamentoId,modelo, filamento: insumos(id, codigo, nombre,caracteristica,unidadMedida, proveedorId, marcaId, categoriaId,categoria:categoriaDeInsumos(id, nombre) ,proveedor:proveedor(id, razonSocial),marca: marcaDeInsumos(id,nombre)))  "
    )
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  console.log(JSON.stringify(data, null, 2));
  return data;
};

//POST
// getImpresiones();
// console.log("hola");
// getImpresionbyModeloId(1);
// getImpresionbyId(2);
// getImpresionbyId(3);

export async function createImpresion(newImpresion) {
  const { data, error } = await supabase
    .from("impresiones")
    .insert([newImpresion]);

  if (error) {
    console.error(error.message);
    throw new Error("Guest could not be created");
  }
  console.log(data);
  return data;
}
export async function createDetalleGastos(detalleGastos) {
  const { data, error } = await supabase
    .from("tableDetalleGastoFilamento")
    .insert(detalleGastos);

  if (error) {
    console.error(error.message);
    throw new Error("Guest could not be created");
  }
  console.log(data);
  return data;
}

// const detalleGastos = [
//   {
//     modelo: 40,
//     soporte: 0,
//     expulsado: 0,
//     torre: 0,
//     filamentoId: 5,
//     impresionId: 2,
//   },
//   {
//     modelo: 40,
//     soporte: 0,
//     expulsado: 0,
//     torre: 0,
//     filamentoId: 1,
//     impresionId: 2,
//   },
// ];

// createDetalleGastos(detalleGastos);
