import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex-col flex gap-4 p-5 sm:flex-row">
        <Link href="/" />
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={128}
          height={38}
        />
        <p>Evently. All rights reserved.</p>
      </div>
    </footer>
  );
}
