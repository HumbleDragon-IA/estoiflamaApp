import Card from "./Card";
import CardFeatures from "./CardFeatures";
import CardFilamentCost from "./CardFilamentCost";
import CardHeader from "./CardHeader";
import CardTitle from "./CardTitle";
import ModelImage from "./ModelImage";

function CardList({ array, nombreTabla }) {
  return (
    <div className="pt-6 flex flex-col max-w-dvw gap-2">
      {array.map((impresion) => (
        <Card
          key={impresion.id}
          nombreTabla={nombreTabla}
          impresion={impresion}
          options={["Editar", "Eliminar"]}
        ></Card>
      ))}
    </div>
  );
}

export default CardList;
