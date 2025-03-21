'use client';

import Link from 'next/link';
import Image from 'next/image';
import config from '@/config';

export const VerifyEmailInstruction = () => (
  <main className='auth-form-main' data-theme={config.colors.theme}>
    <div className='auth-form-container'>
      <div className='flex flex-col gap-2'>
        <Image src='/laboro.png' alt='Logo' width={214} height={58} />
        <h2 className='auth-form-header'>A email has been sent to you!</h2>
        <p>
          To complete registration, follow the link we sent you in an email.
        </p>
      </div>

      <div className='auth-form-footer'>
        <Link href='/' className='btn text-primary'>
          to main page
        </Link>
      </div>
    </div>
  </main>
);
