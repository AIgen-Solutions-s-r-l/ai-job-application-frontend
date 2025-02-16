import React from 'react';
import Image from 'next/image';

export const Spotlight: React.FC = () => {
  return (
    <section className='flex flex-col items-center gap-[70px] bg-primary-light-purple font-montserrat pt-[240px] pb-[180px]'>
      <h2 className="text-[50px] font-medium leading-[55px] text-center text-white">Featured in:</h2>

      <div className="flex gap-[50px] items-center px-[100px] -mt-[40px]">
        <Image src="/landing/spotlight-1.png" alt="spotlight-1" width={652} height={652} className='w-[450px] h-auto' />
        <Image src="/landing/spotlight-2.png" alt="spotlight-2" width={320} height={180} />
        <Image src="/landing/spotlight-3.png" alt="spotlight-3" width={320} height={54} className='mx-[25px]' />
        <Image src="/landing/spotlight-4.png" alt="spotlight-4" width={298} height={298} />
      </div>
    </section>
  );
};