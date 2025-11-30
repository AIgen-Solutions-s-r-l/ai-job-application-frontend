'use client';

import { FC, JSX } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Users,
  CircleCheck,
  CreditCard,
  Settings,
  CircleHelp,  
  Briefcase,
  LogOut,
} from 'lucide-react';
import {
  AccountIcon,
  ArrowLeftIcon,
  JobAppIcon,
  MagniferIcon,
  ProfileIcon,
} from '@/components/AppIcons';
import { useWindowSize } from '@/lib/hooks';
import { useSidenavContext } from '@/contexts/sidenav-context';

type NavLink = {
  id: string; // for detecting slot position
  jsx?: JSX.Element;
  className?: string;
  links: {
    name: string;
    href: string;
    icon: any;
    className?: string;
    jsx?: JSX.Element;
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

  const classBlockHeader = 'flex items-center gap-3 pl-3';

  const navLinks: NavLink[] = [
    {
      id: 'JobSearch',
      className: 'py-1 md:py-5',
      links: [
        {
          name: 'Job Search',
          href: '/search',
          icon: Search,
          jsx: (
            <button
              className={`my-btn-green md:hidden ${classMenuButton}`}
              onClick={() => {
                router.push('/search');
              }}
            >
              <p>Job Search</p>
              <MagniferIcon />
            </button>
          ),
        },
      ],
    },
    {
      id: 'JobApplications',
      jsx: (
        <span className={classBlockHeader}>
          <JobAppIcon />
          <h2 className='text-xl font-medium text-primary-deep-purple'>
            Job Applications
          </h2>
        </span>
      ),
      links: [
        {
          name: 'Applications History',
          href: '/dashboard',
          icon: CircleCheck,
        },
        {
          name: 'Review & Submit',
          href: '/manager',
          icon: Briefcase,
        },
      ],
    },
    {
      id: 'Profile',
      jsx: (
        <span className={classBlockHeader}>
          <ProfileIcon />
          <h2 className='text-xl font-medium text-primary-deep-purple'>
            Profile
          </h2>
        </span>
      ),
      links: [{ name: 'My Resume', href: '/dashboard/profiles', icon: Users }],
    },
    {
      id: 'Account',
      jsx: (
        <span className={classBlockHeader}>
          <AccountIcon />
          <h2 className='text-xl font-medium text-primary-deep-purple'>
            Account
          </h2>
        </span>
      ),
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
        {
          name: 'Need help?',
          href: 'https://tally.so/r/w2R0rM',
          icon: CircleHelp,
        },
      ],
    },
    {
      id: 'SignOut',
      links: [
        {
          name: 'Sign Out',
          href: '/logout',
          icon: LogOut,
          jsx: (
            <button
              className={`my-btn-clear ${classMenuButton}`}
              onClick={() => {
                router.push('/logout');
              }}
            >
              <ArrowLeftIcon />
              <p>Sign Out</p>
            </button>
          ),
        },
      ],
    },
  ];

  return collapsed && width && width > 767 ? (
    // compact version menu's on small screen
    <nav className='flex flex-col md:gap-3'>
      {navLinks.map(({ id, links }) => (
        <ul key={id} className='flex flex-col gap-3'>
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
    // full version menu's
    <nav className='flex flex-col md:gap-3-'>
      {navLinks.map(({ id, jsx, className, links }) => (
        <div
          key={id}
          className={
            className
              ? className
              : 'flex flex-col gap-2 md:gap-2 py-1 md:py-5 border-t-2 border-neutral-content'
          }
        >
          {jsx}
          <ul className='flex flex-col md:gap-2'>
            {/* addition slots for any JSX from SidenavContext*/}
            {slots[id] && slots[id]}

            {links.map(({ href, name, jsx }) => (
              <li key={name} className='flex'>
                {jsx ? (
                  jsx
                ) : (
                  <Link
                    href={href}
                    className={`grow pl-3 py-2 font-semibold text-base underline hover:text-primary-deep-purple ${
                      pathname === href
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
