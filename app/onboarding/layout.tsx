"use client";

import Navbar from "@/components/navbar"; // Importar el componente de Navbar
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";
import React from "react";
import { getServerCookie } from "@/libs/cookies";
import CVDataContextProvider from "@/contexts/cv-data-context";
import { OngoingNabvar } from "@/components/onboarding/OngoingNabvar";

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
    <CVDataContextProvider>
      <div className="w-full h-screen flex flex-col items-center bg-base-200">
        <OngoingNabvar />
        {children}
      </div>
    </CVDataContextProvider>
  );
}