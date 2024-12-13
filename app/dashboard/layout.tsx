"use client";

import SideNav from "@/components/sidenav";
import Navbar from "@/components/navbar"; // Importar el componente de Navbar
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";
import React from "react";
import { getServerCookie } from "@/libs/cookies";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthentication = useCallback(async () => {
    const accessToken = await getServerCookie('accessToken');
    if (!accessToken) {
      setIsAuthenticated(false);
      console.log('No token');
      router.replace(config.auth.loginUrl);
    } else {
      setIsAuthenticated(true);
      console.log('yes');

    }
  }, [router]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (!isAuthenticated) {
    // Evita renderizar el contenido hasta que se verifique la autenticación
    return null;
  }

  return (
    <div className="block md:flex w-screen h-screen flex-col md:flex-row"> {/* // may be add md:overflow-hidden */}
      {/* <div className="w-full flex-none md:w-64 bg-base-200"> */}
      <div className="nav fixed z-10 md:static h-screen flex-none">
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