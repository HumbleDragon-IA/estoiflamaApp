// app/_components/Logo.jsx
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <Image
        src="/logo2.png"
        width={40}
        height={40}
        alt="EstoiFlama"
        priority
        sizes="40px"
        className="rounded"
      />
      <span className="font-semibold tracking-wide">EstoiFlama</span>
    </Link>
  );
}

export default Logo;
