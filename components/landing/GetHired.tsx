import { FC, useRef } from 'react';
import Image from 'next/image';
import HiredFlower from '@/public/landing/hired-flower.svg'
import * as motion from "motion/react-client"
import { useScroll, useTransform, useSpring } from "motion/react"
import ContactsArrow from '@/public/landing/contacts-arrow.svg';

export const GetHired: FC = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"]
  });

  const { scrollYProgress: buttonScrollProgress } = useScroll({
    target: buttonRef,
    offset: ["start 100%", "start 70%"]
  });

  const pathY = useTransform(scrollYProgress, [0, 1], ['0%', '65%']);
  const pathYSpring = useSpring(pathY, { stiffness: 50, damping: 20, restDelta: 0.01 });
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotationSpring = useSpring(rotation, { stiffness: 50, damping: 20, restDelta: 0.01 });

  const backgroundColor = useTransform(
    buttonScrollProgress,
    [0, 1],
    ['#B9FF5E"', '#EE3449']
  );

  return (
    <section className='flex flex-col items-center bg-primary-light-purple pt-[65px] md:pt-[140px] xl:pt-[191px] pb-[70px] pb-[150px]'>
      <motion.div style={{ rotate: rotationSpring }}>
        <Image src={HiredFlower} alt='hired-flower' width={250} height={250} />
      </motion.div>
      <div ref={sectionRef} className="relative flex flex-col mt-[62px] font-josefin-sans text-[80px] md:text-[130px] xl:text-[140px] tracking-tight text-primary-deep-purple leading-[0.84]">
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <motion.div className="absolute -top-[20%] left-[51%] -translate-x-1/2 w-[80px] h-[150px] md:w-[160px] md:h-[240px] xl:w-[140px] xl:h-[270px] border-[10px] md:border-[20px] border-black"
          style={{ top: pathYSpring }}
        >
          <Image src='/landing/hired-dude.png' alt='hired-dude' width={127} height={244} className='w-[50px] md:w-[100px] xl:w-[90px] h-auto absolute left-[6px] bottom-0' />
        </motion.div>
      </div>

      <motion.a
        ref={buttonRef}
        href="/signup"
        className="mt-12 sm:mt-20 h-[60px] md:h-[65px] px-[30px] flex items-center justify-between rounded-[20px] gap-[50px]"
        style={{ backgroundColor }}
      >
        <p className="text-[27px] md:text-[32px] font-light font-k2d text-my-neutral-7 leading-none">Sign up</p>
        <div className='hidden lg:block md:block'>
          <Image
            src={ContactsArrow}
            alt="signup-arrow"
            className="mt-1"
          />
        </div>
      </motion.a>
    </section>
  );
};