"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import config from "@/config";
import React from "react";
import { getServerCookie } from "@/libs/cookies";
import AppNavbar from "@/components/AppNavbar";

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
  const navbarMenu = (
    <Link
      key='Dashboard'
      href='/dashboard'
      className='flex items-center text-md leading-none border-2 border-black px-8 py-3 rounded-full font-semibold'
    >
      <span>Dashboard</span>
    </Link>
  );

  return (
    <div className="w-full h-screen flex flex-col items-center bg-base-100">
      <div className='w-[1440px]'>
        <AppNavbar slot={navbarMenu} />
      </div>
      {children}
    </div>
  );
}