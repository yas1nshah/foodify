import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full`}>
        <header className="p-4 bg-secondary flex justify-center items-center w-full mb-11">
            <Link className="text-2xl font-light flex-grow" href={'/'}>

              <h2 className="text-2xl font-light flex-grow">
                Food<span className="font-bold">ify</span>
              </h2>
            </Link>

            <Link href={'/user/login'}>
              <Button>
                Account
              </Button>
            </Link>
        </header>
        <main >
          {children}
        </main>
        {/* <main className="max-w-6 mx-auto w-full">

          
        </main> */}
      </body>
    </html>
  );
}
