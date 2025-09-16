import CardTitle from "../_components/CardTitle";
import ContainerTable from "../_components/ContainerTable";

import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { filterDataForModelos, filterDataForVentas } from "../_lib/auxiliar";
import {
  getCategoriasModelos,
  getClientes,
  getImpresiones,
  getModelos,
  getVentas,
} from "../_lib/data-service";
import CardList from "../_components/CardList";

export const metadata = {
  title: "Ventas",
};
// mejor codigo filter
async function page({ searchParams }) {
  const session = await auth();
  if (!session?.user) return null;
  const params = await searchParams;
  const viewRaw = params?.view;
  const view = typeof viewRaw === "string" ? viewRaw : "ventas";

  //data de modelos
  const modelos = await getModelos();

  const impresiones = await getImpresiones();

  const ventas = await getVentas();
  const ventasFiltradas = filterDataForVentas(ventas);
  const clientes = await getClientes();

  return (
    <div className="mx-auto">
      <ContainerTable section={"ventas"}>
        {view.toLowerCase() === "ventas" && (
          <div className="min-w-full max-w-dvw">
            <Tabla
              data={ventasFiltradas}
              nombreTabla={"Ventas"}
              extraData={[impresiones, clientes]}
            ></Tabla>
          </div>
        )}

        {view.toLowerCase() === "impresiones" && (
          <div className="min-w-full max-w-dvw bg-stone-900">
            <CardList
              array={impresiones}
              nombreTabla={"impresiones"}
            ></CardList>
          </div>
        )}
        {view.toLowerCase() === "modelos" && (
          <div className="min-w-full max-w-dvw">
            <CardList array={impresiones} nombreTabla={"modelos"}></CardList>
          </div>
        )}
      </ContainerTable>
    </div>
  );
}

export default page;
