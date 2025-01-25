"use client";

import React, { ChangeEvent, useEffect } from "react";
import ButtonAccount from "@/components/ButtonAccount"; // Importamos el ButtonAccount
import { useTheme } from "next-themes";
import { Bell, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { setTheme, theme } = useTheme();

  const onChangeTheme = (ev: ChangeEvent<HTMLInputElement>): void => {
    const currentTheme = ev.target.checked ? "dark" : "cupcake";
    setTheme(currentTheme);
    document.querySelector("html")?.setAttribute("data-theme", currentTheme);
  };

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      role="navigation"
      aria-label="Navbar"
      className="flex justify-between py-3 px-3 z-10 border-b border-neutral-content"
    >
      <div className="gap-3">
        {/* <button aria-label="Leftmenu toggle" className="btn btn-sm btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="inline-block"
            fontSize="20"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 12h16M4 6h16M4 18h16"
            ></path>
          </svg>
        </button> */}
      </div>

      <div className="navbar-center"></div>

      <div className="flex items-center gap-4">
        {/* Invertimos el comportamiento de los iconos */}
        <label className="swap swap-rotate">
          {/* Este input activará/desactivará el modo oscuro */}
          <input
            type="checkbox"
            onChange={onChangeTheme}
            checked={theme === "dark" ? true : false}
          />

          {/* El icono de la luna ahora es "swap-off", se mostrará cuando el tema esté claro */}
          <Sun className="swap-off" />

          {/* El icono del sol ahora es "swap-on", se mostrará cuando el tema esté oscuro */}
          <Moon className="swap-on" />
        </label>

        <div>
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-circle btn-ghost btn-sm">
              <Bell />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box card card-compact m-1 w-96 p-3 shadow"
              role="menu"
            >
              <div className="flex items-center justify-between px-2">
                <p className="text-base font-medium">Notification</p>
                <button className="btn gap-2 btn-sm btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    fontSize="16"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 6L6 18M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </ul>
          </div>
        </div>

        {/* Aquí agregamos el componente ButtonAccount */}
        <ButtonAccount />
      </div>
    </div>
  );
};

export default Navbar;
