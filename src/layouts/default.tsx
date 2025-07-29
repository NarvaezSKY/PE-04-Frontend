import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import { Divider } from "@heroui/react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-4">
        {children}
      </main>
      <Divider className="my-6"/>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal={false}
          className="flex items-center gap-1 text-current"
          href="/"
        >
          <span className="text-default-600">Actualización reporte </span>
          <p className="text-success">PE-04</p>
        </Link>
      </footer>
    </div>
  );
}
