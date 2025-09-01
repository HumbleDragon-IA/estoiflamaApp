import Link from "next/link";
import { auth } from "./_lib/auth";
import Image from "next/image";
export default async function Home() {
  const session = await auth();

  return (
    <div className=" relative  w-screen h-screen">
      {session?.user ? (
        `Bienvenido ${session.user.name.split(" ")[0]}`
      ) : (
        <Link href="/login">
          <Image
            className="object-contain"
            src="/logo2.png"
            fill
            alt="logo"
          ></Image>
        </Link>
      )}
    </div>
  );
}
