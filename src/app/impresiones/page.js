import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import {
  filterDataForImpresiones,
  filterDetalleGastoByImpresionId,
} from "../_lib/auxiliar";
import {
  getAllDetalleGastos,
  getCalidadesModelos,
  getImpresiones,
  getModelos,
  getPedidos,
  getStocks,
  getTamañosModelos,
} from "../_lib/data-service";

export const metadata = {
  title: "Impresiones",
};

async function page() {
  const session = await auth();
  const impresiones = await getImpresiones();
  const modelos = await getModelos();
  const calidades = await getCalidadesModelos();
  const tamaños = await getTamañosModelos();
  const pedidos = await getPedidos();
  const insumos = await getStocks();
  const allDetalleGastos = await getAllDetalleGastos();
  const impresionesFiltradas = filterDataForImpresiones(impresiones);
  const extraData = [modelos, calidades, tamaños, pedidos, insumos];

  if (session?.user) {
    return (
      <div className="min-w-full max-w-dvw ">
        <Tabla
          data={impresionesFiltradas}
          extraData={extraData}
          nombreTabla="Impresiones"
          detalleFilamentos={allDetalleGastos}
          detalleInsumos={insumos}
        ></Tabla>
      </div>
    );
  } else {
    return <div>Logueate primero</div>;
  }
}

export default page;
