'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Mapa de enlaces con los íconos solicitados
const links = [
  { name: 'Dashboard', href: '/dashboard'},
  { name: 'Job Search', href: '/search'},
  { name: 'Job Manager', href: '/manager'},
];

export default function AppNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center text-md leading-none ${
              pathname === link.href
                ? 'border-2 border-black px-8 py-3 rounded-full font-semibold'
                : ''
            }`}
          >
            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
