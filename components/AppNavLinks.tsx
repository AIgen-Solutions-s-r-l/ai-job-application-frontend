'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, Users, CircleCheck, CreditCard, Settings } from 'lucide-react';
import { useWindowSize } from '@/lib/hooks';
import Magnifer from '@/components/svgs/Magnifier.svg';
import jobAppIcon from '@/components/svgs/JobApp.svg';
import profileIcon from '@/components/svgs/Profile.svg';
import accountIcon from '@/components/svgs/Account.svg';
import ArrowLeft from '@/components/svgs/ArrowLeft.svg';

type NavLink = {
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
};

const AppNavLinks: FC<Props> = ({ collapsed }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { width } = useWindowSize();

  const classMenuButton =
    'grow font-semibold text-sm md:text-[18px] my-1 mx-5 md:mx-0 font-jura';

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

  const navLinks: NavLink[] = [
    {
      title: 'Job Applications',
      icon: jobAppIcon,
      links: [
        {
          name: 'Job Application History',
          href: '/dashboard',
          icon: CircleCheck,
        },
        {
          name: 'Job Search',
          href: '/search',
          icon: Search,
          className: 'text-splash-green',
          jsx: JobSearchElement,
        },
        {
          name: 'Review & Apply',
          href: '/manager',
          icon: Search,
          className: 'text-red',
        },
      ],
    },
    {
      title: 'Profile',
      icon: profileIcon,
      links: [{ name: 'My Resume', href: '/dashboard/profiles', icon: Users }],
    },
    {
      title: 'Account',
      icon: accountIcon,
      links: [
        // { name: 'Payment History', href: '#', icon: WalletCards },
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
  ];

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
    <nav className='flex flex-col md:gap-3-'>
      {navLinks.map(({ title, icon, links }) => (
        <div
          key={title}
          className='flex flex-col gap-2 md:gap-2 py-1 md:py-5 border-t-2 border-neutral-content'
        >
          <span className='flex gap-3 pl-3'>
            {icon && (
              <Image
                src={icon}
                height={0}
                width={0}
                style={{ height: 'auto' }}
                alt={`${title} icon`}
              />
            )}
            <h2 className='text-xl font-medium text-primary-deep-purple'>
              {title}
            </h2>
          </span>
          <ul className='flex flex-col md:gap-2'>
            {links.map(({ href, name, className, jsx }) => (
              <li key={name} className='flex'>
                {jsx ? (
                  jsx
                ) : (
                  <Link
                    href={href}
                    className={`grow pl-3 py-2 font-semibold text-base underline ${
                      pathname === href &&
                      'no-underline flex bg-neutral-content rounded-md'
                    } ${className}`}
                  >
                    <span /* className={bold && 'font-extrabold'} */>
                      {name}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className='flex flex-col lg:px-0 py-1 md:pt-[30px] border-t-2 border-neutral-content'>
        <button
          className={`my-btn-clear ${classMenuButton}`}
          onClick={() => {
            router.push('/logout');
          }}
        >
          <Image src={ArrowLeft} alt='Arrow' />
          <p>Sign Out</p>
        </button>
      </div>
    </nav>
  );
};

export default AppNavLinks;
