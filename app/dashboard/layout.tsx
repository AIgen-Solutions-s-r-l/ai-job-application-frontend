"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";
import React from "react";
import { getServerCookie } from "@/libs/cookies";
import AppNavbar from "@/components/AppNavbar";
import AppSidenav from "@/components/AppSidenav";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthentication = useCallback(async () => {
    const accessToken = await getServerCookie("accessToken");
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
    <div className='lg:px-[80px] min-w-80'>
      {/* <div className='block md:flex- w-screen h-screen flex flex-col md:flex-row-'> */}
      <AppNavbar />
      <div className='flex'>
        <div className='nav fixed fixed top-0 z-10 md:static h-screen flex-none-'>
          <AppSidenav />
        </div>
        <div className='grow bg-base-100'>
          <div className='overflow-y-auto h-[calc(100%-65px)] p-5 bg-base-200'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
