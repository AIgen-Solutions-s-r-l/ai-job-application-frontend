"use client";

import { ReactNode } from "react";
import React from "react";
import AppNavbar from "@/components/AppNavbar";
import AppSidenav from "@/components/AppSidenav";
import RequireLogin from "@/permissions/requireLogin";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='lg:px-[80px] min-w-80'>
      {/* <div className='block md:flex- w-screen h-screen flex flex-col md:flex-row-'> */}
      <AppNavbar />
      <div className='flex'>
        <div className='nav fixed md:static top-0 z-10 h-full max-h-screen'>
          <AppSidenav />
        </div>
        <div className='grow bg-base-100'>
          <div className='overflow-y-auto h-[calc(100vh-112px)] p-5 bg-base-200'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequireLogin(Layout, true);
