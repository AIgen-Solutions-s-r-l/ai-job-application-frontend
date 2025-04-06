"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  ChevronDown,
  CreditCard,
  Loader2,
  LogOut,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { deleteServerCookie } from "@/libs/cookies";
import { useUserContext } from "@/contexts/user-context";

const ButtonAccount = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSignOut = async () => {
    await deleteServerCookie("accessToken");
    localStorage.removeItem('selectedJobs');
    setUsername(null);
    setUser(null);
    window.location.href = "/";
  };

  const handleBilling = async () => {
    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        "/stripe/create-portal",
        {
          returnUrl: window.location.href,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full h-10">
            <span className="w-8 h-8 bg-base-200 flex justify-center items-center rounded-full shrink-0 capitalize">
              {username?.charAt(0) || "A"} {/* Mostrar la inicial del username */}
            </span>
            <span className="truncate hidden md:block">
              {username || "Account"} {/* Mostrar el username o un texto por defecto */}
            </span>
            {isLoading ? <Loader2 className="animate-spin" /> : <ChevronDown />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-base-100"
          align="end"
        >
          <Link href="/dashboard/settings" passHref>
            <DropdownMenuItem
              className={clsx(
                `h-10`,
                pathname === "/dashboard/settings" &&
                `bg-gray-300 dark:bg-gray-600`
              )}
            >
              <Settings />
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="h-10" onClick={handleBilling}>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-400" />
          <DropdownMenuItem className="h-10" onClick={handleSignOut}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ButtonAccount;