import SideNav from "@/components/sidenav";
import Navbar from "@/components/navbar"; // Importar el componente de Navbar
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";
import React from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(config.auth.loginUrl);
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 bg-base-200">
        {" "}
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
