import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactsArrow from '@/public/landing/contacts-arrow.svg'
import ContactsEyeBase from '@/public/landing/contacts-eye-base.svg'

export const Contacts: React.FC = () => {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const eyeBall = useRef<HTMLDivElement>(null);
  const eyeContainer = useRef<HTMLDivElement>(null);

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
    <section className='flex flex-col items-center bg-primary-light-purple pt-[100px] md:pt-[120px] pb-[300px] md:pb-[400px]'>
      <Link className='h-[60px] md:h-[74px] px-[20px] md:px-[36px] flex items-center justify-between bg-splash-green rounded-[20px] gap-[10px] md:gap-[50px]' href='/signin'>
        <p className='text-[27px] md:text-[32px] font-light font-k2d text-my-neutral-7 leading-none'>Try it</p>
        <Image src={ContactsArrow} alt="contacts-arrow" className='mt-1' />
      </Link>

      <div className="w-max relative mx-auto mt-[180px] mb-[40px] md:mt-[210px] md:mb-[58px]">
        <Image src={ContactsEyeBase} alt="contacts-eye-base" />
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

      <h3 className="font-montserrat text-[30px] md:text-[36px] font-medium text-white leading-none mb-[38px]">Contact Us</h3>
      <p className="font-montserrat text-[21px] md:text-[24px] font-medium text-white leading-none">support@laborojobs.com</p>
    </section>
  );
};