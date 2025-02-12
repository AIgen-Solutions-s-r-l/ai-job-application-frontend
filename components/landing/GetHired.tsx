import React from 'react';
import Image from 'next/image';
import HiredFlower from '@/public/landing/hired-flower.svg'
import HiredElevator from '@/public/landing/hired-elevator.svg'

export const GetHired: React.FC = () => {
  return (
    <section className='flex flex-col items-center bg-primary-light-purple pt-[191px]'>
      <Image src={HiredFlower} alt='hired-flower'/>

      <div className="flex flex-col mt-[62px] font-josefin-sans text-[200px] tracking-tight text-primary-deep-purple leading-[0.84] relative">
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <p>Get Hired.</p>
        <div className="absolute left-[370px] bottom-0">
          <div className="w-max relative">
            <Image src={HiredElevator} alt='hired-elevator' />
            <Image src='/landing/hired-dude.png' alt='hired-dude' width={84} height={166} className='absolute left-[45px] bottom-5' />
          </div>
        </div>
      </div>
    </section>
  );
};