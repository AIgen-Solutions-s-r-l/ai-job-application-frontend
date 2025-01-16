"use client";

import Navbar from "@/components/navbar"; // Importar el componente de Navbar
import { ReactNode } from "react";
import React from "react";
import CVDataContextProvider from "@/contexts/cv-data-context";
import { OngoingNabvar } from "@/components/onboarding/OngoingNabvar";
import RequireLogin from "@/permissions/requireLogin";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <CVDataContextProvider>
      <div className="w-full h-screen flex flex-col items-center bg-base-200">
        <OngoingNabvar />
        {children}
      </div>
    </CVDataContextProvider>
  );
}

export default RequireLogin(Layout);