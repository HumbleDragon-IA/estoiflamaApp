import { ChevronLeftIcon } from "@heroicons/react/24/solid";
const compareString = (string, arr) => {
  return arr.some((value) => value === string);
};

const nombreTablas = ["modelo", "categoria", "impresion", "cliente", "insumos"];

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
