'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWindowSize } from '@/lib/hooks';
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"

const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Our platform';

const items = [
  {
    id: 1,
    image: '/landing/pravatar-1.jpg',
    text: '"%%APP_NAME%% helped me break into investment banking. Applying to so many roles with precision got me multiple interviews."',
    name: '- James, Investment Banking Analyst'
  },
  {
    id: 2,
    image: '/landing/pravatar-2.jpg',
    text: '"I finally understood what I was doing wrong in my job search. %%APP_NAME%% tailored my applications and got me hired fast."',
    name: '- Emily, Marketing Specialist'
  },
  {
    id: 3,
    image: '/landing/pravatar-3.jpg',
    text: '"In consulting, it's all about standing out. %%APP_NAME%%\'s matching system helped me land interviews at top firms."',
    name: '- Alex, Management Consultant'
  },
  {
    id: 4,
    image: '/landing/pravatar-4.jpg',
    text: '"%%APP_NAME%% saved me from wasting time on the wrong roles. Its precision got me into a top accounting firm."',
    name: '- Rachel, Junior Accountant'
  },
  {
    id: 5,
    image: '/landing/pravatar-5.jpg',
    text: '"The automation feels human, and the accuracy is unmatched. %%APP_NAME%% made finding my first analyst role effortless."',
    name: '- Chris, Business Analyst'
  },
  {
    id: 6,
    image: '/landing/pravatar-6.jpg',
    text: '"%%APP_NAME%% streamlined everything. I went from no responses to landing a competitive HR position."',
    name: '- Linda, HR Manager'
  },
  {
    id: 7,
    image: '/landing/pravatar-7.jpg',
    text: '"I didn't know applying was a numbers game until %%APP_NAME%% automated the process. It changed my career trajectory."',
    name: '- Adam, Financial Analyst'
  },
  {
    id: 8,
    image: '/landing/pravatar-8.jpg',
    text: '"%%APP_NAME%% was a game-changer for me. It matched me with the right roles and handled all the applications seamlessly."',
    name: '- Kate, Operations Coordinator'
  },
  {
    id: 9,
    image: '/landing/pravatar-9.jpg',
    text: '"%%APP_NAME%% made breaking into private equity possible. I applied to 200+ internships with perfectly tailored applications and landed my top choice."',
    name: '- Lucas, Private Equity Intern'
  },
  {
    id: 10,
    image: '/landing/pravatar-10.jpg',
    text: '"Internship applications felt overwhelming until %%APP_NAME%% streamlined the process. I got a consulting internship at a top firm in just weeks."',
    name: '- Mia, Consulting Intern'
  },
  {
    id: 11,
    image: '/landing/pravatar-11.jpg',
    text: '"I didn't know where to start with finance internships. %%APP_NAME%% matched me with roles I didn't even know existed, and I got multiple offers."',
    name: '- Nathan, Finance Intern'
  },
  {
    id: 12,
    image: '/landing/pravatar-12.jpg',
    text: '"%%APP_NAME%% helped me secure a competitive marketing internship. The resume optimization showed me exactly what I was doing wrong before."',
    name: '- Sophia, Marketing Intern'
  },
];

const TextWithHighlight = ({ text }: { text: string }) => {
  const parts = text.split(/%%APP_NAME%%/g);
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="testimonial-text-highlight">{appName}</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [direction, setDirection] = useState(0);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setItemsPerPage(1);
    } else if (width < 1280) {
      setItemsPerPage(2);
    } else if (width < 1536) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4);
    }
  }, [width]);

  const maxIndex = items.length - itemsPerPage;

  const movePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevState) => Math.max(0, prevState - itemsPerPage));
  };

  const moveNext = () => {
    setDirection(1);
    setCurrentIndex((prevState) => Math.min(maxIndex, prevState + itemsPerPage));
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: (direction: number) => ({
      x: direction * 100,
      opacity: 0,
      scale: 0.8,
    }),
    show: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: (direction: number) => ({
      x: direction * -100,
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
  };

  return (
    <div className="w-full relative flex justify-center flex-col items-center">
      <motion.div
        className="w-full h-[527px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          {visibleItems.map((item) => (
            <motion.div
              key={item.id}
              custom={direction}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col justify-between flex-none snap-start h-[457px] rounded-[25px] bg-my-neutral-2 p-10"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Image src={item.image} alt='carousel-image' width={100} height={100} className='rounded-full' />
                </motion.div>

                <motion.p
                  className="mt-[31px] text-[14px] leading-[1.2] text-my-neutral-7"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <TextWithHighlight text={item.text} />
                </motion.p>
              </div>

              <motion.p
                className="font-italianno text-[20px] leading-[1.2] text-my-neutral-7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {item.name}
              </motion.p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="flex gap-4 -mt-[50px]">
        <motion.button
          onClick={movePrev}
          className="testimonials-button disabled:opacity-50"
          disabled={currentIndex === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
        <motion.button
          onClick={moveNext}
          className="testimonials-button disabled:opacity-50"
          disabled={currentIndex >= maxIndex}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </div>
    </div>
  );
};
