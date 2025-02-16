'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const items = [
  {
    image: '/landing/pravatar-1.jpg',
    text: '“%%Laboro%% helped me break into investment banking. Applying to so many roles with precision got me multiple interviews.”',
    name: '- James, Investment Banking Analyst'
  },
  {
    image: '/landing/pravatar-2.jpg',
    text: '“I finally understood what I was doing wrong in my job search. %%Laboro%% tailored my applications and got me hired fast.”',
    name: '- Emily, Marketing Specialist'
  },
  {
    image: '/landing/pravatar-3.jpg',
    text: '“In consulting, it’s all about standing out. %%Laboro%%’s matching system helped me land interviews at top firms.”',
    name: '- Alex, Management Consultant'
  },
  {
    image: '/landing/pravatar-4.jpg',
    text: '“%%Laboro%% saved me from wasting time on the wrong roles. Its precision got me into a top accounting firm.”',
    name: '- Rachel, Junior Accountant'
  },
  {
    image: '/landing/pravatar-5.jpg',
    text: '“The automation feels human, and the accuracy is unmatched. %%Laboro%% made finding my first analyst role effortless.”',
    name: '- Chris, Business Analyst'
  },
  {
    image: '/landing/pravatar-6.jpg',
    text: '“%%Laboro%% streamlined everything. I went from no responses to landing a competitive HR position.”',
    name: '- Linda, HR Manager'
  },
  {
    image: '/landing/pravatar-7.jpg',
    text: '“I didn’t know applying was a numbers game until %%Laboro%% automated the process. It changed my career trajectory.”',
    name: '- Adam, Financial Analyst'
  },
  {
    image: '/landing/pravatar-8.jpg',
    text: '“%%Laboro%% was a game-changer for me. It matched me with the right roles and handled all the applications seamlessly.”',
    name: '- Kate, Operations Coordinator'
  },
  {
    image: '/landing/pravatar-9.jpg',
    text: '“%%Laboro%% made breaking into private equity possible. I applied to 200+ internships with perfectly tailored applications and landed my top choice.”',
    name: '- Lucas, Private Equity Intern'
  },
  {
    image: '/landing/pravatar-10.jpg',
    text: '“Internship applications felt overwhelming until %%Laboro%% streamlined the process. I got a consulting internship at a top firm in just weeks.”',
    name: '- Mia, Consulting Intern'
  },
  {
    image: '/landing/pravatar-11.jpg',
    text: '“I didn’t know where to start with finance internships. %%Laboro%% matched me with roles I didn’t even know existed, and I got multiple offers.”',
    name: '- Nathan, Finance Intern'
  },
  {
    image: '/landing/pravatar-12.jpg',
    text: '“%%Laboro%% helped me secure a competitive marketing internship. The resume optimization showed me exactly what I was doing wrong before.”',
    name: '- Sophia, Marketing Intern'
  },
];

const highlightText = (text: string) => {
  return text.replace(/%%Laboro%%/g, '<span class="testimonial-text-highlight">Laboro</span>');
};

export const Carousel: React.FC = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: any) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="w-full relative">
      <div className="absolute -top-[140px] right-0 flex gap-4">
        <button 
          onClick={movePrev}
          className='testimonials-button'
          disabled={isDisabled('prev')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-20 stroke-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button 
          onClick={moveNext}
          className='testimonials-button'
          disabled={isDisabled('next')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-20 stroke-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div
        ref={carousel}
        className="relative flex gap-[25px] overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
      >
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-between flex-none snap-start w-[416px] h-[527px] rounded-[25px] bg-my-neutral-2 p-10"
            >
              <div className="">
                <Image src={item.image} alt='carousel-image' width={150} height={150} className='rounded-full' />

                <p 
                  className="mt-[31px] text-[20px] leading-[1.2] text-my-neutral-7"
                  dangerouslySetInnerHTML={{ __html: highlightText(item.text) }}
                />
              </div>

                <p className="font-italianno text-[24px] leading-[1.2] text-my-neutral-7">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
