import { useEffect, useRef, useState } from 'react';
import EyeBase from '@/public/aboutus/EyeBase.svg';
import Tablet from '@/public/aboutus/Tablet.svg'
import Image from 'next/image';
import Instagram from '@/public/aboutus/Instagram.svg';
import LinkedIn from '@/public/aboutus/LinkedIn.svg';

export const List = ({ Icon, Link }: { Icon: string, Link: string }) => {
    return (
        <div className='flex items-center gap-12'>
            <Image src={Icon} alt='Socail media' />
            <a href={Link} className="font-montserrat text-[36px] font-[400] text-black hover:text-primary-purple">{Link}</a>
        </div>
    )
}
function TheLaboro() {
    const eyeContainer = useRef<HTMLDivElement>(null);
    const eyeBall = useRef<HTMLDivElement>(null);
    const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

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
            <div className="md:w-[405px] relative mx-auto mb-[100px]">
                <div className="w-max relative mx-auto">
                    <Image src={EyeBase} alt="automate-eye-base" width={280} />
                    <div
                        ref={eyeContainer}
                        className="w-[118px] h-[118px] rounded-full bg-my-neutral-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div
                            ref={eyeBall}
                            className="w-[60px] h-[60px] rounded-full bg-white absolute top-1/2 left-1/2"
                            style={{
                                transform: `translate(calc(-50% + ${eyePosition.x}px), calc(-50% + ${eyePosition.y}px))`
                            }}
                        ></div>
                    </div>
                </div>
                <Image src={Tablet} alt="automate-laptop" width={405} height={339} className='absolute top-[100px]' />
            </div>
            <div className='flex flex-col rounded-[40px] w-full min-h-[500px] bg-primary-light-purple-gray px-24 py-40 gap-24'>
                <p className="font-montserrat text-[50px] font-[600] text-splash-green">Experience a Smarter Way to Apply for Jobs with Laboro</p>
                <p className="font-montserrat text-[40px] font-[600] text-white">
                    We invite you to experience a more efficient and effective job application
                    process with LABORO. Find your next job with our platform and take control of your career trajectory.
                    [Subscribe Now] to start your journey towards landing your dream job.
                </p>
                <p className="font-montserrat text-[40px] font-[600] text-primary-deep-purple">Connect with us and stay updated:</p>
                <div className='flex flex-col gap-8'>
                    <List Icon={Instagram} Link='https://www.instagram.com/interview_scouter' />
                    <List Icon={LinkedIn} Link='https://www.linkedin.com/company/joinlaboro' />
                </div>
            </div>
        </div>
    )
}

export default TheLaboro