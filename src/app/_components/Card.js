import { getImpresionbyId, getModeloById } from "../_lib/data-service";
import CardFeatures from "./CardFeatures";
import CardFilamentCost from "./CardFilamentCost";
import CardHeader from "./CardHeader";
import CardTitle from "./CardTitle";
import MenuButton2 from "./MenuButton2";
import ModelImage from "./ModelImage";

async function Card({ impresion, nombreTabla, options }) {
  // const impresion = await getImpresionbyId(2);
  // console.log(impresion, "LA IMPRESON");

  return (
    <div className="bg-stone-800 flex flex-col w-md 2xl:w-6xl xl:w-2xl max-w-dvw px-4 py-6 rounded-xl mx-auto gap-4 mb-2 border-2 shadow-md/80 shadow-stone-300 hover:shadow-2xl hover:shadow-stone-100 ">
      <CardHeader impresion={impresion}>
        <CardTitle>{impresion.modelo.nombre_modelo}</CardTitle>
        <MenuButton2
          rowData={impresion}
          nombreTabla={nombreTabla}
          options={options}
        ></MenuButton2>
      </CardHeader>
      <>
        <div className="flex gap-6">
          <ModelImage model={impresion.modelo}></ModelImage>
          <CardFeatures impresion={impresion}></CardFeatures>
        </div>
        {nombreTabla.toLowerCase() === "impresiones" && (
          <CardFilamentCost
            arrayFilamentos={impresion.detalleGastos}
          ></CardFilamentCost>
        )}
      </>
    </div>
  );
}

export default Card;
