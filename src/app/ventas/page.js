import ContainerTable from "../_components/ContainerTable";
import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import {
  filterDataForImpresiones,
  filterDataForModelos,
  filterDataForVentas,
} from "../_lib/auxiliar";
import {
  getAllDetalleGastos,
  getCalidadesModelos,
  getCategoriasModelos,
  getImpresiones,
  getModelos,
  getPedidos,
  getStocks,
  getTamañosModelos,
  getVentas,
} from "../_lib/data-service";

export const metadata = {
  title: "Ventas",
};

async function page({ searchParams }) {
  const session = await auth();
  if (!session?.user) return null;
  const params = await searchParams;
  const viewRaw = params?.view;
  const view = typeof viewRaw === "string" ? viewRaw : "ventas";

  //data de modelos
  const modelos = await getModelos();
  const modelosFiltrados = filterDataForModelos(modelos);
  const categoriasModelos = await getCategoriasModelos();

  //data de impresiones
  const impresiones = await getImpresiones();
  const impresionesFiltradas = filterDataForImpresiones(impresiones);
  const calidades = await getCalidadesModelos();
  const tamaños = await getTamañosModelos();
  const pedidos = await getPedidos();
  const insumos = await getStocks();
  const allDetalleGastos = await getAllDetalleGastos();

  const ventas = await getVentas();
  const ventasFiltradas = filterDataForVentas(ventas);

  return (
    <div>
      <ContainerTable section={"ventas"}>
        {view.toLowerCase() === "ventas" && (
          <div className="min-w-full max-w-dvw">
            <Tabla data={ventasFiltradas} nombreTabla={"Ventas"}></Tabla>
          </div>
        )}

        {view.toLowerCase() === "impresiones" && (
          <div className="min-w-full max-w-dvw">
            <Tabla
              data={impresionesFiltradas}
              nombreTabla={"Impresiones"}
              extraData={[modelos, calidades, tamaños, pedidos, insumos]}
              detalleFilamentos={allDetalleGastos}
              detalleInsumos={insumos}
              options={[
                "Editar",
                "Eliminar",
                "Ver Detalle",
                "Registrar Detalle",
              ]}
            ></Tabla>
          </div>
        )}
        {view.toLowerCase() === "modelos" && (
          <div className="min-w-full max-w-dvw">
            <Tabla
              data={modelosFiltrados}
              nombreTabla={"Modelos"}
              extraData={[categoriasModelos]}
              options={["Editar", "Eliminar"]}
            ></Tabla>
          </div>
        )}
      </ContainerTable>
    </div>
  );
}

export default page;
