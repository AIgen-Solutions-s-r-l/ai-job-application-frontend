import { FC } from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';

export const Spotlight: FC = () => {
  return (
    <LandingContainer>
      <section className='flex flex-col items-center gap-[70px] xl:gap-[100px] bg-primary-light-purple font-montserrat py-[120px] md:py-[180px] 2xl:py-[240px]'>
        <h2 className="text-heading">Featured in:</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-14 items-center justify-items-center 2xl:px-[100px] -mt-[40px]">
          <Image src="/landing/spotlight-1.png" alt="spotlight-1" width={652} height={180} />
          <Image src="/landing/spotlight-2.png" alt="spotlight-2" width={320} height={180} />
          <Image src="/landing/spotlight-3.png" alt="spotlight-3" width={120} height={54} />
          <Image src="/landing/spotlight-4.png" alt="spotlight-4" width={298} height={150} />
        </div>
      </section>
    </LandingContainer>
  );
};