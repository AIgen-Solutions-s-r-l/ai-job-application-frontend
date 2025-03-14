'use client';

import Link from 'next/link';

export const VerifyEmailInstruction = () => (
  <div className='h-screen flex justify-center items-center'>
    <div className='border border-my-neutral-3 rounded-lg p-5 flex flex-col gap-4'>
      <h2>A email has been sent to you!</h2>
      <p>To complete registration, follow the link we sent you in an email.</p>
      <span>
        <Link href='/'>to main page</Link>
      </span>
    </div>
  </div>
);
