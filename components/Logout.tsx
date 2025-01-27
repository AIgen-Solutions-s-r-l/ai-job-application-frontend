"use client";

import React from "react";
import { useEffect } from "react";
import { deleteServerCookie } from "@/libs/cookies";
import { usePathname, useRouter } from "next/navigation";

const Logout = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await deleteServerCookie("accessToken");
      router.replace("/");
    };
    handleSignOut();
  }, [pathname, router]);

  return <>Redirecting to login ...</>;
};

export default Logout;
