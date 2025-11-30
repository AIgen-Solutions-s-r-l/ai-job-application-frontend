import { FC, useRef } from 'react';
import FaqQuestion from '@/public/landing/faq-question.svg';
import { LandingContainer } from './LandingContainer';
import * as motion from "motion/react-client";
import { useScroll, useSpring, useTransform } from "motion/react";

const accordionItems = [
  {
    id: 1,
    question: '1. What is this platform?',
    answer: 'This is an AI-powered job application engine that automates your entire job search. It finds the best jobs for your profile, generates tailored CVs and cover letters, fills out all the application forms, and applies — all in one click.'
  },
  {
    id: 2,
    question: '2. How can I find my next job?',
    answer: 'Our platform aggregates millions of company websites and matches you with the most relevant roles, generates tailored applications, and applies on your behalf. You can apply to up to 1000 jobs per month with a single click.'
  },
  {
    id: 3,
    question: '3. How accurate is the job-matching system?',
    answer: 'We use advanced AI to analyze your profile and job preferences, ensuring precise matches with opportunities that align with your skills and career goals. By understanding both your resume and job descriptions, our system maximizes relevance and saves you from applying to unsuitable roles.'
  },
  {
    id: 4,
    question: '4. Can I customize my resume and cover letter for specific applications?',
    answer: 'Absolutely. Our AI not only tailors your resume and cover letter for each job but also provides an editor so you can review and make changes before submitting. This middle step allows you to check every generated application and customize it further if needed. However, if you prefer, you can use your own resume and cover letter for applications.'
  },
  {
    id: 5,
    question: '5. Can I track which jobs I\'ve applied to?',
    answer: 'Yes, we provide a dashboard where you can track all your submitted applications. Additionally, all jobs are sent using your email address, so you\'ll receive confirmation emails directly from the companies or job boards for complete transparency.'
  },
  {
    id: 6,
    question: '6. Is there a limit to how many jobs you can apply for on my behalf?',
    answer: 'There\'s no limit! We offer various plans, including a custom plan to suit your specific needs. Our platform aggregates jobs from across the entire internet, ensuring an almost unlimited pool of opportunities for you to explore.'
  },
  {
    id: 7,
    question: '7. How do I get started?',
    answer: 'Getting started is easy. Simply upload your resume, and our system will automatically parse your information to create your professional profile. From there, we\'ll take care of the rest - job matching, application customization, and submissions.'
  },
]

export const FAQ: FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["200px end", "center end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  const pathX = useTransform(smoothProgress, [0, 0.3, 0.4, 0.6, 0.9], ['0%', '80%', '80%', '0%', '0%']);
  const pathY = useTransform(smoothProgress, [0, 0.3, 0.4, 0.6, 0.9], [0, 0, 110, 110, 245]);

  return (
    <section ref={sectionRef} className='bg-primary-light-purple pt-[90px] md:pt-[200px] xl:pt-[240px]'>
      <div className="relative w-max mx-auto">
        <div className="w-[199px] h-[224px]" style={{ backgroundImage: `url(${FaqQuestion.src})` }} ></div>
        <div className="flex gap-5 items-center mt-4 mb-[48px] md:mb-[78px]">
          <motion.div className="absolute top-0 w-10 left-[0px] h-10 rounded-full bg-splash-orange"
            style={{
              left: pathX,
              top: pathY,
            }} />
          <h2 className="ml-[50px] text-[50px] md:text-[50px] font-medium font-montserrat leading-none tracking-tight text-white">F.A.Q</h2>
        </div>
      </div>

      <LandingContainer>
        <div className="bg-my-neutral-2 border-t-[25px] border-b-[25px] border-primary-light-purple-gray rounded-xl">
          {accordionItems.map(item => (
            <div key={item.id} className="collapse my-collapse-plus border-t border-b rounded-none border-primary-light-purple-gray">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title">{item.question}</div>
              <div className="collapse-content">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
};
