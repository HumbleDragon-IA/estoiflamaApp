import { auth } from "../_lib/auth";

export const metadata = {
  title: "Impresiones",
};

async function page() {
  const session = await auth();

  if (session?.user) {
    return <div>Impresiones</div>;
  } else {
    return <div>Logueate primero</div>;
  }
}

export default page;
