import React from 'react';
import Image from 'next/image';
import Automate1 from '@/public/landing/automate-1.svg';
import Automate2 from '@/public/landing/automate-2.svg';
import Automate3 from '@/public/landing/automate-3.svg';
import LaboroSmiley from '@/public/landing/laboro-smiley.svg';
import AutomateItemArrow from '@/public/landing/automate-item-arrow.svg';
import AutomateItemCheck from '@/public/landing/automate-item-check.svg';
import AutomateEyeBase from '@/public/landing/automate-eye-base.svg';

export const Automate: React.FC = () => {
  return (
    <section className='bg-my-neutral-2 font-montserrat pt-[176px] pb-[150px]'>
      <div className="w-max mx-auto">
        <h2 className="text-[50px] leading-none text-my-neutral-6 mb-[25px] tracking-tight">Automate your job hunt and save hours & days by</h2>

        <div className="w-max relative">
          <Image src={Automate1} alt='Automate1' />
          <Image src={LaboroSmiley} alt='laboro-smiley' className='absolute -top-[20px] left-[322px]' />
        </div>

        <div className="flex flex-col items-center gap-[15px] mt-[33px] mb-[22px]">
          <AutomateItem text='Get matched with top jobs from 100K+ sources' />
          <AutomateItem text='Generate a tailored resume for each role' />
          <AutomateItem text='Craft a unique cover letter for every job' />
          <AutomateItem text='Apply automatically across all platforms' featured />
        </div>

        <div className="w-[1178px] h-[141px] relative">
          <Image src={Automate2} alt='Automate2' fill/>
        </div>

        <p className="text-[50px] leading-none text-my-neutral-6 tracking-tight mt-[50px] mb-[50px]">
          Fully Automated job hunting process, <br/>
          from <span className='font-semibold'>search</span> to <span className='font-semibold'>resume-editing</span> & <span className='font-semibold'>cover letter <br/>
          creation</span>, to <span className='font-semibold'>submitting job applications</span>.
        </p>

        <div className="w-max relative ml-[20px]">
          <Image src={Automate3} alt='Automate3' />
        </div>

        <p className="text-[50px] font-semibold text-my-neutral-6 tracking-tight leading-none text-center mt-[33px] mb-[122px]">So you can enjoy your time.</p>

        <div className="w-[505px] h-[440px] relative mx-auto">
          <div className="w-max relative mx-auto">
            <Image src={AutomateEyeBase} alt="automate-eye-base" />
            <div className="w-[138px] h-[138px] rounded-full bg-my-neutral-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-[72px] h-[72px] rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
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