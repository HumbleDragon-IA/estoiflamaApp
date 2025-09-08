import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { filterDataForCompras, filterDataForInsumos } from "../_lib/auxiliar";
import { getComprasInsumos, getStocks } from "../_lib/data-service";

export const metadata = {
  title: "Compras Insumos",
};

async function page() {
  const session = await auth();
  const compras = await getComprasInsumos();
  if (!session?.user) return null;

  const comprasFiltradas = filterDataForCompras(compras);
  const insumos = await getStocks();
  const insumosFiltrados = filterDataForInsumos(insumos);
  const extraData = [insumosFiltrados];
  return (
    <div>
      <Tabla
        data={comprasFiltradas}
        nombreTabla={"Compras"}
        extraData={extraData}
      ></Tabla>
    </div>
  );
}

export default page;
