"use client";

import Navbar from "@/components/navbar"; // Importar el componente de Navbar
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";
import React from "react";
import { getServerCookie } from "@/libs/cookies";
import CVDataContextProvider from "@/contexts/cv-data-context";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthentication = useCallback(async () => {
    const accessToken = await getServerCookie('accessToken');
    if (!accessToken) {
      setIsAuthenticated(false);
      router.replace(config.auth.loginUrl);
    } else {
      setIsAuthenticated(true);
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
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="grow bg-base-100">
        <Navbar />
        <div className="overflow-y-auto h-[calc(100%-65px)] bg-base-100">
          <CVDataContextProvider>
            {children}
          </CVDataContextProvider>
        </div>
      </div>
    </div>
  );
}