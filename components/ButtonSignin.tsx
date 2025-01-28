/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import config from "@/config";
import { useUserContext } from "@/contexts/user-context";

const ButtonSignin = ({
  text = "Get started",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    // Obtener el username desde localStorage
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  if (username) {
    return (
      <Link
        href={config.auth.callbackUrl}
        className={`btn ${extraStyle ? extraStyle : ""}`}
      >
        <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full shrink-0 capitalize">
          {username.charAt(0)} {/* Mostrar la inicial del username */}
        </span>
        {username}
      </Link>
    );
  }

  return (
    <Link
      className={`btn ${extraStyle ? extraStyle : ""}`}
      href={config.auth.loginUrl}
    >
      {text}
    </Link>
  );
};

export default ButtonSignin;