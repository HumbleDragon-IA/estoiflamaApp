import ActionButton from "./ActionButton";

function CrearImpresionForm() {
  const modelos = [
    { id: 1, nombre: "pikachu" },
    { id: 2, nombre: "joycon" },
    { id: 3, nombre: "labubu" },
  ];
  const tamaños = [
    { id: 1, nombre: "chiquito" },
    { id: 2, nombre: "mediano" },
    { id: 3, nombre: "grandote" },
  ];
  const calidades = [
    { id: 1, nombre: "baja" },
    { id: 2, nombre: "media" },
    { id: 3, nombre: "alta" },
  ];

  const pedidos = [1, 2, 3, 4, 5];
  return (
    <form className="bg-stone-600 py-8 px-12 text-lg flex gap-6 flex-col w-md rounded-2xl shadow-lg shadow-stone-800">
      <div className="space-y-2 flex flex-col w-xs  ">
        <label>Selecciona el modelo</label>
        <div className="flex justify-between items-center gap-2">
          <select className="w-3xs py-2 shadow-lg shadow-stone-800">
            <option></option>
            {modelos.map((modelo) => (
              <option
                name="modelo"
                defaultValue=""
                className="text-stone-700"
                key={modelo.id}
              >
                {modelo.nombre}
              </option>
            ))}
          </select>
          <ActionButton type="primary">+</ActionButton>
        </div>
      </div>

      <div className="space-y-2 flex flex-col w-xs ">
        <label>Selecciona el Tamaño</label>
        <select className="w-3xs py-2 shadow-lg shadow-stone-800">
          <option></option>
          {tamaños.map((tamaño) => (
            <option
              name="tamaño"
              defaultValue=""
              className="text-stone-700"
              key={tamaño.id}
            >
              {tamaño.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2 flex flex-col w-xs ">
        <label>Selecciona la calidad</label>
        <select className="w-3xs py-2 shadow-lg shadow-stone-800">
          <option></option>
          {calidades.map((calidad) => (
            <option
              name="calidad"
              defaultValue=""
              className="text-stone-700"
              key={calidad.id}
            >
              {calidad.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2 flex flex-col w-xs ">
        <label>Pedido Relacionado</label>
        <select className="w-3xs py-2 shadow-lg shadow-stone-800">
          <option></option>

          <option defaultValue={0} className="text-stone-700">
            No tiene
          </option>
          {pedidos.map((pedido) => (
            <option
              name="pedido"
              defaultValue=""
              className="text-stone-700 "
              key={pedido}
            >
              {pedido}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2 flex flex-col w-xs">
        <label>Ingrese cantidad de modelos a imprimir</label>
        <input
          defaultValue={0}
          name="cantidad"
          type="number"
          className="bg-stone-200 text-stone-600 w-3xs py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
        />
      </div>
      <div className="space-y-2 flex flex-col w-xs">
        <label>Ingrese (en minutos) la duracion total de la impresion</label>
        <input
          defaultValue={0}
          name="tiempo_impresion"
          type="number"
          className="bg-stone-200 text-stone-600  w-3xs py-2 px-3 rounded-2xl shadow-lg shadow-stone-800"
        />
      </div>
      <div className="flex justify-end gap-4 pt-4  w-sm">
        <ActionButton type="cancel">Cancelar</ActionButton>
        <ActionButton type="primary">Registrar</ActionButton>
      </div>
    </form>
  );
}

export default CrearImpresionForm;
