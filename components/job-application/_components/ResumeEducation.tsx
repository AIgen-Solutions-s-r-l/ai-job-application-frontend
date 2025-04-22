import { FC, ReactElement, useCallback, KeyboardEvent } from 'react';
import { Resume } from '../../../libs/types/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';
import { useActiveSectionContext } from '../../../contexts/active-section-context';
import { useCVTemplateContext } from '../../../contexts/cv-template-context';

type FormData = Pick<Resume, "educationDetails">

const ExamNestedFieldArray: FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, insert, remove } = useFieldArray({
    name: `educationDetails.${index}.exam`
  })
  const { template } = useCVTemplateContext();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, respIndex: number) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        insert(respIndex + 1, { subject: "", grade: "" });
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

  // const handleInsertExam = (respIndex: number) => {
  //   insert(respIndex + 1, { subject: "", grade: "" });
  // }

  // const handleRemoveExam = (respIndex: number) => {
  //   remove(respIndex);
  // }

  if (!fields.length) return null;

  return (
    <div className={cn('relative', template.education.coursesDetails)}>
      Relevant Courses:&nbsp;
      {fields.map((responsibility, respIndex) => (
        <div key={responsibility.id} className='inline group relative'>
          {/* <div
            className="ml-1 hidden group-hover:inline-flex w-[20px] h-[20px] bg-neutral-content items-center justify-center rounded-full text-lg leading-none cursor-pointer"
            onClick={() => handleRemoveExam(respIndex)}
          >-</div> */}
          <NullifiedInput
            id={`subject-${index}-${respIndex}`}
            {...register(`educationDetails.${index}.exam.${respIndex}.subject`)}
            placeholder="Subject of Exam"
            onKeyDown={(e) => handleKeyDown(e, respIndex)}
            className='mr-1 small-autocomplete'
          />
          (<NullifiedInput
            {...register(`educationDetails.${index}.exam.${respIndex}.grade`)}
            placeholder="Grade"
            onKeyDown={(e) => handleKeyDown(e, respIndex)}
            className='small-autocomplete'
          />)
          {/* <div
            className="ml-1 hidden group-hover:inline-flex w-[20px] h-[20px] bg-neutral-content items-center justify-center rounded-full text-lg leading-none cursor-pointer"
            onClick={() => handleInsertExam(respIndex)}
          >+</div> */}
          {index === fields.length - 1 ? '.' : ', '}
        </div>
      ))}
    </div>
  )
}

export const ResumeEducation: FC = () => {
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
      location: {
        city: '',
        country: ''
      },
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
              'entry-border',
              activeIndex === activeSection ? 'entry-active' : 'border-transparent'
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
                  className='h-[40px] flex items-center gap-2 bg-my-neutral-4 px-3 text-white hover:bg-my-neutral-4/90 transition-colors ease-in duration-200'
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
                  {...register(`educationDetails.${index}.location.city`)}
                  placeholder="City"
                  className="min-w-2 max-w-60 small-autocomplete"
                />
                ,&nbsp;
                <NullifiedInput
                  {...register(`educationDetails.${index}.location.country`)}
                  placeholder="Country"
                  className="min-w-2 max-w-40 small-autocomplete"
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
              </span>
              <span className={template.education.entryYear}>
                <NullifiedInput
                  {...register(`educationDetails.${index}.start_date`)}
                  placeholder="Start Date"
                  className="min-w-2 max-w-28 small-autocomplete"
                />
                &nbsp;&#8209;&nbsp;
                <NullifiedInput
                  {...register(`educationDetails.${index}.year_of_completion`)}
                  placeholder="End Date"
                  className="min-w-2 max-w-28 small-autocomplete"
                />
              </span>
            </div>

            <ExamNestedFieldArray index={index} />

            <div className={template.education.gradeDetails}>
              Final Grade:&nbsp;
              <NullifiedInput
                {...register(`educationDetails.${index}.final_evaluation_grade`)}
                placeholder="Grade"
                className="min-w-2 small-autocomplete"
              />
            </div>
          </div>
        )
      })}
    </div>
  );
};