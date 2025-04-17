import Image from "next/image";
import HeartImage from '../svgs/Heart.svg';
import { useState, useRef, useEffect, RefObject } from 'react';

function Heart({ ClassName }: { ClassName?: string }) {
    const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
    const leftEyeBall = useRef<HTMLDivElement>(null);
    const rightEyeBall = useRef<HTMLDivElement>(null);
    const leftEyeContainer = useRef<HTMLDivElement>(null);
    const rightEyeContainer = useRef<HTMLDivElement>(null);

    const calculateEyePosition = (eyeBall: HTMLDivElement, eyeContainer: HTMLDivElement) => {
        const eye = eyeContainer.getBoundingClientRect();
        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;

        const angle = Math.atan2(mouseCoordinates.y - eyeCenterY, mouseCoordinates.x - eyeCenterX);

        const maxRadius = (eye.width - eyeBall.offsetWidth) / 2;
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

    const getEyePosition = (eyeBall: RefObject<HTMLDivElement>, eyeContainer: RefObject<HTMLDivElement>) => {
        if (!eyeBall.current || !eyeContainer.current) return { x: 0, y: 0 };
        return calculateEyePosition(eyeBall.current, eyeContainer.current);
    };

    const leftEyePosition = getEyePosition(leftEyeBall, leftEyeContainer);
    const rightEyePosition = getEyePosition(rightEyeBall, rightEyeContainer);

    return (
        <div className={`w-[150px] h-[150px] bg-splash-orange items-center justify-center rounded-full pt-[10px] lg:flex hidden ${ClassName ? ClassName : 'relative'}`}>
            <Image src={HeartImage} alt="Heart" width={120} height={120} />
            <div ref={leftEyeContainer} className="absolute top-[65px] left-9 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div
                    ref={leftEyeBall}
                    className="w-3 h-3 bg-black rounded-full absolute top-1/2 left-1/2"
                    style={{
                        transform: `translate(calc(-50% + ${leftEyePosition.x}px), calc(-50% + ${leftEyePosition.y}px))`
                    }}
                />
            </div>
            <div ref={rightEyeContainer} className="absolute top-[65px] right-9 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div
                    ref={rightEyeBall}
                    className="w-3 h-3 bg-black rounded-full absolute top-1/2 left-1/2"
                    style={{
                        transform: `translate(calc(-50% + ${rightEyePosition.x}px), calc(-50% + ${rightEyePosition.y}px))`
                    }}
                />
            </div>
        </div>
    )
}

export default Heart