import React from 'react';
import Image from 'next/image';

export const Spotlight: React.FC = () => {
  return (
    <section className='flex flex-col items-center gap-[70px] bg-primary-light-purple font-montserrat pt-[118px] pb-[180px]'>
      <h2 className="text-[50px] font-medium leading-[55px] text-center text-white">Spotlight on Our Founders: <br/> Media&apos;s Fascination with Their Journey</h2>

      <Image src="/landing/spotlight.png" alt="spotlight" width={313} height={313} />

      <div className="flex gap-[50px] items-center bg-my-neutral-2 rounded-[12px] px-[100px]">
        <Image src="/landing/spotlight-1.png" alt="spotlight-1" width={320} height={180} />
        <Image src="/landing/spotlight-2.png" alt="spotlight-2" width={325} height={87} />
        <Image src="/landing/spotlight-3.png" alt="spotlight-3" width={300} height={245} />
        <Image src="/landing/spotlight-4.png" alt="spotlight-4" width={298} height={298} />
      </div>
    </section>
  );
};