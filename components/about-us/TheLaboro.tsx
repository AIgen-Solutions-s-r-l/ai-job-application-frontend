import { useEffect, useRef, useState } from 'react';
import { useUserContext } from '@/contexts/user-context';
import EyeBase from '@/public/aboutus/EyeBase.svg';
import Tablet from '@/public/aboutus/Tablet.svg'
import Image from 'next/image';
import Instagram from '@/public/aboutus/Instagram.svg';
import LinkedIn from '@/public/aboutus/LinkedIn.svg';
import Link from 'next/link';

export const List = ({ Icon, Link }: { Icon: string, Link: string }) => {
    return (
        <div className='flex items-center gap-2 sm:gap-3 md:gap-6 lg:gap-12'>
            <Image src={Icon} alt='Social media' className='w-6 sm:w-8 md:w-10 lg:w-auto' />
            <a href={Link} className="font-montserrat text-base sm:text-[18px] md:text-[20px] lg:text-[28px] font-[400] leading-normal lg:leading-relaxed text-black hover:text-primary-purple break-all">{Link}</a>
        </div>
    )
}
function TheLaboro() {
    const eyeContainer = useRef<HTMLDivElement>(null);
    const eyeBall = useRef<HTMLDivElement>(null);
    const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
    const { user } = useUserContext();

    const calculateEyePosition = () => {
        if (!eyeBall.current || !eyeContainer.current) return { x: 0, y: 0 };

        const eye = eyeContainer.current.getBoundingClientRect();
        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;

        const angle = Math.atan2(mouseCoordinates.y - eyeCenterY, mouseCoordinates.x - eyeCenterX);

        const maxRadius = (eye.width - eyeBall.current.offsetWidth) / 2;
        const x = Math.cos(angle) * maxRadius;
        const y = Math.sin(angle) * maxRadius;

        return { x, y };
    };

    const handleMouseMove = (event: MouseEvent) => {
        setMouseCoordinates({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const eyePosition = calculateEyePosition();

    return (
        <div>
            <div className="w-[200px] sm:w-[280px] md:w-[340px] lg:w-[405px] relative mx-auto mb-[100px] sm:mb-[140px] md:mb-[150px] lg:mb-[160px]">
                <div className="w-max relative mx-auto">
                    <Image
                        src={EyeBase}
                        alt="automate-eye-base"
                        className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[280px]"
                    />
                    <div
                        ref={eyeContainer}
                        className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] lg:w-[118px] lg:h-[118px] rounded-full bg-my-neutral-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div
                            ref={eyeBall}
                            className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-white absolute top-1/2 left-1/2"
                            style={{
                                transform: `translate(calc(-50% + ${eyePosition.x}px), calc(-50% + ${eyePosition.y}px))`
                            }}
                        ></div>
                    </div>
                </div>
                <Image
                    src={Tablet}
                    alt="automate-laptop"
                    className='w-[200px] sm:w-[280px] md:w-[340px] lg:w-[405px] absolute top-[50px] sm:top-[60px] md:top-[80px] lg:top-[100px]'
                />
            </div>
            <div className='flex flex-col rounded-[12px] sm:rounded-[16px] md:rounded-[24px] lg:rounded-[32px] w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] bg-primary-light-purple-gray px-3 sm:px-6 md:px-12 lg:px-20 py-6 sm:py-8 md:py-16 lg:py-24 gap-3 sm:gap-4 md:gap-8 lg:gap-16'>
                <p className="font-montserrat text-base sm:text-lg md:text-xl lg:text-[32px] font-[600] leading-snug sm:leading-snug md:leading-snug lg:leading-tight text-splash-green">
                    Experience a Smarter Way to Apply for Jobs with Laboro
                </p>
                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-[24px] font-[600] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-normal text-white">
                    We invite you to experience a more efficient and effective job application
                    process with LABORO. Find your next job with our platform and take control of your career trajectory.
                    {' '}<Link className="underline" href={user ? '/search' : '/signin'}>Subscribe Now</Link> to start your journey towards landing your dream job.
                </p>
                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-[24px] font-[600] leading-normal lg:leading-normal text-primary-deep-purple">
                    Connect with us and stay updated:
                </p>
                <div className='flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-4'>
                    <List Icon={Instagram} Link='https://www.instagram.com/interview_scouter' />
                    <List Icon={LinkedIn} Link='https://www.linkedin.com/company/joinlaboro' />
                </div>
            </div>
        </div>
    )
}

export default TheLaboro