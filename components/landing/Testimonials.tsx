import React from 'react';
import { LandingContainer } from './LandingContainer';
import { Carousel } from './Carousel';

export const Testimonials: React.FC = () => {
  return (
    <section className='bg-primary-light-purple pt-[166px]'>
      <LandingContainer>
        <h2 className="text-[50px] font-medium font-montserrat leading-[55px] text-white mb-[112px]">Don’t take our word for it!<br/>Hear it from our customers</h2>

        <Carousel />
      </LandingContainer>
    </section>
  );
};