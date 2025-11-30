'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, Suspense } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import config from '@/config';
import Image from 'next/image';
import { fetchUserData, verifyEmail } from '@/libs/api/auth';
import { useUserContext } from '@/contexts/user-context';
import { useSearchParams } from 'next/navigation';

const VerifyEmailContent = () => {
  const hasRun = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { setUser } = useUserContext();
  const router = useRouter();

  const verify = async () => {
    if (!token) {
      toast.error("No token found in URL.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyEmail(token);

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
  }, [token]);

  return (
    <div className='auth-form-container'>
      <div className='flex flex-col gap-2'>
        <Image src='/logo.png' alt='Logo' width={214} height={58} />
        <h2 className='auth-form-header'>
          Verifying email...{' '}
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
  );
};

const VerifyEmail = () => {
  return (
    <main className='auth-form-main' data-theme={config.colors.theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </main>
  );
};

export default VerifyEmail;
