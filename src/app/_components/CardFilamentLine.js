function CardFilamentLine({ filamento }) {
  const sum =
    filamento.costo_modelo +
    filamento.costo_soporte +
    filamento.costo_expulsado +
    filamento.costo_torre;

  return (
    <div>
      <h2>Filamento {filamento.insumo.nombre_insumo.split(" ")[1]}</h2>
      <span>
        {String(sum).split(".")[0]}.{String(sum).split(".")[1].slice(0, 2)}
      </span>
    </div>
  );
}

export default CardFilamentLine;
