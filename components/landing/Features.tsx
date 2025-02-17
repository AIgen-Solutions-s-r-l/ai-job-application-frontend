'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "motion/react";
import Image from "next/image";

export const Features: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
  const [dimensions, setDimensions] = useState(0);
 
  const targetRef = useRef(null);
  
  useEffect(() => {
    setIsClient(true)
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
      test()
    }
  }, [])
  
  // const windowWidth = useRef(window.innerWidth);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]));
  const xtra = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-67%"]));
  let say;

  // if (typeof window !== "undefined") {
  //   console.log('window check: ', window)
  // }

  function test() {
    console.log("this shit is running: ", dimensions)
    if (dimensions > 720) {
      if (dimensions < 1280) {
        say = xtra
      }
      say = x
    }
    say = null
  }

  if (!isClient) {
    return <section className="bg-primary-light-purple h-[100vh]"></section>
  }

  return (
    <section ref={targetRef} className="bg-primary-light-purple relative h-[300vh]">
      <div className="sticky top-0 flex flex-col gap-[150px] pt-[100px] h-screen overflow-hidden">
        <div className="sticky left-0 w-full flex flex-col items-center gap-10 font-montserrat">
          <h2 className="text-[50px] font-medium leading-[55px] text-center text-white">All the jobs on the internet, in one place.</h2>
          <p className="text-[20px] text-primary-deep-purple leading-[120%] text-center">Laboro collects opportunities from every website and job board, <br/>automates your applications, and matches you with the perfect role, <br/>saving you time and effort. Bring the power back to job seekers.</p>
        </div>
        
        <motion.div style={{ x: say }} className="grid grid-cols-5 gap-4 w-[300vw] 2xl:w-[200vw] h-[40vh] px-[70px]">
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
            className="features-slide flex-row bg-primary-deep-purple items-center gap-[15px] font-montserrat"
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