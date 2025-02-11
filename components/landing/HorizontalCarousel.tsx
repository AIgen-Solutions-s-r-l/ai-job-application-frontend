'use client';

import React from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const HorizontalCarousel: React.FC = () => {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel: React.FC = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          <div
            className="features-slide justify-end font-montserra"
          >
            <Image src='/landing/feature-1.png' alt='feature-1' width={405} height={100} />
  
            <p className="mt-[33px] text-[50px] font-light leading-[1.1] text-white">300K+ Followers</p>
  
            <p className="mt-[8px] text-[24px] font-medium leading-none text-white">on social platforms (Instagram, Github)</p>
          </div>
          <div
            className="features-slide justify-end relative overflow-visible font-k2d"
          >
            <Image src='/landing/feature-2.png' alt='feature-2' width={755} height={82} className='scale-125 absolute top-[20px] left-0 z-10' />
  
            <p className="text-[30px] font-thin text-white leading-[1.2]">1- Upload your resume</p>
            <p className="text-[30px] font-thin text-white leading-[1.2]">2- Find matching jobs</p>
            <p className="text-[30px] font-semibold text-white leading-[1.2]">3- Laboro creates a set of resume and cover letter for each job application</p>
            <p className="text-[30px] font-semibold text-splash-green leading-[1.2]">4- Auto-apply to many jobs at once!</p>
          </div>
          <div
            className="features-slide font-k2d"
          >
            <p className="text-[50px] leading-[1.1] font-thin text-white">
              We currently have<br/>
              300.021 Job Posts,<br/>
              from <span className='text-splash-green'>465 companies!</span>
            </p>
          </div>
          <div
            className="features-slide items-center font-montserrat"
          >
            <p className="text-white text-[32px] leading-none">Companies hiring now</p>
  
            <Image src='/landing/feature-4.png' alt='feature-4' width={420} height={264} />
          </div>
          <div
            className="flex flex-row flex-none snap-start w-[640px] h-[365px] rounded-[40px] px-[40px] py-[30px] border-4 border-splash-green bg-primary-deep-purple items-center gap-[15px] font-montserrat"
          >
            <div className="w-[335px]">
              <p className="text-[24px] leading-[1.1] text-primary-light-purple-gray">
                Your chance to<br/>
                <span className="text-splash-orange">get hired</span> with<br/>
                our <span className="text-splash-green">AI-automated</span><br/>
                job application<br/>
                system is <span className='text-splash-orange'>higher</span>, since you can apply to many jobs with <span className="text-white">perfectly matching resume & cover letters.</span>
              </p>
            </div>
  
            <Image src='/landing/feature-5.png' alt='feature-5' width={200} height={277} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

