import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactsArrow from '@/public/landing/contacts-arrow.svg'
import ContactsEyeBase from '@/public/landing/contacts-eye-base.svg'

export const Contacts: React.FC = () => {
  return (
    <section className='flex flex-col items-center bg-primary-light-purple pt-[120px] pb-[500px]'>
      <Link className='h-[74px] px-[36px] flex items-center justify-between bg-splash-green rounded-[20px] gap-[50px]' href='/signin'>
        <p className='text-[32px] font-light font-k2d text-my-neutral-7 leading-none'>Try it</p>
        <Image src={ContactsArrow} alt="contacts-arrow" className='mt-1' />
      </Link>

      <div className="w-max relative mx-auto mt-[210px] mb-[58px]">
        <Image src={ContactsEyeBase} alt="contacts-eye-base" />
        <div className="w-[138px] h-[138px] rounded-full bg-my-neutral-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-[72px] h-[72px] rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <h3 className="font-montserrat text-[36px] font-medium text-white leading-none mb-[38px]">Contact Us</h3>
      <p className="font-montserrat text-[24px] font-medium text-white leading-none">support@laborojobs.com</p>
    </section>
  );
};