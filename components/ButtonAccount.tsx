/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/libs/supabase/client";
import apiClient from "@/libs/api";
import React from "react";
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

/*
  A button to show user some account actions
  1. Billing: open a Stripe Customer Portal to manage their billing (cancel subscription, update payment method, etc.).
      You have to manually activate the Customer Portal in your Stripe Dashboard (https://dashboard.stripe.com/test/settings/billing/portal)
      This is only available if the customer has a customerId (they made a purchase previously)
  2. Logout: sign out and go back to homepage
  See more at https://shipfa.st/docs/components/buttonAccount
*/
const ButtonAccount = () => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user?.user_metadata?.avatar_url}
                alt={"Profile picture"}
                className="w-6 h-6 rounded-full shrink-0"
                referrerPolicy="no-referrer"
                width={24}
                height={24}
              />
            ) : (
              <span className="w-8 h-8 bg-base-100 flex justify-center items-center rounded-full shrink-0 capitalize">
                {user?.email?.charAt(0)}
              </span>
            )}
            <span className="truncate hidden md:block">
              {user?.user_metadata?.name ||
                user?.email?.split("@")[0] ||
                "Account"}
            </span>
            {isLoading ? <Loader2 className="animate-spin" /> : <ChevronDown />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-white dark:bg-black"
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
