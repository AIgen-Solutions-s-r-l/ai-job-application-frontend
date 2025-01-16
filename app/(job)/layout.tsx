"use client";

import { ReactNode } from "react";
import Link from "next/link";
import React from "react";
import AppNavbar from "@/components/AppNavbar";
import SelectedJobsProvider from "@/contexts/selected-jobs-context";
import RequireLogin from "@/permssions/requireLogin";

const Layout = ({ children }: { children: ReactNode }) => {

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
    <div className="w-full flex flex-col items-center bg-base-100">
      <SelectedJobsProvider>
        <div className='w-[1440px]'>
          <AppNavbar slot={navbarMenu} />
        </div>
        {children}
      </SelectedJobsProvider>
    </div>
  );
}

export default RequireLogin(Layout);