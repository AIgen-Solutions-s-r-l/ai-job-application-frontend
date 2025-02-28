'use client';

import { FC, useRef, memo } from "react";
import { motion, useTransform, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useWindowSize } from "@/lib/hooks";

const MobileFeatures: FC = () => {
  return (
    <section className="py-12 px-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mb-12">
        <h2 className="text-3xl font-medium text-center text-white">
          All the jobs on the internet, in one place.
        </h2>
        <p className="text-base text-primary-deep-purple text-center">
          Laboro collects opportunities from every website and job board,
          automates your applications, and matches you with the perfect role,
          saving you time and effort.
        </p>
      </div>

      {/* Features Grid */}
      <div className="flex flex-col gap-8">
        {/* Feature 1 */}
        <div className="bg-primary-deep-purple/10 p-6 rounded-lg">
          <Image
            src='/landing/feature-1.png'
            alt='feature-1'
            width={300}
            height={75}
            className="w-full max-w-[300px] mx-auto"
          />
          <p className="mt-4 text-2xl font-light text-white text-center">
            300K+ Followers
          </p>
          <p className="mt-2 text-lg font-medium text-white text-center">
            on social platforms (Instagram, Github)
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-primary-deep-purple/10 p-6 rounded-lg">
          <div className="space-y-3">
            <p className="text-xl font-thin text-white">1- Upload your resume</p>
            <p className="text-xl font-thin text-white">2- Find matching jobs</p>
            <p className="text-xl font-semibold text-white">
              3- Laboro creates a set of resume and cover letter
            </p>
            <p className="text-xl font-semibold text-splash-green">
              4- Auto-apply to many jobs at once!
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-primary-deep-purple/10 p-6 rounded-lg">
          <p className="text-2xl font-thin text-white">
            We currently have<br />
            300.021 Job Posts,<br />
            from <span className="text-splash-green">465 companies!</span>
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-primary-deep-purple/10 p-6 rounded-lg">
          <p className="text-xl text-white text-center mb-4">
            Companies hiring now
          </p>
          <Image
            src='/landing/feature-4.png'
            alt='feature-4'
            width={300}
            height={188}
            className="w-full max-w-[300px] mx-auto"
          />
        </div>

        {/* Feature 5 */}
        <div className="bg-primary-deep-purple p-6 rounded-lg">
          <p className="text-lg leading-relaxed text-primary-light-purple-gray mb-4">
            Your chance to
            <span className="text-splash-orange"> get hired</span> with
            our <span className="text-splash-green">AI-automated</span>
            job application
            system is <span className="text-splash-orange">higher</span>,
            since you can apply to many jobs with
            <span className="text-white"> perfectly matching resume & cover letters.</span>
          </p>
          <Image
            src='/landing/feature-5.png'
            alt='feature-5'
            width={150}
            height={207}
            className="w-full max-w-[150px] mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export const DesktopFeatures: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  // Create smooth scroll progress
  const smoothProgress = useSpring(scrollXProgress, {
    damping: 50,
    stiffness: 400
  });

  // Transform the content based on scroll
  const translateX = useTransform(smoothProgress, [0, 1], ['0%', '-50%']);

  // Calculate active dot based on scroll progress
  const activeDot = useTransform(smoothProgress, (value) => {
    if (value < 0.33) return 0;
    if (value < 0.66) return 1;
    return 2;
  });

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth;
      const targetScroll = (scrollWidth * index) / 2; // Divide by 2 since we have 3 sections
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="flex flex-col relative px-12 pb-[200px]">
      <div className="flex flex-col gap-[100px] 2xl:gap-[150px] pt-[80px] 2xl:pt-[100px]">

        <div className="overflow-x-auto scrollbar-hide no-scrollbar" ref={containerRef}>
          <motion.div
            className="flex flex-row gap-4 w-[100%] h-[33vh]"
            style={{ x: translateX }}
          >
            <div
              className="features-slide justify-end font-montserra"
            >
              <Image src='/landing/feature-1.png' alt='feature-1' width={305} height={100} />

              <p className="mt-[33px] text-[20px] xl:text-[34px] font-light leading-[1.1] text-white">300K+ Followers</p>

              <p className="mt-[8px] text-[20px] xl:text-[20px] font-medium leading-none text-white">on social platforms (Instagram, Github)</p>
            </div>

            <div
              className="features-slide justify-end relative overflow-visible font-k2d"
            >
              <Image src='/landing/feature-2.png' alt='feature-2' width={755} height={82} className='scale-125 absolute top-[20px] left-0 z-20' />

              <p className="text-[20px] 2xl:text-[25px] font-thin text-white leading-[1.2]">1- Upload your resume</p>
              <p className="text-[20px] 2xl:text-[25px] font-thin text-white leading-[1.2]">2- Find matching jobs</p>
              <p className="text-[20px] 2xl:text-[24px] font-semibold text-white leading-[1.2]">3- Laboro creates a set of resume and cover letter for each job application</p>
              <p className="text-[20px] 2xl:text-[24px] font-semibold text-splash-green leading-[1.2]">4- Auto-apply to many jobs at once!</p>
            </div>

            <div
              className="flex items-center features-slide font-k2d justify-start"
            >
              <p className="text-[35px] 2xl:text-[40px] leading-[1.1] font-thin text-white">
                We currently have<br />
                300.021 Job Posts,<br />
                from <span className='text-splash-green'>465 companies!</span>
              </p>
            </div>

            <div
              className="features-slide items-center justify-center font-montserrat"
            >
              <p className="text-white text-[22px] 2xl:text-[28px] leading-none">Companies hiring now</p>

              <Image src='/landing/feature-4.png' alt='feature-4' width={350} height={264} />
            </div>

            <div
              className="features-slide flex-row bg-primary-deep-purple items-center justify-center gap-[15px] font-montserrat"
            >
              <div className="w-[335px]">
                <p className="text-[18px] 2xl:text-[20px] leading-[1.1] text-primary-light-purple-gray">
                  Your chance to<br />
                  <span className="text-splash-orange">get hired</span> with<br />
                  our <span className="text-splash-green">AI-automated</span><br />
                  job application<br />
                  system is <span className='text-splash-orange'>higher</span>, since you can apply to many jobs with <span className="text-white">perfectly matching resume & cover letters.</span>
                </p>
              </div>

              <Image src='/landing/feature-5.png' alt='feature-5' width={200} height={277} />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="w-2 h-2 rounded-full cursor-pointer"
            style={{
              backgroundColor: 'black',
              opacity: useTransform(activeDot, (active) => active === index ? 1 : 0.5)
            }}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </div>
    </section>
  );
};

export const Features: FC = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 1024;

  const MemoizedMobileFeatures = memo(MobileFeatures);
  const MemoizedDesktopFeatures = memo(DesktopFeatures);

  if (!width) {
    return (
      <section className="h-[100vh]"></section>
    );
  }

  return isMobile ? <MemoizedMobileFeatures /> : <MemoizedDesktopFeatures />;
};