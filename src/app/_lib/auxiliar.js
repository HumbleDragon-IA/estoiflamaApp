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

export function filterDataForInsumos(data) {
  const newData = data.map((dat) => {
    return {
      id: dat.id,
      categoriaId: dat.categoriaId,
      codigo: dat.codigo_insumo,
      nombre: dat.nombre_insumo,
      marca: dat.marca_de_insumos.nombre_marca_insumo,
      caracteristica: dat.caracteristica,
      categoria_insumo: dat.categoriaInsumo.nombre_categoria_insumo,
      stock: dat.stock,
      unidadMedida: dat.unidad_medida,
    };
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
      fuente: dat.fuente,
      url: dat.url_link,
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
      fecha: parseFecha(dat.fecha_compra),
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
      cantidad: dat.cantidad,
      precio_unitario: dat.precio_unitario,
      descuento: dat.descuento,
      total: dat.total,
      factura: dat.numero_factura,
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

export function invertParseFecha(val) {
  const s = String(val).trim();

  // ISO con hora -> recortamos
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return s.slice(0, 10);

  // ISO puro
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

  // dd-mm-yyyy o dd/mm/yyyy
  const m1 = s.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
  if (m1) {
    const [, dd, mm, yyyy] = m1;
    return `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(
      2,
      "0"
    )}`;
  }
}
