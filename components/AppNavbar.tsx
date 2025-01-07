"use client";

import React, { ChangeEvent, useEffect } from "react";
import { useTheme } from "next-themes";
import AppButtonAccount from "./AppButtonAccount";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

const AppNavbar = () => {
  const { setTheme, theme } = useTheme();

  const onChangeTheme = (ev: ChangeEvent<HTMLInputElement>): void => {
    const currentTheme = ev.target.checked ? "dark" : "cupcake";
    setTheme(currentTheme);
    document.querySelector("html")?.setAttribute("data-theme", currentTheme);
  };

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, []);

  return (
    <div
      role="navigation"
      aria-label="Navbar"
      className="flex items-center justify-between w-[1440px] bg-base-100 pt-8 pb-4"
    >

      <div className="">
        <p className="text-[64px] italic leading-none">JOB HAWK</p>
      </div>

      <div className="flex items-center gap-[30px]">
        <Link
          key='Dashboard'
          href='/dashboard'
          className="flex items-center text-md leading-none border-2 border-black px-8 py-3 rounded-full font-semibold"
        >
          <span>Dashboard</span>
        </Link>

        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={onChangeTheme}
            checked={theme === "dark" ? true : false}
          />

          <Sun className="swap-off" />

          <Moon className="swap-on" />
        </label>

        <AppButtonAccount />
      </div>
    </div>
  );
};

export default AppNavbar;
