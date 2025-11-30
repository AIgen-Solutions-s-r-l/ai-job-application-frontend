'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import config from '@/config';
import Image from 'next/image';
import { verifyEmailChange } from '@/libs/api/auth';

const VerifyEmailChange = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const hasRun = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const verify = async () => {
    setIsLoading(true);

    try {
      const result = await verifyEmailChange(searchParams.token);
      if (result.success) {
        toast.success('Email changed!');
        router.replace(config.auth.loginUrl);
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
    if (!searchParams.token) return;
    verify();
  }, [searchParams.token]);

  return (
    <main className='auth-form-main' data-theme={config.colors.theme}>
      <div className='auth-form-container'>
        <div className='flex flex-col gap-2'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={214}
            height={58}
            priority={true}
          />
          <h2 className='auth-form-header'>
            Changing email
            {isLoading && (
              <span className='loading loading-spinner loading-lg'></span>
            )}
          </h2>

          <div className='auth-form-footer'>
            <p className=''>
              If you are already a member, please{' '}
              <Link href={config.auth.loginUrl} className='text-primary'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailChange;
