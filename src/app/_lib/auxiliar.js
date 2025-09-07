import { ChevronLeftIcon } from "@heroicons/react/24/solid";
const compareString = (string, arr, nombreTabla = "") => {
  if (nombreTabla.toLowerCase() !== "detallegastos") {
    return arr.some((value) => value === string);
  } else {
    return true;
  }
};

const nombreTablas = ["impresion", "insumos"];

export function generateTableData(array, nombreTabla) {
  const headers =
    array.length > 0 ? Object.entries(array[0]).map((ent) => ent[0]) : [];
  const header2 = [...headers];

  const headers3 = header2.filter((head) => !compareString(head, nombreTablas));

  return { headers3 };
}

export function replaceUnderscore(string) {
  return string.replaceAll("_", " ");
}

export function formatPrecio(numero, locale = "es-AR") {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(numero);
}
export function filterDetalleGastoByImpresionId(impresionId, detallesGastos) {
  return detallesGastos
    .filter((detalle) => detalle.impresionId === impresionId)
    .map((det) => {
      return {
        id: det.id,
        impresionId: det.impresionId,
        costo_modelo: det.costo_modelo,
        costo_soporte: det.costo_soporte,
        costo_expulsado: det.costo_expulsado,
        costo_torre: det.costo_torre,
        nombreFilamento: det.filamento.nombre_insumo,
        colorFilamento: det.filamento.caracteristica.split(": ")[1],
      };
    });
}

export function filterDataForImpresiones(data) {
  const newData = data.map((dat) => {
    return {
      id: dat.id,
      modelo: dat.modelo.nombre_modelo,
      modeloId: dat.modeloId,
      categoria_modelo: dat.modelo.categoria.nombre_categoria_modelo,
      calidad: dat.calidad.calidad,
      calidadId: dat.calidadId,
      tamaño: dat.tamaño.tamaño,
      tamañoId: dat.tamañoId,
      tiempo: dat.tiempo_impresion,
      cantidad: dat.cantidades_por_impresion,
    };
  });

  return newData;
}
export function filterDataForDetalleGastos(data) {
  const newData = data.map((dat) => {
    return { id: dat.id, impresionId: dat.impresionId };
  });

  return newData;
}

export function filterDataForModelos(data) {
  const newData = data.map((dat) => {
    return {
      id: dat.id,
      nombre: dat.nombre_modelo,
      categoriaId: dat.categoria.categoriaId,
      categoria: dat.categoria.nombre_categoria_modelo,
    };
  });

  return newData;
}

export function filterDataForVentas(data) {
  const newData = data.map((dat) => {
    return {
      id: dat.id,
      clienteId: dat.clienteId,
      cliente: dat.cliente.nombre_cliente,
      impresionId: dat.impresionId,
      modelo: dat.impresion.modelo.nombre_modelo,
      calidad: dat.impresion.calidad.calidad,
      tamaño: dat.impresion.tamaño.tamaño,
      cantidad: dat.cantidad,
      precio_unitario: formatPrecio(dat.precio_unitario_final),
      total: formatPrecio(dat.precio_total_venta),
      fecha: parseFecha(dat.fecha_entrega),
      obs: dat.observaciones,
    };
  });

  return newData;
}
export function filterDataForCompras(data) {
  const newData = data.map((dat) => {
    return {
      id: dat.id,
      insumoId: dat.insumoId,
      nombre:
        `${
          dat.insumos.categoria_insumo.nombre_categoria_insumo === "Filamento"
            ? dat.insumos.nombre_insumo.slice(0, 3)
            : dat.insumos.nombre_insumo
        }` +
        " - " +
        dat.insumos.marca_insumo.nombre_marca_insumo +
        " - " +
        `${
          dat.insumos.categoria_insumo.nombre_categoria_insumo === "Filamento"
            ? "color: " + dat.insumos.caracteristica.split(" ")[1]
            : dat.insumos.caracteristica
        }`,
      cantidad: dat.cantidad + " " + dat.insumos.unidad_medida,
      fecha: parseFecha(dat.fecha_compra),
      factura: dat.numero_factura,
      precio_unitario: formatPrecio(dat.precio_unitario),
      total: formatPrecio(dat.total),
      proveedor: dat.insumos.proveedor.razon_social,
    };
  });

  return newData;
}
export function parseFecha(fecha) {
  // fecha viene en formato "YYYY-MM-DD"
  const [year, month, day] = fecha.split("-");
  return `${day}-${month}-${year}`;
}
