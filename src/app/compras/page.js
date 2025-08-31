import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { getComprasInsumos } from "../_lib/data-service";

export const metadata = {
  title: "Compras Insumos",
};

async function page() {
  const session = await auth();
  const compras = await getComprasInsumos();
  if (!session?.user) return null;

  return (
    <div>
      <Tabla data={compras} nombreTabla={"Compras Insumos"}></Tabla>
    </div>
  );
}

export default page;
