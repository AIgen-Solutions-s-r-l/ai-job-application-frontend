import Image from "next/image";
import Arrow from "@/public/aboutus/Arrow.svg";
import Line from "@/public/aboutus/line.svg";
import Start from "@/public/aboutus/Start.svg"
import Smily from "@/public/landing/laboro-smiley.svg";
import Star from "./Star";

export const Circle = ({ invert = false }: { invert?: boolean }) => {
    return (
        <div className={`flex items-center justify-center rounded-full w-[75px] h-[75px] bg-splash-green`}>
            <Image src={Arrow} alt="Arrow" style={{ transform: invert ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </div>
    )
}

function OurMission() {
    return (
        <div className="flex flex-col lg:flex-row min-h-[450px] gap-4 lg:gap-1">
            <div className="flex flex-row lg:flex-col items-center justify-between p-4 lg:py-8 bg-primary-deep-purple w-full lg:w-[205px] rounded-[50px] z-10">
                <Circle />
                <p className="font-montserrat text-white text-[20px] lg:text-[24px]">About Us</p>
                <Circle invert={true} />
            </div>
            <div className="relative py-12 flex px-6 lg:pr-[100px] lg:pl-[100px] xl:pl-[200px] gap-4 flex-col items-center justify-center bg-primary-deep-purple w-full rounded-[50px]">
                <div className="hidden lg:block absolute -left-20 z-0">
                    <Star />
                </div>
                <div className="relative w-full lg:w-auto">
                    <p className="text-center lg:text-left lg:absolute lg:-top-6 lg:-left-10 font-montserrat text-white text-[24px] lg:text-[28px] font-semibold">Our Mission</p>
                    <Image src={Line} alt="Line" className="hidden lg:block" />
                    <Image src={Smily} alt="Smily Face" className="hidden lg:block absolute w-12 -top-5 right-12" />
                    <p className="text-center lg:text-left mt-4 lg:mt-0 lg:absolute lg:bottom-0 lg:-right-12 xl:-right-0 xxl:-right-4  font-montserrat text-splash-green text-[24px] lg:text-[22px] xxl:text-[28px] font-semibold">Revolutionizing the job application process</p>
                </div>
                <p className="font-montserrat text-white text-[16px] lg:text-[20px] font-[500] text-center lg:text-left mt-4 lg:mt-0">
                    LABORO aims to empower job seekers by streamlining and automating the job application process. Our mission is simple:
                    eliminating inefficiencies and giving job seekers back control over their careers.
                    By automating and simplifying the application process, we help candidates focus on what truly matters—landing their dream jobs.
                </p>
            </div>
        </div>
    )
}

export default OurMission