import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { filterDataForModelos } from "../_lib/auxiliar";
import { getCategoriasModelos, getModelos } from "../_lib/data-service";

export const metadata = {
  title: "Modelos",
};

async function page() {
  const modelos = await getModelos();
  const categoriasModelos = await getCategoriasModelos();
  const session = await auth();
  const extraData = [categoriasModelos];
  const modelosFiltrados = filterDataForModelos(modelos);

  if (!session?.user) return null;
  return (
    <div className="min-w-full max-w-dvw">
      <Tabla
        nombreTabla="Modelos"
        data={modelosFiltrados}
        extraData={extraData}
      ></Tabla>
    </div>
  );
}

export default page;
