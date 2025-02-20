import React from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';
import * as motion from "motion/react-client"
import { useScroll, useTransform, useSpring } from "motion/react"

export const Clouds: React.FC = () => {
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center end"]
  });

  const leftCloudXRaw = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const rightCloudXRaw = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  const leftCloudX = useSpring(leftCloudXRaw, { stiffness: 50, damping: 20, restDelta: 0.01 });
  const rightCloudX = useSpring(rightCloudXRaw, { stiffness: 50, damping: 20, restDelta: 0.01 });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotationSpring = useSpring(rotation, { stiffness: 50, damping: 20, restDelta: 0.01 });

  return (
    <section ref={sectionRef} className='flex flex-col items-center font-montserrat relative overflow-hidden'>
      <LandingContainer>
        <h2 className="text-heading mb-[80px] md:mb-[120px] 2xl:mb-[194px]">
          The future of employment is HERE & NOW.
        </h2>
      </LandingContainer>

      {/* Left Cloud */}
      <motion.div
        className='hidden md:block absolute top-[50px] -left-[600px]'
        style={{ x: leftCloudX }}
      >
        <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} />
      </motion.div>

      <motion.div
        className='hidden md:block absolute top-[80px] -right-[600px]'
        style={{ x: rightCloudX }}
      >
        <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} />
      </motion.div>

      <motion.div style={{ rotate: rotationSpring }} className='w-[40%] md:w-[60%] 2xl:w-full h-auto max-w-[287px] absolute top-[120px] -right-[70px] md:top-[140px] md:-right-[110px] xl:top-[10%] xl:right-[6%]'>
        <Image src='/landing/clouds-sun.png' alt='clouds-sun' width={287} height={287} className='' />
      </motion.div>

      <Image src='/landing/clouds-astronaut.png' alt='clouds-astronaut' width={595} height={806} className='w-[60%] md:w-[70%] 2xl:w-full h-auto max-w-[595px]' />

      <LandingContainer>
        <div className="bg-my-neutral-7 rounded-[10px] md:rounded-[20px] 2xl:rounded-[45px] p-[10px] md:p-[18px] 2xl:p-[30px]">
          <div className="border border-primary-light-purple rounded-[5px] md:rounded-[11px] 2xl:rounded-[30px] p-[16px] md:p-[30px] 2xl:px-[100px] 2xl:py-[65px]">
            <p className="text-[16px] md:text-[24px] xl:text-[30px] font-extralight leading-[1.2] xl:leading-[1.4] text-white stroked-text">
              LABORO can streamline the application process, tailor resumes to job descriptions, and submit bulk applications to many companies at the same time. This technology can help job seekers navigate the competitive job market more efficiently, making it a game-changer for the future of employment.
            </p>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};
