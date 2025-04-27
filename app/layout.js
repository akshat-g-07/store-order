import Image from "next/image";

import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "TMM Jind",
};

export default function RootLayout({ children }) {
  const imgSrc = process.env.IMG_URL;
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="bg-brand-primaryYellow w-full h-fit">
          <Link
            className="pt-6 pb-2 flex items-center justify-center"
            href="/order"
          >
            <Image
              src={imgSrc}
              alt="logo"
              width={250}
              height={60}
              priority
              className="h-auto"
            />
          </Link>
        </header>
        <section className="w-full max-w-[550px] mx-auto relative min-h-[calc(100vh-100px)]">
          {children}
        </section>
      </body>
    </html>
  );
}
