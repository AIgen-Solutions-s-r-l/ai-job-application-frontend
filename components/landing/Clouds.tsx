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

  const leftCloudXRaw = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const rightCloudXRaw = useTransform(scrollYProgress, [0, 1], [300, 0]);

  const leftCloudX = useSpring(leftCloudXRaw, { stiffness: 50, damping: 20, restDelta: 0.01 });
  const rightCloudX = useSpring(rightCloudXRaw, { stiffness: 50, damping: 20, restDelta: 0.01 });

  return (
    <section ref={sectionRef} className='flex flex-col items-center bg-primary-light-purple font-montserrat relative overflow-hidden'>
      <h2 className="text-[50px] font-medium leading-[55px] text-center text-white mb-[194px]">
        The future of employment is HERE & NOW.
      </h2>

      {/* Left Cloud */}
      <motion.div
        className='absolute top-[50px] -left-[600px]'
        style={{ x: leftCloudX }}
      >
        <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} />
      </motion.div>

      <motion.div
        className='absolute top-[80px] -right-[600px]'
        style={{ x: rightCloudX }}
      >
        <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} />
      </motion.div>

      <Image src='/landing/clouds-sun.png' alt='clouds-sun' width={287} height={287} className='absolute top-[160px] right-[200px]' />
      <Image src='/landing/clouds-astronaut.png' alt='clouds-astronaut' width={595} height={806} />

      <LandingContainer>
        <div className="bg-my-neutral-7 rounded-[45px] p-[30px]">
          <div className="border border-primary-light-purple rounded-[30px] px-[100px] py-[65px]">
            <p className="text-[30px] font-extralight leading-[140%] text-white stroked-text">
              LABORO can streamline the application process, tailor resumes to job descriptions, and submit bulk applications to many companies at the same time. This technology can help job seekers navigate the competitive job market more efficiently, making it a game-changer for the future of employment.
            </p>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};
