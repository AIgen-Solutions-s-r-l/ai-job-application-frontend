import { FC, useRef } from 'react';
import FaqQuestion from '@/public/landing/faq-question.svg';
import { LandingContainer } from './LandingContainer';
import * as motion from "motion/react-client";
import { useScroll, useTransform } from "motion/react";

const accordionItems = [
  {
    id: 1,
    question: '1. How does Laboro find all the jobs on the internet?',
    answer: 'Laboro uses advanced web crawling and scraping technologies to aggregate job listings from major job boards, company career pages, and niche sites. Our system is incredibly precise and updates in real time, ensuring you get access to newly published jobs before others. This gives you a competitive edge by letting you apply as soon as opportunities go live.'
  },
  {
    id: 2,
    question: '2. Is Laboro’s automated application process safe and undetectable?',
    answer: 'Yes, Laboro mimics human behavior when submitting applications, making the process completely safe and undetectable by applicant tracking systems (ATS). Each application is submitted individually, ensuring compliance with all job board requirements and enhancing the authenticity of your submissions.'
  },
  {
    id: 3,
    question: '3. Can I customize my resume and cover letter for specific applications?',
    answer: 'Absolutely. Laboro’s AI not only tailors your resume and cover letter for each job but also provides an editor so you can review and make changes before submitting. This middle step allows you to check every generated application and customize it further if needed.'
  },
  {
    id: 4,
    question: '4. Can I use my own resume instead of generating one?',
    answer: 'Yes, you can fully customize your experience. Laboro allows you to use your own resume and cover letter for applications. You can also choose to generate new materials using our AI and adjust them as you prefer.'
  },
  {
    id: 5,
    question: '5. What industries and job roles does Laboro support?',
    answer: 'Laboro supports a wide range of industries, including finance, marketing, consulting, technology, operations, and more. We cover opportunities globally, including the Americas, Europe, Asia, and Oceania, making it easy to find jobs in your desired region or country.'
  },
  {
    id: 6,
    question: '6. How accurate is Laboro’s job-matching system?',
    answer: 'Laboro uses advanced AI to analyze your profile and job preferences, ensuring precise matches with opportunities that align with your skills and career goals. By understanding both your resume and job descriptions, our system maximizes relevance and saves you from applying to unsuitable roles.'
  },
  {
    id: 7,
    question: '7. Does Laboro work for internships and entry-level positions?',
    answer: 'Yes, Laboro is perfect for students and recent graduates. The platform excels at finding internships and entry-level roles, ensuring your applications are tailored to competitive positions.'
  },
  {
    id: 8,
    question: '8. Can I track which jobs I’ve applied to through Laboro?',
    answer: 'Yes, Laboro provides a dashboard where you can track all your submitted applications. Additionally, all jobs are sent using your email address, so you’ll receive confirmation emails directly from the companies or job boards for complete transparency.'
  },
  {
    id: 9,
    question: '9. Is there a limit to how many jobs Laboro can apply for on my behalf',
    answer: 'There’s no limit! Laboro offers various plans, including a custom plan to suit your specific needs. Our platform aggregates jobs from across the entire internet, ensuring an almost unlimited pool of opportunities for you to explore.'
  },
  {
    id: 10,
    question: '10. How do I get started with Laboro?',
    answer: 'Getting started is easy. Simply upload your resume, and our system will automatically parse your information to create your professional profile. From there, Laboro will take care of the rest, job matching, application customization, and submissions.'
  },
]

export const FAQ: FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["200px end", "center end"]
  });

  const pathX = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.6, 0.9], ['0%', '80%', '80%', '0%', '0%']);
  const pathY = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.6, 0.9], [0, 0, 110, 110, 245]);

  return (
    <section ref={sectionRef} className='bg-primary-light-purple pt-[150px] md:pt-[200px] xl:pt-[240px]'>
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
