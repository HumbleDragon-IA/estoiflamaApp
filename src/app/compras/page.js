import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { filterDataForCompras } from "../_lib/auxiliar";
import { getComprasInsumos } from "../_lib/data-service";

export const metadata = {
  title: "Compras Insumos",
};

async function page() {
  const session = await auth();
  const compras = await getComprasInsumos();
  if (!session?.user) return null;

  const comprasFiltradas = filterDataForCompras(compras);
  console.log(comprasFiltradas);
  return (
    <div>
      <Tabla data={comprasFiltradas} nombreTabla={"Compras Insumos"}></Tabla>
    </div>
  );
}

export default page;
