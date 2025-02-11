import React from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';

export const Clouds: React.FC = () => {
  return (
    <section className='flex flex-col items-center bg-primary-light-purple font-montserrat relative overflow-hidden'>
      <h2 className="text-[50px] font-medium leading-[55px] text-center text-white mb-[194px]">The future of employment is HERE & NOW.</h2>

      <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} className='absolute top-[50px] -left-[600px]' />
      <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} className='absolute top-[80px] -right-[600px]' />
      <Image src='/landing/clouds-sun.png' alt='clouds-sun' width={287} height={287} className='absolute top-[160px] right-[200px]' />

      <Image src='/landing/clouds-astronaut.png' alt='clouds-astronaut' width={595} height={806} />

      <LandingContainer>
        <div className="bg-my-neutral-7 rounded-[45px] p-[30px]">
          <div className="border border-primary-light-purple rounded-[30px] px-[100px] py-[65px]">
            <p className="text-[30px] font-extralight leading-[140%] text-white stroked-text">
              LABORO can streamline the application process, tailor resumes to job descriptions, and submit bulk applications to many companies at the same time. This technology can help job seekers navigate the competitive job market more efficiently, making it a game-changer for the future of employment.
            </p>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};