import { ChevronLeftIcon } from "@heroicons/react/24/solid";
const compareString = (string, arr) => {
  return arr.some((value) => value === string);
};

const nombreTablas = ["modelo", "categoria", "impresion", "cliente"];

export function generateTableData(array, nombreTabla) {
  // reccorrer el array y separar las keys como headers viendo si tiene mas objetos adentro
  //   console.log(Object.entries(array), "ENTRIEs");
  const headers = Object.entries(array[0]).map((ent) => ent[0]);
  const header2 = [...headers];
  const row2 = [];
  const prueba = Object.entries(array).forEach(([key, value]) => {
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
                        console.log(key5, "key5");
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
                    console.log(key4, "key4");
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
                console.log(key3, "key3");
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
            console.log(key2, "key2");
            header2.push(key2);
          }
          newRow = { ...newRow, [key2]: value2 };

          // row2.push(value2);
        }
      });
      // return
    } else {
      if (!compareString(key, header2) && compareString(key, nombreTablas)) {
        console.log(key, "key");
        header2.push(key);
      }
      newRow = { ...newRow, [key]: value };
      // row2.push(value);
    }
    console.log(newRow, "A VER ACA");
    row2.push(newRow);
  });

  const headers3 = header2.filter((head) => !compareString(head, nombreTablas));
  // console.log(headers3, row2[0], "array q sale");
  return { headers3, row2 };
}
