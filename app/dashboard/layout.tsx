"use client";

import SideNav from "@/components/sidenav";
import Navbar from "@/components/navbar"; // Importar el componente de Navbar
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";
import React from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Asegúrate de que esto solo se ejecute en el cliente
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (!accessToken) {
      router.replace(config.auth.loginUrl); // Redirigir si no hay token
    } else {
      setIsAuthenticated(true); // Si hay token, marca como autenticado
    }
  }, [router]);

  if (!isAuthenticated) {
    // Evita renderizar el contenido hasta que se verifique la autenticación
    return null;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 bg-base-200">
        {/* Fondo de la barra lateral */}
        <SideNav />
      </div>
      <div className="grow bg-base-100">
        <Navbar />
        <div className="overflow-y-auto h-[calc(100%-65px)] p-6 md:p-5 bg-base-200">
          {children}
        </div>
        {/* Fondo del contenido */}
      </div>
    </div>
  );
}