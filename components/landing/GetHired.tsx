import React from 'react';
import Image from 'next/image';
import HiredFlower from '@/public/landing/hired-flower.svg'
import HiredElevator from '@/public/landing/hired-elevator.svg'
import * as motion from "motion/react-client"
import { useScroll, useTransform, useSpring } from "motion/react"

export const GetHired: React.FC = () => {
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"]
  });
  const pathY = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const pathYSpring = useSpring(pathY, { stiffness: 50, damping: 20, restDelta: 0.01 });
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotationSpring = useSpring(rotation, { stiffness: 50, damping: 20, restDelta: 0.01 });


  return (
    <section className='flex flex-col items-center bg-primary-light-purple pt-[191px]'>
      <motion.div style={{ rotate: rotationSpring }}>
        <Image src={HiredFlower} alt='hired-flower' />
      </motion.div>
      <div ref={sectionRef} className="relative flex flex-col mt-[62px] font-josefin-sans text-[200px] tracking-tight text-primary-deep-purple leading-[0.84] relative">
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <motion.div className="absolute -top-[20%] left-[51%] -translate-x-1/2"
          style={{ top: pathYSpring }}
        >
          <Image src={HiredElevator} alt='hired-elevator' />
          <Image src='/landing/hired-dude.png' alt='hired-dude' width={84} height={166} className='absolute left-[45px] bottom-5' />
        </motion.div>
      </div>
    </section>
  );
};