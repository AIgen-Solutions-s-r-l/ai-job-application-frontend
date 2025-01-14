"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { SquareChevronRight, SquareChevronLeft, Menu } from "lucide-react";
import AppNavLinks from "./AppNavLinks";
import { useSidenavCollapse } from "@/libs/hooks";

const minWidth = 230;

export default function AppSidenav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapse, setIsCollapse] = useSidenavCollapse();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = useCallback(() => {
    //@ts-ignore
    setIsCollapse(!isCollapse);
  }, [isCollapse]);

  return (
    <>
      {/* Burger button */}
      {!isOpen && (
        <button
          onClick={toggleDrawer}
          className='btn btn-square btn-ghost fixed top-4 left-4 z-50 md:hidden'
        >
          <Menu />
        </button>
      )}

      {/* Drawer */}
      <div
        className={`drawer-menu absolute md:relative flex flex-col bg-base-100 border-r border-neutral-content= z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen && "min-h-screen"
        } ${!isCollapse && `w-[${minWidth}px]`}`}
      >
        {/* Collapse button */}
        <button
          className={`hidden p-1 rounded-md hover:bg-base-300 ${
            isCollapse
              ? "md:flex flex-col items-center py-4"
              : "md:block absolute right-0 top-4"
          }`}
          onClick={toggleCollapse}
        >
          {isCollapse ? <SquareChevronRight /> : <SquareChevronLeft />}
        </button>

        {!isCollapse && (
          <Link
            className={`text-3xl mt-5 mb-[25px] pr-[3rem] pl-5 lg:pl-0`}
            href='/dashboard'
          >
            Dashboard
          </Link>
        )}

        {/* Nav Links */}
        <div className={"flex grow flex-col space-y-2"}>
          <AppNavLinks collapsed={isCollapse as boolean} />
        </div>
      </div>

      {/* Background for menu's closing */}
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className='fixed inset-0 bg-black opacity-50 z-30 md:hidden'
        ></div>
      )}
    </>
  );
}
