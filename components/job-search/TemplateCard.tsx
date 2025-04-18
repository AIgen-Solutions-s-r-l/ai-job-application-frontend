import { Check } from "lucide-react";
import { Resume } from "@/libs/types/application.types";
import { cn } from "@/lib/utils";
import { useCVTemplateContext } from "@/contexts/cv-template-context";
import { templateStyles, templateStyleByIndex } from "@/libs/utils/resume-template-utils";

interface TemplateCardProps {
    templateNumber: number;
    isEnabled: boolean;
    isSelected: boolean;
    recommended: boolean;
    text: string;
    resume: Resume;
    onSelect: (templateNumber: number) => void;
}

const TemplateCard = ({
    templateNumber,
    text,
    isEnabled,
    isSelected,
    recommended,
    resume,
    onSelect
}: TemplateCardProps) => {
    const templateStyleKey = templateStyleByIndex[templateNumber];
    const template = templateStyles[templateStyleKey as keyof typeof templateStyles];

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className={cn(
                    "flex-shrink-0 flex flex-col gap-2 items-center justify-center cursor-pointer",
                    isSelected && 'outline outline-4 outline-black'
                )}
                onClick={() => isEnabled && onSelect(templateNumber)}
            >
                <div className={cn(
                    "w-[350px] md:w-[450px] h-[500px] overflow-y-clip p-4 shadow-lg",
                    template.background ?? 'bg-white'
                )}>
                    <div className={template.body}>
                        {/* Personal Information */}
                        <div className={template.personal.header}>
                            <h1 className={template.personal.h1}>
                                {resume?.personalInfo?.name} {resume?.personalInfo?.surname}
                            </h1>
                            <div className={template.personal.contactSection}>
                                <span className={template.personal.contactItem}>{resume?.personalInfo?.email}</span>
                                <span className={template.personal.contactItem}>{resume?.personalInfo?.phone}</span>
                                <span className={template.personal.contactItem}>
                                    {resume?.personalInfo?.city}, {resume?.personalInfo?.country}
                                </span>
                            </div>
                        </div>

                        {/* Education */}
                        {resume?.educationDetails && resume?.educationDetails.length > 0 && (
                            <div className={template.education.container}>
                                <h2 className={template.education.h2}>Education</h2>
                                {resume?.educationDetails.map((edu, index) => (
                                    <div key={index} className={template.education.entry}>
                                        <div className={template.education.entryHeader}>
                                            <span className={template.education.entryName}>{edu.institution}</span>
                                            <span className={template.education.entryLocation}>
                                                {edu.location?.city}, {edu.location?.country}
                                            </span>
                                        </div>
                                        <div className={template.education.entryDetails}>
                                            <span className={template.education.entryTitle}>
                                                {edu.education_level} in {edu.field_of_study}
                                            </span>
                                            <span className={template.education.entryYear}>
                                                {edu.start_date} &nbsp;&#8209;&nbsp; {edu.year_of_completion}
                                            </span>
                                        </div>
                                        {edu.exam && edu.exam.length > 0 && (
                                            <div className={template.education.coursesDetails}>
                                                Relevant Courses:&nbsp;
                                                {edu.exam.map((exam, examIndex) => (
                                                    <span key={examIndex}>
                                                        {exam.subject} ({exam.grade})
                                                        {examIndex === edu.exam.length - 1 ? '.' : ', '}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {edu.final_evaluation_grade && (
                                            <div className={template.education.gradeDetails}>
                                                Final Grade:&nbsp;{edu.final_evaluation_grade}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Experience */}
                        {resume?.experienceDetails && resume?.experienceDetails.length > 0 && (
                            <div className={template.experience.container}>
                                <h2 className={template.experience.h2}>Professional Experience</h2>
                                {resume?.experienceDetails.map((exp, index) => (
                                    <div key={index} className={template.experience.entry}>
                                        <div className={template.experience.entryHeader}>
                                            <span className={template.experience.entryName}>{exp.company}</span>
                                            <span className={template.experience.entryLocation}>
                                                {exp.location?.city}, {exp.location?.country}
                                            </span>
                                        </div>
                                        <div className={template.experience.entryDetails}>
                                            <span className={template.experience.entryTitle}>{exp.position}</span>
                                            <span className={template.experience.entryYear}>
                                                {exp.employment_start_date} &nbsp; - &nbsp; {exp.employment_end_date}
                                            </span>
                                        </div>
                                        <ul className={template.experience.compactList}>
                                            {exp.key_responsibilities.map((responsibility, i) => (
                                                <li key={i} className={template.experience.listItem}>
                                                    {responsibility}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Additional Information */}
                        {resume?.additionalInfo && (
                            <div className={template.additional.container}>
                                <h2 className={template.additional.h2}>Additional Information</h2>
                                {resume?.additionalInfo?.languages && resume?.additionalInfo?.languages.length > 0 && (
                                    <div>
                                        <h3 className={template.additional.h3}>Languages</h3>
                                        <ul className={template.additional.compactList}>
                                            {resume?.additionalInfo?.languages.map((lang, index) => (
                                                <li key={index} className={template.additional.listItem}>
                                                    {lang.language} - {lang.proficiency}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {resume?.additionalInfo?.additional_skills && resume?.additionalInfo?.additional_skills.length > 0 && (
                                    <div>
                                        <h3 className={template.additional.h3}>Skills</h3>
                                        <ul className={template.additional.compactList}>
                                            {resume?.additionalInfo?.additional_skills.map((skill, index) => (
                                                <li key={index} className={template.additional.listItem}>
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <p className="flex items-center font-montserrat text-[30px]">
                {text} {recommended && <span className="text-[18px]">(Suggested)</span>}
            </p>
        </div>
    );
};

export default TemplateCard;