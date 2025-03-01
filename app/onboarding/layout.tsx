"use client";

import { ReactNode } from "react";
import CVDataContextProvider from "@/contexts/cv-data-context";
import { OngoingNabvar } from "@/components/onboarding/OngoingNabvar";
import RequireLogin from "@/permissions/requireLogin";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <CVDataContextProvider>
      <div className="w-full h-screen flex flex-col items-center bg-base-100">
        <OngoingNabvar />
        {children}
      </div>
    </CVDataContextProvider>
  );
}

export default RequireLogin(Layout, false);