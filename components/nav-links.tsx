'use client';

import {
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  BugAntIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Mapa de enlaces con los íconos solicitados
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Job Profiles', href: '/dashboard/profiles', icon: UserGroupIcon },
  { name: 'Job Roles', href: '/dashboard/roles', icon: BriefcaseIcon },
  { name: 'Jobs Applied', href: '/dashboard/jobs', icon: CheckCircleIcon },
  { name: 'Bot', href: '/dashboard/bots', icon: BugAntIcon },
  { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCardIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-2 p-2 mx-2 rounded-md ${
              pathname === link.href ? 'bg-neutral text-white' : 'hover:bg-base-300'
            }`}
          >
            <LinkIcon className="w-6 h-6" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}