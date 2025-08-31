import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { getVentas } from "../_lib/data-service";

export const metadata = {
  title: "Ventas",
};

async function page() {
  const session = await auth();
  const ventas = await getVentas();
  return (
    <div>
      <Tabla data={ventas} nombreTabla={"Ventas"}></Tabla>
    </div>
  );
}

export default page;
