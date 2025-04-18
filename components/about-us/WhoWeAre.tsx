import Image from "next/image";
import Heart from "../landing/Heart";
import Comunity from '@/public/aboutus/Comunity.svg';

function WhoWeAre() {
    return (
        <div className='flex flex-col gap-4 sm:gap-6 md:gap-8 py-6 sm:py-10 md:py-14 px-4 sm:px-16 md:px-28 w-full min-h-[50vh] bg-primary-light-purple rounded-[20px] sm:rounded-[30px] md:rounded-[40px]'>
            <p className="font-montserrat text-black text-[30px] sm:text-[40px] md:text-[50px] font-semibold">Who We Are</p>
            <p className="font-jura text-black text-[16px] sm:text-[18px] md:text-[20px] font-[500] pr-4 sm:pr-16 md:pr-28">
                We are a dedicated team of 15 professionals,
                including developers, machine learning engineers, security experts, and automation enthusiasts.
                Driven by a passion for innovation, we are committed to
                building deep-tech solutions that tackle the biggest challenges in today&apos;s job market.
            </p>
            <div className="relative">
                <Image src={Comunity} alt="Team" className="w-full rounded-[20px]" />
                <Heart ClassName="absolute -bottom-4 sm:-bottom-6 md:-bottom-10 -right-4 sm:-right-6 md:-right-10" />
                <Heart ClassName="absolute -bottom-4 sm:-bottom-6 md:-bottom-10 -left-4 sm:-left-6 md:-left-10" />
            </div>
        </div>
    )
}

export default WhoWeAre