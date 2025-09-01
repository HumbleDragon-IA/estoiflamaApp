import { auth, signIn } from "../_lib/auth.js";
import Logo from "./Logo";
import NavBar from "./NavBar";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link.js";
async function Header() {
  // await signIn("lucasbenvin87@gmail.com");
  const session = await auth();

  return (
    <header className="bg-stone-900 text-stone-200 border-b border-border pt-[env(safe-area-inset-top)] min-w-full max-w-dvw">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between min-w-full max-w-dvw">
        <Logo />

        <div className="flex items-center gap-4">
          {session?.user?.image ? (
            <div id="navbar" className="flex gap-4 items-center">
              <NavBar user={session.user} />
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <Link href="/login">Login</Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
