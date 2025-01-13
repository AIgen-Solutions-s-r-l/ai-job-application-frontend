"use client";

import React, { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Users,
  // BriefcaseBusiness,
  CircleCheck,
  CreditCard,
  LogOut,
  WalletCards,
  Settings,
} from "lucide-react";
import { useWindowSize } from "@/lib/hooks";

const navLinks = [
  {
    title: "Job Applications",
    links: [
      { name: "History", href: "/dashboard", icon: CircleCheck },
      { name: "Job Search", href: "/search", icon: Search },
    ],
  },
  {
    title: "My Profile",
    links: [{ name: "My Resume", href: "/dashboard/profiles", icon: Users }],
  },
  {
    title: "Account",
    links: [
      { name: "Payment History", href: "#", icon: WalletCards },
      {
        name: "Subscription",
        href: "/dashboard/subscription",
        icon: CreditCard,
      },
      // {
      //   name: "Account Information",
      //   href: "/dashboard/roles",
      //   icon: BriefcaseBusiness,
      // },
      {
        name: "Account Information",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        name: "Sign Out",
        href: "/logout",
        icon: LogOut,
        bold: true,
      },
    ],
  },
];

type Props = {
  collapsed?: boolean;
};

const AppNavLinks: FC<Props> = ({ collapsed }) => {
  const pathname = usePathname();
  const { width } = useWindowSize();

  return collapsed && width > 767 ? (
    <nav className='flex flex-col md:gap-3'>
      {navLinks.map(({ title, links }) => (
        <ul key={title} className='flex flex-col gap-3'>
          {links.map(({ href, icon, name }) => {
            const LinkIcon = icon;
            return (
              <li key={name}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 p-2 mx-2 rounded-md ${
                    pathname === href
                      ? "bg-neutral text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <LinkIcon className='w-6 h-6' />
                </Link>
              </li>
            );
          })}
        </ul>
      ))}
    </nav>
  ) : (
    <nav className='flex flex-col md:gap-3'>
      {navLinks.map(({ title, links }) => (
        <div
          key={title}
          className='flex flex-col gap-2 md:gap-5 pl-5 lg:pl-0 py-1 md:py-8 last:pb-0 [&:not(:last-child)]:border-b-2 border-neutral-content'
        >
          <h2 className='font-semibold text-xl'>{title}</h2>
          <ul className='flex flex-col md:gap-3'>
            {links.map(({ href, name, bold }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`underline text-lg font-light ${
                    pathname === href &&
                    "font-semibold no-underline font-medium"
                  }`}
                >
                  <span className={bold && "font-extrabold"}>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default AppNavLinks;
