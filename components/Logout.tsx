'use client';

import { useEffect } from 'react';
import { deleteServerCookie } from '@/libs/cookies';
import { usePathname, useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/user-context';

const Logout = () => {
  const { setUser, setAccessToken } = useUserContext();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await deleteServerCookie('accessToken');
      setUser(null);
      setAccessToken(null);
      router.replace('/');
    };
    handleSignOut();
  }, [pathname, router, setAccessToken, setUser]);

  return <>Redirecting to login ...</>;
};

export default Logout;
