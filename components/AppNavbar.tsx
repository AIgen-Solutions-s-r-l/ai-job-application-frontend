"use client";

import React, { ChangeEvent, useEffect, JSX, FC, useRef } from "react";
import { useTheme } from "next-themes";
import Image from 'next/image';

type Props = {
  slot?: JSX.Element
}

const AppNavbar: FC<Props> = ({ slot }) => {
  // const { setTheme, theme } = useTheme();
  // const inputRef = useRef<HTMLInputElement>(null);

  // const onChangeTheme = (ev: ChangeEvent<HTMLInputElement>): void => {
  //   const currentTheme = ev.target.checked ? "dark" : "lightTheme";
  //   setTheme(currentTheme);
  //   document.querySelector("html")?.setAttribute("data-theme", currentTheme);
  // };

  // useEffect(() => {
  //   const currentTheme = inputRef.current.checked ? "dark" : "lightTheme";
  //   setTheme(currentTheme);
  //   document.querySelector("html")?.setAttribute("data-theme", currentTheme);
  // }, []);

  return (
    <div
      role="navigation"
      aria-label="Navbar"
      className="flex items-center justify-between pt-[55px] pb-[25px] px-4 md:px-0"
    >
      <Image src="/laboro.png" alt="Logo" width={214} height={58} />

      {slot}
    </div>
  );
};

export default AppNavbar;
