'use client';

import { JSX, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUserCreditsContext } from '@/contexts/user-credits-context';
import { LaboroSmileyIcon, MagniferIcon } from './AppIcons';

type Props = {
  slot?: JSX.Element;
};

const AppNavbar: FC<Props> = ({ slot }) => {
  const { credits } = useUserCreditsContext();

  // const { setTheme, theme } = useTheme();
  // const inputRef = useRef<HTMLInputElement>(null);

  // const onChangeTheme = (ev: ChangeEvent<HTMLInputElement>): void => {
  //   const currentTheme = ev.target.checked ? "dark" : "lightTheme";
  //   setTheme(currentTheme);
  //   document.querySelector("html")?.setAttribute("data-theme", currentTheme);
  // };

  // useEffect(() => {
  //   const currentTheme = inputRef.current.checked ? "dark" : "lightTheme";
  //   setTheme(currentTheme);
  //   document.querySelector("html")?.setAttribute("data-theme", currentTheme);
  // }, []);

  return (
    <div
      role='navigation'
      aria-label='Navbar'
      className='flex items-center justify-between pt-2 pb-1 lg:pt-[55px] lg:pb-[25px]'
    >
      <Link href='/dashboard' >
        <Image src='/laboro.png' alt='Logo' width={214} height={58} priority/>
      </Link>
      
      <div className='flex items-center gap-3 md:gap-5 lg:gap-7 xl:gap-9 font-jura'>
          {slot}

          <Link
            href='/search'
            className='hidden md:flex my-btn-green gap-5 md:gap-10 lg;gap-20 xl:gap-28 text-lg font-semibold'
          >
            <p>Job Search</p>
            <MagniferIcon />
          </Link>

          <div className='flex items-center gap-1 lg:gap-5 bg-primary-deep-purple rounded-full ml-2 md:ml-0 pl-[2px] pr-[10px] lg:pr-[25px] py-[1px] lg:py-[3px] transform transition-transform duration-300 hover:scale-105'>
            <LaboroSmileyIcon />
            <Link href='/dashboard/subscription' className='text-white text-right font-jura text-sm lg:text-xl font-semibold leading-none tracking-tight'>
              {credits} Credits
            </Link>
          </div>
        </div>
    </div>
  );
};

export default AppNavbar;
