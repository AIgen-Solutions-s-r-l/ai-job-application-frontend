"use client";

import React from "react";
import { useEffect } from "react";
import { deleteServerCookie } from "@/libs/cookies";
import { usePathname, useRouter } from "next/navigation";

const LogoutAndRedirect = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await deleteServerCookie("accessToken");
      localStorage.removeItem("username");
      router.replace(`/signin/?r=${pathname}`);
    };
    handleSignOut();
  }, [pathname, router]);

  return <>Redirecting to login ...</>;
};

export default LogoutAndRedirect;
