import React, { useCallback } from 'react';
import { Resume } from '../../../libs/types/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';
import { useActiveSectionContext } from '../../../contexts/active-section-context';
import { useCVTemplateContext } from '../../../contexts/cv-template-context';

type FormData = Pick<Resume, "educationDetails">

const ExamNestedFieldArray: React.FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): React.ReactElement => {
  const { register, getValues } = useFormContext<FormData>();
  const { fields, append, insert, remove } = useFieldArray({
    name: `educationDetails.${index}.exam`
  })
  const { template } = useCVTemplateContext();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, respIndex: number) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        insert(respIndex + 1, "");
        setTimeout(() => {
          const nextInputId = `subject-${index}-${respIndex + 1}`;
          const nextInput = document.getElementById(nextInputId) as HTMLInputElement | null;
          nextInput?.focus();
        }, 0);
      } else if (e.key === 'Backspace' && !e.currentTarget.value) {
        e.preventDefault();
        if (fields.length > 1) {
          remove(respIndex);
          setTimeout(() => {
            const prevInputId = `subject-${index}-${respIndex - 1}`;
            const prevInput = document.getElementById(prevInputId) as HTMLInputElement | null;
            prevInput?.focus();
          }, 0);
        }
        remove(respIndex);
      }
    },
    [fields.length, insert, remove, index]
  );

  const handleInsertExam = (respIndex: number) => {
    insert(respIndex + 1, "");
  }

  const handleRemoveExam = (respIndex: number) => {
    remove(respIndex);
  }

  if (!fields.length) return null;

  return (
    <ul className={cn('relative', template.education.compactList)}>
      {fields.map((responsibility, respIndex) => (
        <li key={responsibility.id} className='group relative'>
          <NullifiedInput
            id={`subject-${index}-${respIndex}`}
            {...register(`educationDetails.${index}.exam.${respIndex}.subject`)}
            placeholder="Subject of Exam"
            onKeyDown={(e) => handleKeyDown(e, respIndex)}
          />
          &nbsp;→&nbsp;
          <NullifiedInput
            {...register(`educationDetails.${index}.exam.${respIndex}.grade`)}
            placeholder="Grade"
            onKeyDown={(e) => handleKeyDown(e, respIndex)}
          />
          <div
            className="ml-1 hidden group-hover:inline-flex w-[20px] h-[20px] bg-neutral-content items-center justify-center rounded-full text-lg leading-none cursor-pointer"
            onClick={() => handleRemoveExam(respIndex)}
          >-</div>
          <div
            className="ml-1 hidden group-hover:inline-flex w-[20px] h-[20px] bg-primray items-center justify-center rounded-full text-white text-lg leading-none cursor-pointer"
            onClick={() => handleInsertExam(respIndex)}
          >+</div>
        </li>
      ))}
    </ul>
  )
}

export const ResumeEducation: React.FC = () => {
  const { control, register, getValues } = useFormContext<FormData>();
  const { fields, append, remove, update } = useFieldArray({ control, name: "educationDetails" });
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'education-section';
  const { template } = useCVTemplateContext();

  const handleAddEducation = () => {
    const newIndex = fields.length;
    append({
      education_level: "",
      institution: "",
      field_of_study: "",
      final_evaluation_grade: "",
      year_of_completion: "",
      start_date: "",
      location: "",
      exam: [],
    });
    setActiveSection(`${section}-${newIndex}`);
  };

  const handleUpdateExam = (educationIndex: number) => {
    const currentValue = getValues(`educationDetails.${educationIndex}`);
    update(educationIndex, {
      ...currentValue,
      exam: [
        ...currentValue.exam,
        {
          subject: "",
          grade: ""
        }
      ]
    });
  };

  return (
    <div className={template.education.container} id="education-section">
      {!!fields.length && (
        <h2 className={template.education.h2}>
          Education
        </h2>
      )}
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`

        return (
          <div
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              template.education.entry,
              'relative border-2 hover:border-primary',
              activeIndex === activeSection ? 'bg-white border-primary' : 'border-transparent'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(activeIndex);
            }}
          >
            {activeIndex === activeSection && (
              <EntryOperator
                itemsLength={fields.length}
                onAdd={handleAddEducation}
                onRemove={() => {
                  remove(index);
                  setActiveSection(null);
                }}
              >
                <div
                  className='h-[40px] flex items-center gap-2 bg-base-100 px-3 text-base-content'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateExam(index);
                  }}
                >
                  <p className={cn('text-base')}>Add Exams</p>
                </div>
              </EntryOperator>
            )}
            <div className={template.education.entryHeader}>
              <span className={template.education.entryName}>
                <NullifiedInput
                  {...register(`educationDetails.${index}.institution`)}
                  placeholder="Institution"
                />
              </span>
              <span className={template.education.entryLocation}>
                <NullifiedInput
                  {...register(`educationDetails.${index}.location`)}
                  placeholder="Location"
                  className="min-w-2"
                />
              </span>
            </div>
            <div className={template.education.entryDetails}>
              <span className={template.education.entryTitle}>
                <NullifiedInput
                  {...register(`educationDetails.${index}.education_level`)}
                  placeholder="Education Level"
                  className="min-w-2"
                />
                &nbsp;in&nbsp;
                <NullifiedInput
                  {...register(`educationDetails.${index}.field_of_study`)}
                  placeholder="Field of Study"
                />
                &nbsp;|&nbsp;Grade:&nbsp;
                <NullifiedInput
                  {...register(`educationDetails.${index}.final_evaluation_grade`)}
                  placeholder="Grade"
                  className="min-w-2"
                />
                /4
              </span>
              <span className={template.education.entryYear}>
                <NullifiedInput
                  {...register(`educationDetails.${index}.start_date`)}
                  placeholder="Start Date"
                  className="min-w-2"
                />
                &nbsp;&#8209;&nbsp;
                <NullifiedInput
                  {...register(`educationDetails.${index}.year_of_completion`)}
                  placeholder="End Date"
                  className="min-w-2"
                />
              </span>
            </div>

            <ExamNestedFieldArray index={index} />
          </div>
        )
      })}
    </div>
  );
};