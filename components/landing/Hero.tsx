'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';

export const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <LandingContainer className=' mb:px-[20vw]'>
      <section className='flex flex-col items-center gap-[20px] md:gap-[25px] 2xl:gap-[35px] font-montserrat pt-[50px] 2xl:pt-[45px]'>
        <h1 className="text-heading">Auto-apply fast with AI.<br /> Get your dream job while sleeping</h1>
        <div className="relative w-[100%] md:w-[68%] max-w-[1204px]">
          <Image src="/landing/hero-screen.png" alt="hero-screen" width={1204} height={1042} className='w-full h-auto max-w-[1204px] z-2' />
          <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1078px] z-1">
            {!isPlaying && (
              <Image
                src="/landing/hero-content.png"
                alt="hero-content"
                width={1078}
                height={676}
                className='w-full h-auto cursor-pointer'
                onClick={handleVideoClick}
              />
            )}
            <video
              ref={videoRef}
              className={`w-full h-auto ${!isPlaying ? 'hidden' : ''}`}
              controls={isPlaying}
              playsInline
            >
              <source src="/landing/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {!isPlaying && (
            <Image
              src="/landing/hero-click.png"
              alt="hero-click"
              width={133}
              height={142}
              className='w-[50px] md:w-[100px] 2xl:w-[133px] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            />
          )}
        </div>
      </section>
    </LandingContainer>
  );
};