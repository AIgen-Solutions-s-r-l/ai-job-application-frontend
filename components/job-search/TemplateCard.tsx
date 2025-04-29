import { Resume } from "@/libs/types/application.types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface TemplateCardProps {
    templateNumber: number;
    isEnabled: boolean;
    isSelected: boolean;
    recommended: boolean;
    text: string;
    resume: Resume;
    onSelect: (templateNumber: number) => void;
    imageSrc: string | StaticImageData;
}

const TemplateCard = ({
    templateNumber,
    text,
    isEnabled,
    isSelected,
    recommended,
    resume,
    onSelect,
    imageSrc
}: TemplateCardProps) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className={cn(
                    "flex-shrink-0 flex flex-col gap-2 items-center justify-center cursor-pointer",
                    isSelected && 'outline outline-4 outline-black'
                )}
                onClick={() => isEnabled && onSelect(templateNumber)}
            >
                <div className="w-[250px] md:w-[450px] h-[280px] md:h-[50vh] overflow-hidden relative">
                    <Image
                        src={imageSrc}
                        alt={`Template ${templateNumber}`}
                        fill
                        className="object-fit h-full w-full"
                    />
                </div>
            </div>
            <p className="flex items-center font-montserrat text-lg md:text-xl lg:text-2xl xl:text-[27px]">
                {text} {recommended && <span className="text-base lg:text-[18px]">&nbsp;&nbsp;(Suggested)</span>}
            </p>
        </div>
    );
};

export default TemplateCard;