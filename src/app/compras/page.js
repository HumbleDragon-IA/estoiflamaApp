import ContainerTable from "../_components/ContainerTable";
import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { filterDataForCompras, filterDataForInsumos } from "../_lib/auxiliar";
import {
  getCategoriasInsumos,
  getComprasInsumos,
  getMarcasInsumos,
  getProveedores,
  getStocks,
} from "../_lib/data-service";

export const metadata = {
  title: "Compras Insumos",
};

async function page({ searchParams }) {
  const session = await auth();
  if (!session?.user) return null;
  const params = await searchParams;
  const viewRaw = params?.view;
  const view = typeof viewRaw === "string" ? viewRaw : "compras";

  const compras = await getComprasInsumos();
  const comprasFiltradas = filterDataForCompras(compras);

  const proveedores = await getProveedores();
  const marcas = await getMarcasInsumos();
  const categorias = await getCategoriasInsumos();

  const insumos = await getStocks();
  const insumosFiltrados = filterDataForInsumos(insumos);

  return (
    <div>
      <ContainerTable section={"compras"}>
        {view.toLowerCase() === "compras" && (
          <div className="min-w-full max-w-dvw">
            <Tabla
              data={comprasFiltradas}
              nombreTabla={"Compras"}
              extraData={[insumosFiltrados]}
              options={["Editar", "Eliminar"]}
            ></Tabla>
          </div>
        )}
        {view.toLowerCase() === "insumos" && (
          <div className="min-w-full max-w-dvw">
            <Tabla
              data={insumosFiltrados}
              nombreTabla={"Insumos"}
              extraData={[proveedores, marcas, categorias]}
              options={["Editar", "Eliminar"]}
            ></Tabla>
          </div>
        )}
      </ContainerTable>
    </div>
  );
}

export default page;
