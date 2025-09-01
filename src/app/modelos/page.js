import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { getCategoriasModelos, getModelos } from "../_lib/data-service";

export const metadata = {
  title: "Modelos",
};

async function page() {
  const modelos = await getModelos();
  const categoriasModelos = await getCategoriasModelos();
  const session = await auth();
  const extraData = [categoriasModelos];
  if (!session?.user) return null;
  return (
    <div>
      <Tabla nombreTabla="Modelos" data={modelos} extraData={extraData}></Tabla>
    </div>
  );
}

export default page;
