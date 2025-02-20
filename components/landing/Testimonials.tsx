import React from 'react';
import { LandingContainer } from './LandingContainer';
import { Carousel } from './Carousel';

export const Testimonials: React.FC = () => {
  return (
    <section className='bg-primary-light-purple pt-[100px] md:pt-[140px] 2xl:pt-[166px]'>
      <LandingContainer>
        <h2 className="text-3xl md:text-[40px] 2xl:text-[50px] font-medium leading-[1.1] text-white mb-[112px]">Don’t take our word for it!<br/>Hear it from our customers</h2>

        <Carousel />
      </LandingContainer>
    </section>
  );
};