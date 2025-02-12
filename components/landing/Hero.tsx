import React from 'react';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section className='flex flex-col items-center gap-[85px] bg-primary-light-purple font-montserrat pt-[90px]'>
      <h1 className="text-[50px] font-medium leading-[65px] text-center text-white">Auto-apply fast with AI. <br/>Get your dream job while sleeping</h1>

      <div className="relative">
        <Image src="/landing/hero-screen.png" alt="hero-screen" width={1204} height={1042} />
        <Image src="/landing/hero-content.png" alt="hero-content" width={1078} height={676} className='absolute top-[56px] left-[63px]' />
        <Image src="/landing/hero-click.png" alt="hero-click" width={133} height={142} className='absolute top-[450px] left-[545px]' />
      </div>
    </section>
  );
};