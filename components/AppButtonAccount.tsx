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
  SquareKanban,
} from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { deleteServerCookie } from "@/libs/cookies";
import { useUserContext } from "@/contexts/user-context";
import Link from "next/link";

const AppButtonAccount = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (user) {
      setEmail(user.email.split('@')[0]);
    }
  }, [user]);

  const handleSignOut = async () => {
    await deleteServerCookie("accessToken");
    setUser(null);
    window.location.href = "/";
  };

  // const handleBilling = async () => {
  //   setIsLoading(true);

  //   try {
  //     const { url }: { url: string } = await apiClient.post(
  //       "/stripe/create-portal",
  //       {
  //         returnUrl: window.location.href,
  //       }
  //     );

  //     window.location.href = url;
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   setIsLoading(false);
  // };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full py-5 border-my-neutral-7">
            <span className="w-8 h-8 bg-primary-light-purple-gray flex justify-center items-center rounded-full shrink-0 capitalize font-semibold text-[18px] text-white">
              {email?.charAt(0) || "A"} {/* Mostrar la inicial del email */}
            </span>
            <span className="truncate hidden md:block font-semibold text-[18px]">
              {email || "Profile"} {/* Mostrar el email o un texto por defecto */}
            </span>
            {isLoading ? <Loader2 className="animate-spin" /> : <ChevronDown />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-base-100"
          align="end"
        >
          <Link href="/dashboard" passHref className="md:hidden">
            <DropdownMenuItem
              className={clsx(
                `h-10`,
                pathname === "/dashboard" &&
                `bg-gray-300 dark:bg-gray-600`
              )}
            >
              <SquareKanban />
              Dashboard
            </DropdownMenuItem>
          </Link>
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
          <Link href="/dashboard/subscription">
            <DropdownMenuItem className="h-10">
              <CreditCard />
              Billing
            </DropdownMenuItem>
          </Link>
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

export default AppButtonAccount;