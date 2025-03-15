'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { SquareChevronRight, SquareChevronLeft, Menu } from 'lucide-react';
import AppNavLinks from './AppNavLinks';
import { useSidenavCollapse } from '@/libs/hooks';

const minWidth = 298;

export default function AppSidenav() {
  const [isOpen, setIsOpen] = useState(false);

  //todo: expiremental, reduce speed, may couse errors with access to local storage on server side
  const [isCollapse, setIsCollapse] = useSidenavCollapse();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = useCallback(() => {
    //@ts-ignore
    setIsCollapse((prev) => !prev);
  }, [setIsCollapse]);

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
        className={`drawer-menu h-full shrink-0 fixed top-0 left-0- z-10 md:relative flex flex-col bg-base-100 z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 overflow-y-auto ${
          isOpen ? 'min-h-screen' : ''
        } ${!isCollapse && `w-[${minWidth}px]`}`}
      >
        {/* Collapse button */}
        <button
          className={`hidden p-1 rounded-md hover:bg-base-300 ${
            isCollapse
              ? 'md:flex flex-col items-center py-4'
              : 'md:block absolute right-0 top-0'
          }`}
          onClick={toggleCollapse}
        >
          {isCollapse ? <SquareChevronRight /> : <SquareChevronLeft />}
        </button>

        {!isCollapse && (
          <Link className='page-header mb-[25px] pr-[3rem] p-3 md:p-0' href='/dashboard'>
            Dashboard /
          </Link>
        )}

        {/* Nav Links */}
        <div className={'flex grow flex-col space-y-2 font-jura p-3 md:p-0'}>
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
