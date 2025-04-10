import QuestionMark from '@/public/aboutus/QuestionMark.svg';
import TheLine from '@/public/aboutus/BlackLine.svg'
import Person from '@/public/aboutus/Person.svg'
import CheckMark from '@/public/aboutus/CheckMark.svg'
import Image from 'next/image';



export const List = ({ Header, Text }: { Header: string, Text: String }) => {
    return (
        <div className='flex flex-col gap-10'>
            <div className='flex justify-between items-center px-12 w-full h-[100px] bg-primary-deep-purple rounded-full'>
                <p className="font-montserrat text-black text-[40px] font-[400] text-white">{Header}</p>
                <Image src={CheckMark} alt='Check Mark' />
            </div>
            <p className="font-montserrat text-black text-[24px] font-[500] text-black px-24">
                {Text}
            </p>
        </div>
    )
}
function WhyLaboro() {
    return (
        <div className='flex flex-col'>
            <div className='flex justify-between px-24'>
                <p className="font-josefinSans text-black text-[200px] font-semibold text-primary-deep-purple leading-[89%] tracking-[-6px]">Why<br />Choose<br />Laboro</p>
                <div className='relative'>
                    <div className='absolute w-[80px] h-[80px] bg-splash-orange rounded-full' />
                    <Image src={QuestionMark} alt='Question Mark' />
                </div>
            </div>
            <div>
                <p className="font-montserrat text-black text-[50px] font-[500] text-black px-24">Unlike other platforms, LABORO<br /> stands out by offering</p>
                <div className='relative'>
                    <Image src={TheLine} alt='line' className='w-full translate-y-[-15%]' />
                    <Image src={Person} alt='Person' className='absolute -top-[275px] right-24' />
                </div>
            </div>
            <div className='flex flex-col gap-24'>
                <List Header='Authentic Job Listings' Text="We source real jobs directly from employer websites, avoiding low-quality listings that seldom lead to interviews." />
                <List Header='Unlimited Job Sources' Text="Our extensive aggregation spans the internet, ensuring a continuous influx of high-quality job opportunities." />
                <List Header='Complex Form Handling' Text="Our advanced AI systems adeptly manage intricate application forms, a capability that sets us apart from competitors." />
                <List Header='Personalized Applications' Text="Our onboarding process ensures that your applications are tailored accurately to your background, with minimal manual input required." />
            </div>
        </div>
    )
}

export default WhyLaboro