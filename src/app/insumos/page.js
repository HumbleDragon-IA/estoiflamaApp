import CrearModeloForm from "../_components/CrearModeloForm";
import Modal from "../_components/Modal";
import Tabla from "../_components/Tabla";
import { auth } from "../_lib/auth";
import { filterDataForInsumos } from "../_lib/auxiliar";
import {
  getCategoriasInsumos,
  getMarcasInsumos,
  getProveedores,
  getStocks,
} from "../_lib/data-service";

export const metadata = {
  title: "Stocks",
};

async function page() {
  const session = await auth();
  const proveedores = await getProveedores();
  const marcas = await getMarcasInsumos();
  const categorias = await getCategoriasInsumos();
  const insumos = await getStocks();
  const insumosFiltrados = filterDataForInsumos(insumos);
  const extraData = [proveedores, marcas, categorias];

  if (!session?.user) return null;

  return (
    <div className="min-w-full max-w-dvw ">
      <Tabla
        data={insumosFiltrados}
        extraData={extraData}
        nombreTabla="Insumos"
      ></Tabla>
    </div>
  );
}

export default page;
