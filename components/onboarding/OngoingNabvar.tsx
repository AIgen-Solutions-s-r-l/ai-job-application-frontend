"use client";

import { FC } from 'react';
import { Container } from '../Container';
import Image from 'next/image';
import Link from 'next/link';
import { useUserContext } from '@/contexts/user-context';
import { deleteServerCookie } from '@/libs/cookies';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export const OngoingNabvar: FC = () => {
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleSignOut = async () => {
    await deleteServerCookie("accessToken");
    setUser(null);
    router.push("/signin");
  };

  return (
    <Container className='pt-[30px] pb-[12px] md:pt-[55px] md:pb-[25px]'>
      <div
        role='navigation'
        aria-label='Navbar'
        className='flex items-center justify-between'
      >
        <Link href='/'>
          <Image src="/laboro.png" alt="Logo" width={214} height={58} />
        </Link>

        <button
          className='my-btn-clear gap-2'
          onClick={handleSignOut}
        >
          <LogOut />
          <p>Sign Out</p>
        </button>
      </div>
    </Container>
  );
};