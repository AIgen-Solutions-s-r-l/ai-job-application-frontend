"use client";

import React, { ChangeEvent, useEffect, JSX, FC } from "react";
import { useTheme } from "next-themes";
import AppButtonAccount from "./AppButtonAccount";
import { Moon, Sun } from "lucide-react";

type Props = {
  slot?: JSX.Element
}

const AppNavbar: FC<Props> = ({slot}) => {
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
      className="flex items-center justify-between bg-base-100 pt-8 pb-4 px-4 md:px-0"
    >

      <div className="hidden md:block">
        <p className="text-[32px] lg:text-[64px] italic leading-none">JOB HAWK</p>
      </div>
      <div className="block md:hidden w-[80px] shrink-0">&nbsp;</div>
      <div className="flex items-center gap-[30px]">
        {slot}
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
