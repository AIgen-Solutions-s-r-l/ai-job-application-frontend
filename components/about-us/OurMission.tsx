import Image from "next/image";
import Arrow from "@/public/aboutus/Arrow.svg";
import Line from "@/public/aboutus/line.svg";
import Start from "@/public/aboutus/Start.svg"
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
        <div className="flex h-[450px] gap-1">
            <div className="flex flex-col items-center justify-between py-8 bg-primary-deep-purple h-full w-[205px] rounded-[50px] z-10">
                <Circle />
                <p className="font-montserrat text-white text-[24px]">About Us</p>
                <Circle invert={true} />
            </div>
            <div className="relative flex pr-[100px] pl-[200px] gap-4 flex-col items-center justify-center bg-primary-deep-purple h-full w-full  rounded-[50px]">
                <div className="absolute -left-20 z-0">
                    <Star />
                </div>
                <div className="relative">
                    <p className="absolute -top-6 font-montserrat text-white text-[28px] font-semibold">Our Mission</p>
                    <Image src={Line} alt="Line" />
                    <p className="absolute bottom-0 -right-2 font-montserrat text-splash-green text-[28px] font-semibold">Revolutionizing the job application process</p>
                </div>
                <p className="font-montserrat text-white text-[20px] font-[500]">
                    LABORO aims to empower job seekers by streamlining and automating the job application process. Our mission is simple:
                    eliminating inefficiencies and giving job seekers back control over their careers.
                    By automating and simplifying the application process, we help candidates focus on what truly matters—landing their dream jobs.
                </p>
            </div>
        </div>
    )
}

export default OurMission