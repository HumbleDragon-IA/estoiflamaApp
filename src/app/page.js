import Header from "./_components/Header";
import { auth } from "./_lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session?.user
        ? `Bienvenido ${session.user.name.split(" ")[0]}`
        : "Logueate primero"}
    </div>
  );
}
