import Wire from './Wire.svg';

const Loading = () => {
    const Boxes = [0, 1, 2];

    return (
        <div
            className="relative w-[400px] h-[100px] bg-cover bg-center"
            style={{ backgroundImage: `url(${Wire.src})` }}
        >
            {Boxes.map((time, index) => (
                <div
                    key={index}
                    className={`animate-float absolute w-[50px] h-[50px] bg-black bottom-[-20px] left-[-50px] animation-loop opacity-0`}
                    style={{ animationDelay: `${time}s` }}
                />
            ))}
        </div>
    );
};

export default Loading;
