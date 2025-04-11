import QuestionMark from '@/public/aboutus/QuestionMark.svg';
import TheLine from '@/public/aboutus/BlackLine.svg'
import Person from '@/public/aboutus/Person.svg'
import CheckMark from '@/public/aboutus/CheckMark.svg'
import Image from 'next/image';



export const List = ({ Header, Text }: { Header: string, Text: String }) => {
    return (
        <div className='flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10'>
            <div className='flex justify-between items-center px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 w-full h-[40px] sm:h-[50px] md:h-[70px] lg:h-[85px] xl:h-[100px] bg-primary-deep-purple rounded-full'>
                <p className="font-montserrat text-white text-[16px] sm:text-[20px] md:text-[28px] lg:text-[34px] xl:text-[40px] font-[400] line-clamp-1">{Header}</p>
                <Image src={CheckMark} alt='Check Mark' className='w-[20px] sm:w-[25px] md:w-[30px] lg:w-[35px] xl:w-auto' />
            </div>
            <p className="font-montserrat text-black text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-[500] px-3 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                {Text}
            </p>
        </div>
    )
}
function WhyLaboro() {
    return (
        <div className='flex flex-col'>
            <div className='flex justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24'>
                <p className="font-josefinSans text-black text-[50px] sm:text-[70px] md:text-[120px] lg:text-[160px] xl:text-[200px] font-semibold text-primary-deep-purple leading-[89%] tracking-[-2px] sm:tracking-[-3px] md:tracking-[-4px] lg:tracking-[-5px] xl:tracking-[-6px]">
                    Why<br />Choose<br />Laboro
                </p>
                <div className='relative'>
                    <div className='absolute left-8 -top-4 w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] xl:w-[80px] xl:h-[80px] bg-splash-orange rounded-full' />
                    <Image
                        src={QuestionMark}
                        alt='Question Mark'
                        className='w-[60px] sm:w-[80px] md:w-[120px] lg:w-[160px] xl:w-auto'
                    />
                </div>
            </div>
            <div>
                <p className="font-montserrat text-black text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] xl:text-[50px] font-[500] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
                    Unlike other platforms, LABORO<br className='hidden sm:block' /> stands out by offering
                </p>
                <div className='relative mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12'>
                    <Image src={TheLine} alt='line' className='w-full translate-y-[-15%]' />
                    <Image
                        src={Person}
                        alt='Person'
                        className='absolute -top-[80px] sm:-top-[100px] md:-top-[150px] lg:-top-[200px] xl:-top-[275px] right-4 sm:right-8 md:right-12 lg:right-16 xl:right-24 w-[40px] sm:w-[60px] md:w-[100px] lg:w-[150px] xl:w-auto'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24'>
                <List Header='Authentic Job Listings' Text="We source real jobs directly from employer websites, avoiding low-quality listings that seldom lead to interviews." />
                <List Header='Unlimited Job Sources' Text="Our extensive aggregation spans the internet, ensuring a continuous influx of high-quality job opportunities." />
                <List Header='Complex Form Handling' Text="Our advanced AI systems adeptly manage intricate application forms, a capability that sets us apart from competitors." />
                <List Header='Personalized Applications' Text="Our onboarding process ensures that your applications are tailored accurately to your background, with minimal manual input required." />
            </div>
        </div>
    )
}

export default WhyLaboro