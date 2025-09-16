import CardFeatureLine from "./CardFeatureLine";

function CardFeatures({ impresion }) {
  return (
    <div className="   flex flex-col gap-1 pt-2">
      <h2 className="text-2xl font-extrabold">Caracteristicas</h2>
      <CardFeatureLine label={"Categoria"}>
        {impresion.modelo.categoria.nombre_categoria_modelo}
      </CardFeatureLine>
      <CardFeatureLine label={"Tamaño"}>
        {impresion.tamaño.tamaño}
      </CardFeatureLine>
      <CardFeatureLine label={"Calidad"}>
        {impresion.calidad.calidad}
      </CardFeatureLine>
      <CardFeatureLine label={"Tiempo Impresion"}>
        {impresion.tiempo_impresion} hs
      </CardFeatureLine>
      <CardFeatureLine label={"Unidades Impresas"}>
        {impresion.cantidades_por_impresion}
      </CardFeatureLine>
    </div>
  );
}

export default CardFeatures;
