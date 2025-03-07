"use client";

import { useEffect } from "react";
import { deleteServerCookie } from "@/libs/cookies";
import { usePathname, useRouter } from "next/navigation";
import config from "@/config";

const LogoutAndRedirect = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await deleteServerCookie("accessToken");
      router.replace(`${config.auth.loginUrl}/?r=${pathname}`);
    };
    handleSignOut();
  }, [pathname, router]);

  return <>Redirecting to login ...</>;
};

export default LogoutAndRedirect;
