'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // Importa el router
import config from '@/config';
import Image from 'next/image';
import { fetchUserData, verifyEmail } from '@/libs/api/auth'; // Importa la función register
import { useUserContext } from '@/contexts/user-context';

const VerifyEmail = ({ searchParams }: { searchParams: { token: string } }) => {
  const hasRun = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const router = useRouter();

  const verify = async () => {
    setIsLoading(true);

    try {
      const result = await verifyEmail(searchParams.token);

      if (result.success) {
        toast.success('Login successful!');

        const me = await fetchUserData();

        setUser({ ...me });
        router.replace('/onboarding');
      } else {
        //@ts-ignore
        toast.error(result.error);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='auth-form-main' data-theme={config.colors.theme}>
      <div className='auth-form-container'>
        <div className='flex flex-col gap-2'>
          <Image src='/laboro.png' alt='Logo' width={214} height={58} />
          <h2 className='auth-form-header'>
            Verify an email{' '}
            {isLoading && (
              <span className='loading loading-spinner loading-lg'></span>
            )}
          </h2>

          <div className='auth-form-footer'>
            <p>
              If you are already a member, please{' '}
              <Link href={config.auth.loginUrl} className='text-primary'>
                Sign in
              </Link>
            </p>
            <p>
              If token has expired, You can{' '}
              <Link href='/resend-verification' className='text-primary'>
                request re-verification
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;
