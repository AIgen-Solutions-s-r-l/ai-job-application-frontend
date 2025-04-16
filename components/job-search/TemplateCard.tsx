import Image from "next/image";
import { Check } from "lucide-react";

interface TemplateCardProps {
    templateNumber: number;
    templateImage: any;
    isEnabled: boolean;
    isSelected: boolean;
    // eslint-disable-next-line no-unused-vars
    onSelect: (templateNumber: number) => void;
}

const TemplateCard = ({
    templateNumber,
    templateImage,
    isEnabled,
    isSelected,
    onSelect
}: TemplateCardProps) => {
    return (
        <div className="flex-shrink-0 flex flex-col gap-2 items-center justify-center">
            <Image
                src={templateImage}
                alt={`template ${templateNumber}`}
                width={200}
                height={280}
                className={`${isSelected && 'outline outline-1 outline-black'}`}
            />
            <div
                className={`flex items-center justify-center h-8 w-8 job-select-box rounded-[6px] ${isEnabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => isEnabled && onSelect(templateNumber)}
            >
                {isSelected && <Check size={24} />}
            </div>
        </div>
    );
};

export default TemplateCard;