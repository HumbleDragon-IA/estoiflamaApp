import CardFilamentLine from "./CardFilamentLine";

function CardFilamentCost({ arrayFilamentos }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Materiales utilizados</h2>
      <div className="flex items-center gap-8">
        {arrayFilamentos.map((fil) => (
          <CardFilamentLine
            filamento={fil}
            key={fil.filamentoId}
          ></CardFilamentLine>
        ))}
      </div>
    </div>
  );
}

export default CardFilamentCost;
