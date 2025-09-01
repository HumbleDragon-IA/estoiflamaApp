import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { filterDataForImpresiones } from "../_lib/auxiliar";
import {
  getCalidadesModelos,
  getImpresiones,
  getModelos,
  getPedidos,
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
  const impresionesFiltradas = filterDataForImpresiones(impresiones);

  const extraData = [modelos, calidades, tamaños, pedidos];
  if (session?.user) {
    return (
      <div className="min-w-full max-w-dvw">
        <Tabla
          data={impresionesFiltradas}
          extraData={extraData}
          nombreTabla="Impresiones"
        ></Tabla>
      </div>
    );
  } else {
    return <div>Logueate primero</div>;
  }
}

export default page;
