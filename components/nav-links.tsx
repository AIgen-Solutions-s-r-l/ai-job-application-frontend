'use client';

import {
  House,
  Search,
  Users,
  BriefcaseBusiness,
  CircleCheck,
  CreditCard,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Mapa de enlaces con los íconos solicitados
const links = [
  { name: 'Home', href: '/dashboard', icon: House },
  { name: 'Job Search', href: '/search', icon: Search },
  { name: 'Job Profiles', href: '/dashboard/profiles', icon: Users },
  { name: 'Job Roles', href: '/dashboard/roles', icon: BriefcaseBusiness },
  { name: 'Jobs Applied', href: '/dashboard/jobs', icon: CircleCheck },
  { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
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
              pathname === link.href
                ? 'bg-neutral text-white'
                : 'hover:bg-base-300'
            }`}
          >
            <LinkIcon className='w-6 h-6' />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
