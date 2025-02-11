import React from 'react';
import { FeaturesCarousel } from './FeaturesCarousel';
import { LandingContainer } from './LandingContainer';

export const Features: React.FC = () => {
  return (
    <section className='bg-primary-light-purple pt-[15px] pb-[190px] overflow-hidden'>
      <div className="flex flex-col items-center gap-10 font-montserrat mb-[80px]">
        <h2 className="text-[50px] font-medium leading-[55px] text-center text-white">All the jobs on the internet, in one place.</h2>
        <p className="text-[20px] text-primary-deep-purple leading-[120%] text-center">Laboro collects opportunities from every website and job board, <br/>automates your applications, and matches you with the perfect role, <br/>saving you time and effort. Bring the power back to job seekers.</p>
      </div>

      <LandingContainer>
        <FeaturesCarousel />
      </LandingContainer>
    </section>
  );
};