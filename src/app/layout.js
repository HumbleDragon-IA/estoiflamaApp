import { Josefin_Sans } from "next/font/google";
import Script from "next/script";
import "./_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { auth } from "./_lib/auth";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: {
    template: "%s - EstoiFlama",
    default: "Welcome - EstoiFlama",
  },
  description: "",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="es" suppressHydrationWarning>
      {/* Script externo, corre ANTES de hidratar */}
      <head>
        <Script src="/theme-init.js" />
      </head>

      <body
        className={`${josefin.variable}   grid grid-rows-[auto_1fr_auto]
        bg-background text-foreground font-sans antialiased  `}
      >
        <Header />
        <main
          className={`container mx-auto max-w-dvw min-h-full max-h-dvh min-w-full sm:px-6 lg:px-4 ${
            session?.user ? "py-6" : ""
          } `}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
