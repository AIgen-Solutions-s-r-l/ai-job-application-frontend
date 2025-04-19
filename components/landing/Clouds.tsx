import { FC, useRef } from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';
import * as motion from "motion/react-client"
import { useScroll, useTransform, useSpring } from "motion/react"
import { useWindowSize } from '@/lib/hooks';

export const Clouds: FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center end"]
  });

  // Desktop Version
  const leftCloudXRaw = useTransform(scrollYProgress, [0, 1], [-100, 300]);
  const rightCloudXRaw = useTransform(scrollYProgress, [0, 1], [100, -300]);

  const leftCloudX = useSpring(leftCloudXRaw, { stiffness: 50, damping: 20, restDelta: 0.01 });
  const rightCloudX = useSpring(rightCloudXRaw, { stiffness: 50, damping: 20, restDelta: 0.01 });

  // Mobile Version
  const leftCloudXRawMobile = useTransform(scrollYProgress, [0, 1], [-270, 50]);
  const rightCloudXRawMobile = useTransform(scrollYProgress, [0, 1], [220, -50]);

  const leftCloudXMobile = useSpring(leftCloudXRawMobile, { stiffness: 50, damping: 20, restDelta: 0.01 });
  const rightCloudXMobile = useSpring(rightCloudXRawMobile, { stiffness: 50, damping: 20, restDelta: 0.01 });

  // Rotation
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotationSpring = useSpring(rotation, { stiffness: 50, damping: 20, restDelta: 0.01 });


  // Mobile Size Checker
  const { width } = useWindowSize();
  const isMobile = width <= 1024;

  return (
    <section ref={sectionRef} className='flex flex-col items-center font-montserrat relative overflow-x-clip'>
      <motion.div style={{ rotate: rotationSpring }} className='w-[40%] md:w-[60%] 2xl:w-full h-auto max-w-[287px] absolute top-[10%] md:top-[20%] -translate-y-1/2'>
        <Image src='/landing/clouds-sun.png' alt='clouds-sun' width={287} height={287} className='' />
      </motion.div>

      <motion.div
        className='md:block absolute top-[-20%] -left-[600px]'
        style={{ x: isMobile ? leftCloudXMobile : leftCloudX }}
      >
        <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} />
      </motion.div>

      <motion.div
        className='md:block absolute top-[-20%] -right-[600px]'
        style={{ x: isMobile ? rightCloudXMobile : rightCloudX }}
      >
        <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} />
      </motion.div>

      <LandingContainer>
        <div className="mt-[70%] lg:mt-[25%] text-[25px] font-medium leading-[1.1] text-center text-white lg:text-[40px]">
          <p>
            As Seen In Leading Publications
          </p>
          <p className='text-[25px] lg:text-[30px] mt-[25px] hidden md:block'>
            Our hiring transformation journey has been<br /> featured in major media.
          </p>
        </div>
      </LandingContainer>
    </section>
  );
};
