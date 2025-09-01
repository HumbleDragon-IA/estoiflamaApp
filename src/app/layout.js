import { Josefin_Sans } from "next/font/google";
import Script from "next/script";
import "./_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

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

export default function RootLayout({ children }) {
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
        <main className="container mx-auto min-w-dvw sm:px-6 lg:px-4 py-6 w-md sm:w-lg md:w-2xl lg:w-4xl xl:w-7xl  ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
