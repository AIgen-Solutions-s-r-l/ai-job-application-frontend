'use client';

import { FC, useRef, memo, useEffect, useState } from "react";
import Image from "next/image";
import { useWindowSize } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const MobileFeatures: FC = () => {
  return (
    <section className="py-12 px-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mb-12">
        {/* <h2 className="text-[24px] font-medium text-center text-white">
          All the jobs on the internet, in one place.
        </h2> */}
        {/* <p className="text-[14px] text-splash-green text-center">
          Laboro collects opportunities from every website and job board,
          automates your applications, and matches you with the perfect role,
          saving you time and effort.
        </p> */}
      </div>

      {/* Features Grid */}
      <div className="flex flex-col gap-8">
        {/* Feature 1 */}
        <div className="bg-primary-deep-purple/10 p-6 rounded-lg">
          <Image
            src='/landing/feature-1.png'
            alt='feature-1'
            width={300}
            height={75}
            className="w-full max-w-[300px] mx-auto"
          />
          <p className="mt-4 text-2xl font-light text-white text-center">
            400K+ Followers
          </p>
          <p className="mt-2 text-lg font-medium text-white text-center">
            on social platforms (
            <a href="https://www.instagram.com/interview_scouter" target="_blank" rel="noopener noreferrer" className="text-splash-green underline">
              Instagram
            </a>,
            <a href="https://github.com/feder-cr/Jobs_Applier_AI_Agent_AIHawk" target="_blank" rel="noopener noreferrer" className="text-splash-green underline">
              Github
            </a>
            )
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-primary-deep-purple/10 p-6 rounded-lg">
          <div className="space-y-3">
            <p className="text-xl font-thin text-white"><span>1</span><span className="ml-3">- Upload your resume</span></p>
            <p className="text-xl font-thin text-white"><span>2</span><span className="ml-1">-  Find matching jobs</span></p>
            <p className="text-xl font-semibold text-white">
              <span>3</span><span className="ml-1">- We create a set of resume and cover letter</span>
            </p>
            <p className="text-xl font-semibold text-splash-green">
              <span>4</span><span className="ml-1">- Auto-apply to many jobs at once!</span>
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-primary-deep-purple/10 p-6 rounded-lg">
          <p className="text-2xl font-thin text-white">
            We currently have<br />
            +1M Job Posts,<br />
            from <span className="text-splash-green">+30K companies!</span>
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-primary-deep-purple/10 p-6 rounded-lg">
          <p className="text-xl text-white text-center mb-4">
            Companies hiring now
          </p>
          <Image
            src='/landing/feature-4.svg'
            alt='feature-4'
            width={300}
            height={188}
            className="w-full max-w-[300px] mx-auto"
          />
        </div>

        {/* Feature 5 */}
        <div className="bg-primary-deep-purple p-6 rounded-lg">
          <p className="text-lg leading-relaxed text-primary-light-purple-gray mb-4">
            Your chance to
            <span className="text-splash-orange"> get hired</span> with
            our <span className="text-splash-green">AI-automated</span>
            job application
            system is <span className="text-splash-orange">higher</span>,
            since you can apply to many jobs with
            <span className="text-white"> perfectly matching resume & cover letters.</span>
          </p>
          <Image
            src='/landing/feature-5.png'
            alt='feature-5'
            width={150}
            height={207}
            className="w-full max-w-[150px] mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export const DesktopFeatures: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setStart(true);
    }
  }, []);

  const renderFeatures = () => (
    <>
      <div className="features-slide justify-end font-montserra min-w-[400px] shrink-0">
        <Image src='/landing/feature-1.png' alt='feature-1' width={305} height={100} />
        <p className="mt-[33px] text-[20px] xl:text-[34px] font-light leading-[1.1] text-white">400K+ Followers</p>
        <p className="mt-[8px] text-[20px] xl:text-[20px] font-medium leading-none text-white">
          on social platforms (
          <a href="https://www.instagram.com/interview_scouter" target="_blank" rel="noopener noreferrer" className="text-splash-green underline">
            Instagram
          </a>&nbsp;&amp;&nbsp;
          <a href="https://github.com/feder-cr/Jobs_Applier_AI_Agent_AIHawk" target="_blank" rel="noopener noreferrer" className="text-splash-green underline">
            Github
          </a>
          )
        </p>
      </div>

      <div className="features-slide flex-row bg-primary-deep-purple items-center justify-center gap-[15px] font-montserrat min-w-[400px] shrink-0">
        <div className="w-[335px]">
          <p className="text-[18px] 2xl:text-[20px] leading-[1.1] text-primary-light-purple-gray">
            Your chance to<br />
            <span className="text-splash-orange">get hired</span> with<br />
            our <span className="text-splash-green">AI-automated</span><br />
            job application<br />
            system is <span className='text-splash-orange'>higher</span>, since you can apply to many jobs with <span className="text-white">perfectly matching resume & cover letters.</span>
          </p>
        </div>
        <Image src='/landing/feature-5.png' alt='feature-5' width={200} height={277} />
      </div>

      <div className="features-slide justify-end relative overflow-visible font-k2d min-w-[400px] shrink-0">
        <Image src='/landing/feature-2.png' alt='feature-2' width={755} height={82} className='scale-125 absolute top-[20px] left-0 z-20' />
        <p className="text-[20px] 2xl:text-[25px] font-thin text-white leading-[1.2]"><span>1</span><span className="ml-3">- Upload your resume</span></p>
        <p className="text-[20px] 2xl:text-[25px] font-thin text-white leading-[1.2]"><span>2</span><span className="ml-1">- Find matching jobs</span></p>
        <p className="text-[20px] 2xl:text-[24px] font-semibold text-white leading-[1.2]"><span>3</span><span className="ml-1">- We create a set of resume and cover letter for each job application</span></p>
        <p className="text-[20px] 2xl:text-[24px] font-semibold text-splash-green leading-[1.2]"><span>4</span><span className="ml-1">- Auto-apply to many jobs at once!</span></p>
      </div>

      <div className="flex items-center features-slide font-k2d justify-start min-w-[400px] shrink-0">
        <p className="text-[35px] 2xl:text-[40px] leading-[1.1] font-thin text-white">
          We currently have<br />
          +1M Job Posts,<br />
          from <span className='text-splash-green'>+30K companies!</span>
        </p>
      </div>
    </>
  );

  return (
    <section className="flex px-12 mb:px-[20vw] flex-col relative pb-[200px] overflow-x-clip h-[530px] pt-[80px] 2xl:pt-[100px]">
      <div className="sticky top-[-50%]">
        <div
          ref={containerRef}
          className="scroller relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_90%,transparent)]"
        >
          <div
            ref={scrollerRef}
            className={cn(
              "flex w-max min-w-full shrink-0 flex-nowrap gap-4 h-[300px]",
              start && "animate-scroll"
            )}
          >
            {renderFeatures()}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Features: FC = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 1024;

  // const MemoizedMobileFeatures = memo(MobileFeatures);
  const MemoizedDesktopFeatures = memo(DesktopFeatures);

  if (!width) {
    return (
      <section className="h-[100vh]"></section>
    );
  }

  return !isMobile && <MemoizedDesktopFeatures />;
};