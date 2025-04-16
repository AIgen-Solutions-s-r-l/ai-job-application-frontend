import { FC } from 'react';
import { useActiveSectionContext } from '../../contexts/active-section-context';
import {
  CoverLetter,
  CoverLetterCoverLetter,
} from '../../libs/types/response-application.types';
import { useForm } from 'react-hook-form';
import { updateApplicationLetterAction } from '@/libs/actions';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { ButtonSubmit } from '@/components/ButtonSubmit';
import { ButtonUnderline } from '../ButtonUnderline';
import { NullifiedInput } from '../ui/nullified-input';
import { formatDate } from '@/libs/utils/application.util';

interface Props {
  id: string;
  letter: CoverLetter;
  goBack?: () => void;
}

export const ApplicationCoverLetter: FC<Props> = ({
  id,
  letter,
  goBack,
}) => {
  const { activeSection } = useActiveSectionContext();

  const { register, formState, handleSubmit } = useForm<CoverLetterCoverLetter>(
    {
      defaultValues: {
        ...letter.cover_letter,
        footer: {
          ...letter.cover_letter.footer,
          date: formatDate(letter.cover_letter.footer.date),
        }
      },
    }
  );

  const handleLetterSubmit = async (data: CoverLetterCoverLetter) => {
    try {
      const response = await updateApplicationLetterAction(id, data);

      if (response.success) {
        toast.success('Application cover letter updated successfully!');
        console.log('Application cover letter updated successfully');
      } else {
        toast.error('Error updating application cover letter.');
        console.error(
          'Error updating application cover letter:',
          response.error
        );
      }
    } catch (error) {
      console.error('Error submitting application cover letter:', error);
    }
  };

  return (
    <>
      <div
        className={`w-full lg:w-[850px] h-[1200px] mx-auto overflow-y-auto text-black shadow-xl mb-[80px] ${activeSection ? 'bg-black/20' : 'bg-white'
          }`}
      >
        <form
          id='my-form'
          className='w-full'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onSubmit={handleSubmit(handleLetterSubmit)}
        >
          <div
            id='letter-sections'
            className='w-full h-full flex flex-col px-4 gap-9 md:px-12 py-10 text-base font-montserrat'
          >
            {/* Header */}
            <div className='w-full flex justify-between'>
              <div className="">
                <NullifiedInput
                  {...register(`header.company_details.name`)}
                  className='cover-letter-input'
                  placeholder="Company Name"
                />
                <NullifiedInput
                  {...register(`footer.date`)}
                  className='cover-letter-input'
                  placeholder="Date (e.g., January 1, 2024)"
                />
              </div>

              <div className="flex flex-col items-end">
                <NullifiedInput
                  {...register(`header.applicant_details.name`)}
                  className='cover-letter-input'
                  placeholder="Your Full Name"
                />
                <NullifiedInput
                  {...register(`header.applicant_details.email`)}
                  className='cover-letter-input'
                  placeholder="your.email@example.com"
                />
                <NullifiedInput
                  {...register(`header.applicant_details.phone_number`)}
                  className='cover-letter-input'
                  placeholder="Phone Number"
                />
              </div>
            </div>

            {/* Body */}
            <div className='space-y-3'>
              <TextareaAutosize
                {...register(`body.greeting`)}
                minRows={1}
                className='cover-letter-textarea'
                placeholder="Dear Hiring Manager,"
              />
              <TextareaAutosize
                {...register(`body.opening_paragraph`)}
                minRows={1}
                className='cover-letter-textarea'
                placeholder="I am writing to express my strong interest in [Position] at [Company Name]..."
              />
              <TextareaAutosize
                {...register(`body.body_paragraphs`)}
                minRows={1}
                className='cover-letter-textarea'
                placeholder="Detail your relevant experience, skills, and why you're a great fit for the role..."
              />
              <TextareaAutosize
                {...register(`body.closing_paragraph`)}
                minRows={1}
                className='cover-letter-textarea'
                placeholder="Thank you for considering my application. I look forward to discussing how I can contribute to your team..."
              />
            </div>

            {/* Footer */}
            <div className=''>
              <TextareaAutosize
                {...register(`footer.closing`)}
                minRows={1}
                className='cover-letter-textarea'
                placeholder="Sincerely,"
              />
              <TextareaAutosize
                {...register(`footer.signature`)}
                minRows={1}
                className='cover-letter-textarea'
                placeholder="Your Full Name"
              />
            </div>
          </div>
        </form>
      </div>

      <JobButtomSheet className='flex-none items-center justify-between'>
        <ButtonUnderline title='Go Back' handleClick={goBack} />

        <div className='flex items-center gap-2 md:gap-8 lg:gap-10'>
          <p className='text-sm md:text-base xl:text-[20px] text-white font-montserrat text-right'>
            You’re editing the Cover Letter
          </p>
          <ButtonSubmit
            title='Update Cover Letter'
            isSubmitting={formState.isSubmitting}
            disabled={formState.isSubmitting}
          />
        </div>
      </JobButtomSheet>
    </>
  );
};
