import Flower from '@/public/aboutus/Flower.svg';
import Image from 'next/image';

export const Point = ({ text }: { text: string }) => {
    return (
        <div className='flex items-center justify-center gap-4 md:gap-10'>
            <Image src={Flower} alt='Flower' className="w-6 h-6 md:w-auto md:h-auto" />
            <p className="font-montserrat text-black text-base md:text-[20px] font-[400]">
                {text}
            </p>
        </div>
    );
}

function OurSolution() {
    return (
        <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 gap-4 md:gap-8">
            <p className="font-montserrat text-black text-3xl md:text-4xl lg:text-[50px] font-semibold">Our Solution</p>
            <p className="font-montserrat text-black text-xl md:text-2xl lg:text-[40px] font-[400]">LABORO offers a high-tech platform designed to automate and optimize job applications. Our key features include:</p>
            <div className='flex flex-col gap-4 md:gap-8'>
                <Point text='Comprehensive Job Aggregation: We provide access to the most extensive collection of actual job listings sourced directly from company websites, ensuring authenticity and relevance.' />
                <Point text='Advanced Application Automation: Our sophisticated AI-powered web agent can navigate and complete even the most complex application forms on your behalf, significantly reducing the time and effort required.' />
                <Point text='One-Click Mass Applications: Our platform allows you to select and apply to multiple jobs simultaneously, enhancing efficiency and increasing your chances of success.' />
                <Point text='Tailored Application Materials: We create tailored resumes and cover letters for each application. These are crafted to achieve 95 to 100% compliance with applicant tracking systems (ATS), which improves visibility to employers.' />
                <Point text='Flexible, Pay-As-You-Go Model: Our credit-based system allows you to pay only for the applications you submit, offering flexibility and cost-effectiveness.' />
                <Point text='Industry-Specific Focus: We specialize in curating job opportunities in the Finance, Technology, Marketing, Management, and Business sectors, connecting you with leading companies in these fields.' />
            </div>
        </div>
    )
}

export default OurSolution