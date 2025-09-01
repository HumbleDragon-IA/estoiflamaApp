import { ChevronLeftIcon } from "@heroicons/react/24/solid";
const compareString = (string, arr) => {
  return arr.some((value) => value === string);
};

const nombreTablas = ["impresion", "insumos"];

export function generateTableData(array, nombreTabla) {
  // reccorrer el array y separar las keys como headers viendo si tiene mas objetos adentro
  //   console.log(Object.entries(array), "ENTRIEs");
  const headers = Object.entries(array[0]).map((ent) => ent[0]);
  const header2 = [...headers];
  const row2 = [];
  Object.entries(array).forEach(([key, value]) => {
    let newRow;

    if (typeof value === "object") {
      newRow = { ...newRow, id: value.id };
      Object.entries(value).forEach(([key2, value2]) => {
        if (typeof value2 === "object") {
          Object.entries(value2).forEach(([key3, value3]) => {
            if (typeof value3 === "object") {
              Object.entries(value3).forEach(([key4, value4]) => {
                if (typeof value4 === "object") {
                  Object.entries(value4).forEach(([key5, value5]) => {
                    if (typeof value5 === "object") {
                    } else {
                      if (
                        !compareString(key5, header2) &&
                        !compareString(key5, nombreTablas)
                      ) {
                        header2.push(key5);
                      }
                      newRow = { ...newRow, [key5]: value5 };
                    }
                  });
                } else {
                  if (
                    !compareString(key4, header2) &&
                    !compareString(key4, nombreTablas)
                  ) {
                    header2.push(key4);
                  }
                  newRow = { ...newRow, [key4]: value4 };
                }
              });
            } else {
              if (
                !compareString(key3, header2) &&
                !compareString(key3, nombreTablas)
              ) {
                header2.push(key3);
              }
              newRow = { ...newRow, [key3]: value3 };

              // row2.push(value3);
            }
          });
        } else {
          if (
            !compareString(key2, header2) &&
            !compareString(key2, nombreTablas)
          ) {
            header2.push(key2);
          }
          newRow = { ...newRow, [key2]: value2 };

          // row2.push(value2);
        }
      });
      // return
    } else {
      if (!compareString(key, header2) && compareString(key, nombreTablas)) {
        header2.push(key);
      }
      newRow = { ...newRow, [key]: value };
      // row2.push(value);
    }
    row2.push(newRow);
  });

  const headers3 = header2.filter((head) => !compareString(head, nombreTablas));

  return { headers3, row2 };
}

export function replaceUnderscore(string) {
  return string.replaceAll("_", " ");
}

export function formatPrecio(numero, locale = "es-AR") {
  return new Intl.NumberFormat(locale, {
    // style: "currency",
    // currency: moneda,
    minimumFractionDigits: 2,
  }).format(numero);
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
  console.log(data, "EN FILTER antes de filtrar");

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
