import React from 'react';
import { LandingContainer } from './LandingContainer';
import { Carousel } from './Carousel';
import Heart from './Heart';
export const Testimonials: React.FC = () => {
  return (
    <section className='bg-primary-light-purple pt-[100px] md:pt-[140px] 2xl:pt-[166px]'>
      <LandingContainer>
        <div className='flex items-center justify-between mb-[150px] gap-[10px]'>
          <Heart />
          <h2 className="text-3xl md:text-[40px] 2xl:text-[50px] font-medium leading-[1.1] text-white">Don’t take our word for it!<br />Hear it from our customers</h2>
          <Heart />
        </div>
        <Carousel />
      </LandingContainer>
    </section>
  );
};