import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { getImpresiones } from "../_lib/data-service";

export const metadata = {
  title: "Impresiones",
};

async function page() {
  const session = await auth();
  const impresiones = await getImpresiones();
  if (session?.user) {
    return (
      <div>
        Impresiones
        <Tabla data={impresiones} nombreTabla="Impresiones"></Tabla>
      </div>
    );
  } else {
    return <div>Logueate primero</div>;
  }
}

export default page;
