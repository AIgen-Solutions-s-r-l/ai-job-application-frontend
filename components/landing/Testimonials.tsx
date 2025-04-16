import { FC, useRef, useState } from 'react';
import { LandingContainer } from './LandingContainer';
import Heart from './Heart';
import Image from 'next/image';

export const Testimonials: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className='bg-primary-light-purple pt-[100px] md:pt-[140px] 2xl:pt-[166px]'>
      <LandingContainer className='flex flex-col items-center xl:px-[10vw] 2xl:px-[10vw]'>
        <div className='flex items-center justify-between mb-[70px] gap-[10px] lg:w-full'>
          <Heart />
          <h2 className="text-3xl text-center md:text-[35px] 2xl:text-[40px] font-medium leading-[1.1] text-white text-center">
            Don&apos;t take our word for it!<br />Hear it from our customers
          </h2>
          <Heart />
        </div>

        <div className="flex flex-col xl:flex-row justify-between gap-6 w-full">
          <div className="w-full xl:w-1/2 p-4 bg-white/10 rounded-2xl shadow-lg backdrop-blur-sm">
            {!isPlaying && (
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src="/landing/testimonial-1-cover.png"
                  alt="hero-content"
                  width={1000}
                  height={562}
                  className='w-full h-full object-cover cursor-pointer'
                  onClick={handleVideoClick}
                />
              </div>
            )}
            <video
              ref={videoRef}
              className={`w-full aspect-video ${!isPlaying ? 'hidden' : ''} rounded-lg`}
              controls={isPlaying}
            >
              <source src="https://laborovideos.s3.eu-central-1.amazonaws.com/testimonial+v4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="w-full xl:w-1/2 p-4 bg-white/10 rounded-2xl shadow-lg backdrop-blur-sm">
            {/* <video
              ref={videoRef}
              className="w-full h-auto rounded-lg"
              controls
              autoPlay={false}
              playsInline
            >
              <source src="" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
          </div>
        </div>

        {/* Optional click image */}
        {/* {!isPlaying && (
          <Image
            src="/landing/hero-click.png"
            alt="hero-click"
            width={133}
            height={142}
            className='w-[50px] md:w-[100px] 2xl:w-[133px] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          />
        )} */}

        {/* <Carousel /> */}
      </LandingContainer>
    </section>
  );
};