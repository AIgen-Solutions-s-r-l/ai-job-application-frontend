"use client";

import { useState } from 'react';
import Link from 'next/link';
import NavLinks from './nav-links';
import Image from 'next/image';
import logo from "@/app/icon.png";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Burger button */}
      {!isOpen && (
        <button 
          onClick={toggleDrawer} 
          className="btn btn-square btn-ghost fixed top-4 left-4 z-50 md:hidden"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-base-100 border-r border-neutral-content z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
        {/* Contenedor para el logo */}
        <Link
          className="mb-2 flex h-20 items-center justify-start rounded-md p-4 text-white"
          href="/dashboard"
        >
          {/* Logo ajustado */}
          <div className="relative h-16 w-full"> {/* Ajusta la altura y anchura del contenedor */}
            <Image 
              src={logo} // Ruta de tu logo
              alt="Logo"
              layout="fill"  // Hace que la imagen ocupe todo el contenedor
              objectFit="contain" // Asegura que la imagen no se corte
              className="object-contain"
            />
          </div>
        </Link>

        {/* Nav Links organizados verticalmente */}
        <div className="flex grow flex-col justify-between space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        </div>
      </div>

      {/* Overlay para cerrar el drawer cuando esté abierto */}
      {isOpen && (
        <div 
          onClick={toggleDrawer} 
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
}