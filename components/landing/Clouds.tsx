import { FC, useRef } from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';
import * as motion from "motion/react-client"
import { useScroll, useTransform, useSpring } from "motion/react"

export const Clouds: FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center end"]
  });

  const leftCloudXRaw = useTransform(scrollYProgress, [0, 1], [-100, 300]);
  const rightCloudXRaw = useTransform(scrollYProgress, [0, 1], [100, -300]);

  const leftCloudX = useSpring(leftCloudXRaw, { stiffness: 50, damping: 20, restDelta: 0.01 });
  const rightCloudX = useSpring(rightCloudXRaw, { stiffness: 50, damping: 20, restDelta: 0.01 });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotationSpring = useSpring(rotation, { stiffness: 50, damping: 20, restDelta: 0.01 });

  return (
    <section ref={sectionRef} className='flex flex-col items-center font-montserrat relative overflow-x-clip'>
      <motion.div style={{ rotate: rotationSpring }} className='w-[40%] md:w-[60%] 2xl:w-full h-auto max-w-[287px] absolute top-[20%] -translate-y-1/2'>
        <Image src='/landing/clouds-sun.png' alt='clouds-sun' width={287} height={287} className='' />
      </motion.div>

      <motion.div
        className='hidden md:block absolute top-[-20%] -left-[600px]'
        style={{ x: leftCloudX }}
      >
        <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} />
      </motion.div>

      <motion.div
        className='hidden md:block absolute top-[-20%] -right-[600px]'
        style={{ x: rightCloudX }}
      >
        <Image src='/landing/clouds.png' alt='clouds' width={1272} height={968} />
      </motion.div>

      <LandingContainer>
        <div className="mt-[100%] lg:mt-[50%] md:mt-[80%]">
          <p className="text-[30px] font-medium leading-[1.1] text-center text-white lg:text-[50px]">
            Spotlight on Our Founders: Media's Fascination with Their Journey
          </p>
        </div>
      </LandingContainer>
    </section>
  );
};
