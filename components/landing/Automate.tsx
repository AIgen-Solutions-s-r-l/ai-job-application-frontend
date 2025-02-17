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
    <section ref={sectionRef} className='bg-my-neutral-2 font-montserrat pt-[176px] pb-[150px]'>
      <div className="w-max mx-auto">
        <h2 className="text-[50px] leading-none text-my-neutral-6 mb-[25px] tracking-tight">Automate your job hunt and save hours & days by</h2>

        <div className="w-max relative">
          <Image src={Automate1} alt='Automate1' />
          <motion.div
            className='w-[100px] h-[100px] absolute -top-[20px] left-[0px]'
            style={{
              left: pathX,
              top: pathY,
            }}
          >
            <Image src={LaboroSmiley} alt='laboro-smiley' />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-[15px] mt-[33px] mb-[22px]">
          <AutomateItem text='Get matched with top jobs from 100K+ sources' />
          <AutomateItem text='Generate a tailored resume for each role' />
          <AutomateItem text='Craft a unique cover letter for every job' />
          <AutomateItem text='Apply automatically across all platforms' featured />
        </div>

        <div className="w-[1178px] h-[141px] relative">
          <Image src={Automate2} alt='Automate2' fill />
        </div>

        <p className="text-[50px] leading-none text-my-neutral-6 tracking-tight mt-[50px] mb-[50px]">
          Fully Automated job hunting process, <br />
          from <span className='font-semibold'>search</span> to <span className='font-semibold'>resume-editing</span> & <span className='font-semibold'>cover letter <br />
            creation</span>, to <span className='font-semibold'>submitting job applications</span>.
        </p>

        <div className="w-max relative ml-[20px]">
          <Image src={Automate3} alt='Automate3' />
        </div>

        <p className="text-[50px] font-semibold text-my-neutral-6 tracking-tight leading-none text-center mt-[33px] mb-[122px]">So you can enjoy your time.</p>

        <div className="w-[505px] h-[440px] relative mx-auto">
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
    </section>
  );
};

const AutomateItem: React.FC<{ text: string, featured?: boolean }> = ({ text, featured = false }) => {
  return (
    <div className="flex text-white">
      <div className={`flex items-center justify-between w-[1114px] h-[112px] px-[60px] rounded-full ${featured ? 'bg-splash-fucshia' : 'bg-primary-deep-purple'}`}>
        <h4 className="text-[40px] tracking-tight">{text}</h4>
        <Image src={AutomateItemArrow} alt='automate-item-arrow' />
      </div>
      <div className={`flex items-center justify-center w-[112px] h-[112px] rounded-full ${featured ? 'bg-splash-fucshia' : 'bg-primary-deep-purple'}`}>
        <Image src={AutomateItemCheck} alt='automate-item-check' />
      </div>
    </div>
  );
};