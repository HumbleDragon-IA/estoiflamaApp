import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { filterDataForVentas } from "../_lib/auxiliar";
import { getVentas } from "../_lib/data-service";

export const metadata = {
  title: "Ventas",
};

async function page() {
  const session = await auth();
  const ventas = await getVentas();
  const ventasFiltradas = filterDataForVentas(ventas);
  console.log(ventasFiltradas);
  return (
    <div>
      <Tabla data={ventasFiltradas} nombreTabla={"Ventas"}></Tabla>
    </div>
  );
}

export default page;
