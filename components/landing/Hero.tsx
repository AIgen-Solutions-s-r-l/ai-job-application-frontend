'use client';

import { useRef, useState, useEffect, FC } from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';
import ContactsArrow from '@/public/landing/contacts-arrow.svg';
import Stars from '@/public/landing/Stars.svg';
import Faces from '@/public/landing/Faces.svg';

export const Hero: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(15);
  const browserRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (browserRef.current) {
        const scrollPosition = window.scrollY;
        const maxRotation = 15;
        const scrollThreshold = 500;
        const rotation = Math.max(maxRotation - (scrollPosition / scrollThreshold) * maxRotation, 0);
        setScrollRotation(rotation);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LandingContainer className='pt-[5vh]'>
      <section className='flex flex-col items-center gap-[15px] sm:gap-[20px] md:gap-[25px] 2xl:gap-[35px] font-montserrat px-0 sm:px-6 md:px-8 pb-[80px] lg:pb-[0px]'>
        <h1 className="text-heading animate-fadeIn text-[26px] sm:text-[40px] md:text-[50px] text-center leading-tight">
          <span className='text-splash-green'>Auto-apply fast</span> with AI.<br className="hidden sm:block" /> Get your dream job while sleeping.
        </h1>
        <h2 className="text-center text-[16px] sm:text-[24px] md:text-[30px] font-montserrat font-normal font-[300] leading-[110%] tracking-[-0.66px] text-neutral-cold-1 max-w-[800px]">
          <strong>Find & Apply</strong> 1000s of Jobs instantly.
        </h2>
        <a
          href="/signup"
          className="hover:bg-my-neutral-2 transition-all ease-in duration-300 bg-splash-green h-[40px] sm:h-[55px] md:h-[60px] px-[20px] sm:px-[25px] md:px-[30px] flex items-center justify-center sm:justify-between rounded-[20px] gap-[30px] sm:gap-[40px] md:gap-[50px] w-[55vw] sm:w-auto"
        >
          <p className="text-[20px] sm:text-[24px] md:text-[27px] lg:text-[32px] font-light font-k2d text-my-neutral-7 leading-none ">Get Started</p>
            <div className='hidden sm:block'>
            <Image
              src={ContactsArrow}
              alt="signup-arrow"
              className="mt-1 w-[150px] h-[100px]"
            />
            </div>
        </a>
        <div className='flex gap-2 items-center'>
          <Image src={Faces} alt='Faces' className="w-[55px] sm:w-[50px] md:w-auto" />
          <div className='flex flex-col'>
            <Image src={Stars} alt='Stars' className="w-[80px] sm:w-[100px] md:w-[125px]" />
            <p className="text-white font-montserrat text-sm sm:text-base font-normal font-medium leading-[110%] text-my-neutral-1">Trusted by 400K job seekers </p>
          </div>
        </div>
        <div className="relative w-[75vw] md:w-[65%] max-w-[1204px] animate-scaleIn mt-4 sm:mt-6 md:mt-8">
          <div
            ref={browserRef}
            className="relative rounded-[34px] overflow-hidden bg-[#E9E3EE] border-[6px] border-[#D9D9D9] shadow-browser"
            style={{
              transform: `translateX(-50%) perspective(1200px) rotateX(${scrollRotation}deg)`,
              transformOrigin: 'center top',
              left: '50%'
            }}
          >
            <div className="flex gap-4 h-[60px] bg-[#E9E3EE] border-b border-[#E5E5E5] flex items-center px-4 sm:px-8 py-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
              </div>
              <div className="w-full bg-[#DFD0EB] px-4 py-1 rounded-[36px] text-sm text-gray-600 flex items-center">
                <span>laboro.co</span>
              </div>
            </div>
            <div className="relative w-full aspect-[1004/655] overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%]">
                <div className='relative w-full aspect-[1078/676]'>
                  <div className="absolute inset-0 shadow-custominset pointer-events-none z-10"></div>
                  {!isPlaying && (
                    <div className="relative w-full h-full">
                      <Image
                        src="/landing/hero-content.png"
                        alt="hero-content"
                        width={1078}
                        height={676}
                        className='w-full h-full object-contain'
                      />
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        onClick={handleVideoClick}
                      >
                        <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]">
                          <div className="absolute inset-0 bg-my-neutral-5/90 rounded-full group-hover:bg-my-neutral-5/90 transition-all duration-300 border-[8px] group-hover:border-[12px] border-primary-light-purple border-[10px]"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2 group-hover:scale-110 transition-transform duration-300"></div>
                          </div>
                        </div>
                        <div className="mt-2 bg-my-neutral-5/90 rounded-full px-3 py-1 border-primary-light-purple border-[3px]">
                          <p className="text-white text-center text-sm sm:text-base font-montserrat font-medium">30 sec</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    className={`w-full h-full object-contain ${!isPlaying ? 'hidden' : ''}`}
                    controls={isPlaying}
                    playsInline
                  >
                    <source src="https://laborovideos.s3.eu-central-1.amazonaws.com/hero-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingContainer>
  );
};