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
import { useRouter } from 'next/navigation';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { ButtonSubmit } from '@/components/ButtonSubmit';
import { ButtonApplication } from '@/components/ButtonApplication';

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
  const router = useRouter();

  const { register, formState, handleSubmit } = useForm<CoverLetterCoverLetter>(
    {
      defaultValues: letter.cover_letter,
    }
  );

  const handleLetterSubmit = async (data: CoverLetterCoverLetter) => {
    // console.log(JSON.stringify((data)));
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
        className={`w-[940px] h-[1330px] mx-auto overflow-y-auto text-black shadow-xl mb-[80px] ${activeSection ? 'bg-black/20' : 'bg-white'
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
            className='w-full h-full flex flex-col gap-4 px-10 py-8 text-base'
          >
            {/* Header */}
            <div className=''>
              <TextareaAutosize
                {...register(`header.applicant_details.name`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`header.applicant_details.address`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`header.applicant_details.city_state_zip`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`header.applicant_details.email`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`header.applicant_details.phone_number`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`header.company_details.name`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
            </div>

            {/* Body */}
            <div className=''>
              <TextareaAutosize
                {...register(`body.greeting`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`body.opening_paragraph`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`body.body_paragraphs`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`body.closing_paragraph`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
            </div>

            {/* Footer */}
            <div className=''>
              <TextareaAutosize
                {...register(`footer.date`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`footer.closing`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
              <TextareaAutosize
                {...register(`footer.signature`)}
                minRows={1}
                className='w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto'
              />
            </div>
          </div>
        </form>
      </div>

      <JobButtomSheet className='flex-none items-center justify-between'>
        <ButtonApplication title='Go Back' handleClick={goBack} />

        <div className='flex items-center gap-10'>
          <p className='text-lg text-white font-semibold'>
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
