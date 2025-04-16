import { FC } from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';

export const Spotlight: FC = () => {
  return (
    <LandingContainer>
      <section className='flex flex-col items-center gap-[70px] xl:gap-[100px] bg-primary-light-purple font-montserrat pt-[100px] md:pt-[140px] 2xl:pt-[180px]'>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-14 items-center justify-items-center 2xl:px-[100px] -mt-[40px]">
          <a href={'https://techcrunch.com/2024/10/10/a-reporter-used-ai-to-apply-to-2843-jobs/'} target="_blank" rel="noopener noreferrer">
            <Image src="/landing/spotlight-1.png" alt="spotlight-1" width={652} height={180} />
          </a>
          <a href={'https://www.vanityfair.it/article/intelligenza-artificiale-candidature-di-lavoro'} target="_blank" rel="noopener noreferrer">
            <Image src="/landing/spotlight-2.png" alt="spotlight-2" width={320} height={180} />
          </a>
          <a href={'https://www.theverge.com/2024/10/10/24266898/ai-is-enabling-job-seekers-to-think-like-spammers'} target="_blank" rel="noopener noreferrer">
            <Image src="/landing/spotlight-3.png" alt="spotlight-3" width={200} height={54} />
          </a>
          <a href={'https://www.wired.it/article/aihawk-come-automatizzare-ricerca-lavoro/'} target="_blank" rel="noopener noreferrer">
            <Image src="/landing/spotlight-4.png" alt="spotlight-4" width={298} height={150} />
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-14 items-center justify-items-center 2xl:px-[100px] -mt-[40px]">
          <a href={'https://www.businessinsider.com/aihawk-applies-jobs-for-you-linkedin-risks-inaccuracies-mistakes-2024-11/'} target="_blank" rel="noopener noreferrer">
            <Image src="/landing/spotlight-5.png" alt="spotlight-5" width={200} height={180} />
          </a>
          <a href={'https://www.404media.co/i-applied-to-2-843-roles-the-rise-of-ai-powered-job-application-bots/'} target="_blank" rel="noopener noreferrer">
            <Image src="/landing/spotlight-6.png" alt="spotlight-6" width={200} height={180} />
          </a>
          <a href={'https://www.semafor.com/article/09/12/2024/linkedins-have-nots-and-have-bots'} target="_blank" rel="noopener noreferrer">
            <Image src="/landing/spotlight-7.png" alt="spotlight-7" width={200} height={54} />
          </a>
          <a href={'https://devby.io/news/ya-razoslal-rezume-na-2843-vakansii-po-17-v-chas-kak-ii-boty-vytesnyaut-ludei-iz-protsessa-naima.amp'} target="_blank" rel="noopener noreferrer">
            <Image src="/landing/spotlight-8.png" alt="spotlight-8" width={150} height={150} />
          </a>
        </div>
      </section>
    </LandingContainer>
  );
};