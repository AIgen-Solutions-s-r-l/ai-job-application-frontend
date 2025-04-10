import Image from "next/image";
import Team from '@/public/aboutus/Team.png';
import Heart from "../landing/Heart";

function WhoWeAre() {
    return (
        <div className='flex flex-col gap-8 py-14 px-28 w-full min-h-[50vh] bg-primary-light-purple rounded-[40px]'>
            <p className="font-montserrat text-black text-[50px] font-semibold">Who We Are</p>
            <p className="font-jura text-black text-[20px] font-[500] pr-28">
                We are a dedicated team of 15 professionals,
                including developers, machine learning engineers, security experts, and automation enthusiasts.
                Driven by a passion for innovation, we are committed to
                building deep-tech solutions that tackle the biggest challenges in today’s job market.
            </p>
            <div className="relative">
                <Image src={Team} alt="Team" className="w-full" />
                <Heart ClassName="absolute -bottom-10 -right-10" />
                <Heart ClassName="absolute -bottom-10 -left-10" />
            </div>
        </div>
    )
}

export default WhoWeAre