'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  Users,
  CircleCheck,
  CreditCard,
  Settings,
  Briefcase,
  LogOut,
} from 'lucide-react';
import { useWindowSize } from '@/lib/hooks';
import { useSidenavContext } from '@/contexts/sidenav-context';
import Magnifer from '@/components/svgs/Magnifier.svg';
import jobAppIcon from '@/components/svgs/JobApp.svg';
import profileIcon from '@/components/svgs/Profile.svg';
import accountIcon from '@/components/svgs/Account.svg';
import ArrowLeft from '@/components/svgs/ArrowLeft.svg';

type NavLink = {
  id: string; // for detecting slot position
  title: string;
  icon?: any;
  links: {
    name: string;
    href: string;
    icon: any;
    className?: string;
    jsx?: React.JSX.Element;
  }[];
};

type Props = {
  collapsed?: boolean;
  onClick: () => void;
};

const AppNavLinks: FC<Props> = ({ collapsed, onClick }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { width } = useWindowSize();
  const { slots } = useSidenavContext();

  const classMenuButton =
    'grow font-semibold text-lg md:text-[18px] my-1 font-jura w-full';

  const JobSearchElement = (
    <button
      className={`my-btn-green ${classMenuButton}`}
      onClick={() => {
        router.push('/search');
      }}
    >
      <p>Job Search</p>
      <Image src={Magnifer} alt='Magnifer' />
    </button>
  );

  const SignOutElement = (
    <button
      className={`my-btn-clear ${classMenuButton}`}
      onClick={() => {
        router.push('/logout');
      }}
    >
      <Image src={ArrowLeft} alt='Arrow' />
      <p>Sign Out</p>
    </button>
  );

  const navLinks: NavLink[] = [
    {
      id: 'JobApplications',
      title: 'Job Applications',
      icon: jobAppIcon,
      links: [
        {
          name: 'Applications History',
          href: '/dashboard',
          icon: CircleCheck,
        },
        {
          name: 'Review & Submit Your Applications',
          href: '/manager',
          icon: Briefcase,
        },
      ],
    },
    {
      id: 'Profile',
      title: 'Profile',
      icon: profileIcon,
      links: [{ name: 'My Resume', href: '/dashboard/profiles', icon: Users }],
    },
    {
      id: 'Account',
      title: 'Account',
      icon: accountIcon,
      links: [
        {
          name: 'Subscription',
          href: '/dashboard/subscription',
          icon: CreditCard,
        },
        {
          name: 'Account Information',
          href: '/dashboard/settings',
          icon: Settings,
        },
      ],
    },
    {
      id: 'SignOut',
      title: null,
      links: [
        {
          name: 'Sign Out',
          href: '/signout',
          icon: LogOut,
          jsx: SignOutElement,
        },
      ],
    },
  ];

  return collapsed && width > 767 ? (
    // compact version menu's on small screen
    <nav className='flex flex-col md:gap-3'>
      <div className="mb-3">
        <Link
          href="/search"
          className={`flex items-center gap-2 p-2 mx-2 rounded-md ${pathname === '/search' ? 'bg-neutral text-white' : 'hover:bg-base-300'
            }`}
        >
          <Search className='w-6 h-6' />
        </Link>
      </div>
      {navLinks.map(({ title, links }) => (
        <ul key={title} className='flex flex-col gap-3'>
          {links.map(({ href, icon, name }) => {
            const LinkIcon = icon;
            return (
              <li key={name}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 p-2 mx-2 rounded-md ${pathname === href
                      ? 'bg-neutral text-white'
                      : 'hover:bg-base-300'
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
    // full version menu's
    <nav className='flex flex-col md:gap-3-'>
      <div className="mb-3">
        {JobSearchElement}
      </div>
      {navLinks.map(({ id, title, icon, links }) => (
        <div
          key={title}
          className='flex flex-col gap-2 md:gap-2 py-1 md:py-5 border-t-2 border-neutral-content'
        >
          <span className='flex gap-3 pl-3'>
            {icon && (
              <Image
                src={icon}
                // style={{ height: 'auto', width: 'revert-layer' }}
                alt={`${title} icon`}
              />
            )}
            <h2 className='text-xl font-medium text-primary-deep-purple'>
              {title}
            </h2>
          </span>
          <ul className='flex flex-col md:gap-2'>
            {/* addition slots for any JSX from SidenavContext*/}
            {slots[id] && slots[id]}

            {links.map(({ href, name, className, jsx }) => (
              <li key={name} className='flex'>
                {jsx ? (
                  jsx
                ) : (
                  <Link
                    href={href}
                    className={`grow pl-3 py-2 font-semibold text-base underline hover:text-primary-deep-purple ${pathname === href
                        ? 'no-underline flex bg-neutral-content rounded-md'
                        : ''
                      }`}
                    onClick={onClick}
                  >
                    <span>{name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default AppNavLinks;
