import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Automate1 from '@/public/landing/automate-1.svg';
import Automate2 from '@/public/landing/automate-2.svg';
import Automate3 from '@/public/landing/automate-3.svg';
import LaboroSmiley from '@/public/landing/laboro-smiley.svg';
import AutomateItemArrow from '@/public/landing/automate-item-arrow.svg';
import AutomateItemCheck from '@/public/landing/automate-item-check.svg';
import AutomateEyeBase from '@/public/landing/automate-eye-base.svg';
import * as motion from "motion/react-client"
import { useScroll, useTransform } from "motion/react"
import { LandingContainer } from './LandingContainer';
import { CheckmarkIcon } from '../AppIcons';

export const Automate: React.FC = () => {

  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const eyeBall = useRef<HTMLDivElement>(null);
  const eyeContainer = useRef<HTMLDivElement>(null);

  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center end"]
  });

  const pathX = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.7, 0.8, 0.9, 1], ['0%', '96%', '96%', '-4%', '-4%', '45%', '45%']);
  const pathY = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.7, 0.8, 0.9, 1], [-20, -20, 120, 120, 220, 220, 300]);

  const calculateEyePosition = () => {
    if (!eyeBall.current || !eyeContainer.current) return { x: 0, y: 0 };

    const eye = eyeContainer.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const angle = Math.atan2(mouseCoordinates.y - eyeCenterY, mouseCoordinates.x - eyeCenterX);

    const maxRadius = (eye.width - eyeBall.current.offsetWidth) / 2;
    const x = Math.cos(angle) * maxRadius;
    const y = Math.sin(angle) * maxRadius;

    return { x, y };
  };

  const handleMouseMove = (event: MouseEvent) => {
    setMouseCoordinates({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const eyePosition = calculateEyePosition();

  return (
    <section ref={sectionRef} className='bg-my-neutral-2 font-montserrat pt-[80px] md:pt-[120px] xl:pt-[150px] pb-[270px] md:pb-[340px]'>
      <LandingContainer>
        <div className='w-full max-w-[1236px] mx-auto flex flex-col items-center'>
          <h2 className="w-full text-3xl md:text-[40px] 2xl:text-[50px] leading-none text-my-neutral-6 mb-[15px] xl:mb-[25px] tracking-tight">Automate your job hunt and save hours & days by</h2>

          <div className="relative">
            <Image src={Automate1} alt='Automate1' />
            <motion.div
              className='hidden xl:block w-[100px] h-[100px] absolute -top-[20px] left-[0px]'
              style={{
                left: pathX,
                top: pathY,
              }}
            >
              <Image src={LaboroSmiley} alt='laboro-smiley' />
            </motion.div>
          </div>

          <div className="w-full flex flex-col items-center gap-[8px] mt-[24px] mb-[18px] md:gap-[15px] md:mt-[33px] md:mb-[22px]">
            <AutomateItem text='Get matched with top jobs from 100K+ sources' />
            <AutomateItem text='Generate a tailored resume for each role' />
            <AutomateItem text='Craft a unique cover letter for every job' />
            <AutomateItem text='Apply automatically across all platforms' featured />
          </div>

          <Image src={Automate2} alt='Automate2' />

          <p className="w-full text-3xl md:text-[38px] 2xl:text-[40px] leading-none text-my-neutral-6 tracking-tight my-[25px] xl:my-[50px]">
            Fully Automated job hunting process, <br />
            from <span className='font-semibold'>search</span> to <span className='font-semibold'>resume-editing</span> & <span className='font-semibold'>cover letter <br />
              creation</span>, to <span className='font-semibold'>submitting job applications</span>.
          </p>

          <div className="w-full">
            <Image src={Automate3} alt='Automate3' width={638} height={170} className='w-[200px] md:w-[340px] lg:w-[460px] xl:w-[638px] h-auto ml-2 md:ml-5' />
          </div>

          <p className="text-3xl md:text-[40px] 2xl:text-[45px] font-semibold text-my-neutral-6 tracking-tight leading-none text-center mt-[18px] mb-[88px] xl:mt-[33px] xl:mb-[122px]">So you can enjoy your time.</p>
          <div className="md:w-[505px] relative mx-auto">
            <div className="w-max relative mx-auto">
              <Image src={AutomateEyeBase} alt="automate-eye-base" />
              <div
                ref={eyeContainer}
                className="w-[138px] h-[138px] rounded-full bg-my-neutral-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  ref={eyeBall}
                  className="w-[72px] h-[72px] rounded-full bg-white absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${eyePosition.x}px), calc(-50% + ${eyePosition.y}px))`
                  }}
                ></div>
              </div>
            </div>
            <Image src='/landing/automate-laptop.png' alt="automate-laptop" width={505} height={339} className='absolute top-[100px]' />
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};

const AutomateItem: React.FC<{ text: string, featured?: boolean }> = ({ text, featured = false }) => {
  return (
    <div className="w-full flex text-white">
      <div className={`flex items-center justify-between flex-grow px-[16px] md:px-[24px] xl:px-[60px] py-[18px] md:py-[22px] xl:py-[24px] rounded-full ${featured ? 'bg-splash-fucshia' : 'bg-primary-deep-purple'}`}>
        <h4 className="text-[18px] md:text-[20px] xl:text-[32px] tracking-tight leading-none">{text}</h4>
        <Image src={AutomateItemArrow} alt='automate-item-arrow' className='hidden md:block' />
      </div>
      <div className={`flex items-center justify-center shrink-0 w-[60px] h-[60px] md:w-[70px] md:h-[70px] xl:w-[80px] xl:h-[80px] rounded-full ${featured ? 'bg-splash-fucshia' : 'bg-primary-deep-purple'}`}>
        <CheckmarkIcon classname='w-[30px] xl:w-[40px] h-auto' />
      </div>
    </div>
  );
};