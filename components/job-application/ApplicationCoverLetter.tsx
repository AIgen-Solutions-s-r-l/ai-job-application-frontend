import React from 'react';
import { useActiveSectionContext } from '../../contexts/active-section-context';
import { CoverLetter, CoverLetterCoverLetter } from '../../libs/types/response-application.types';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { updateApplicationLetterAction } from '@/libs/actions';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import { useRouter } from 'next/navigation';


interface Props {
  id: string;
  letter: CoverLetter;
}

export const ApplicationCoverLetter: React.FC<Props> = ({ id, letter }) => {
  const { activeSection } = useActiveSectionContext();
  const router = useRouter();

  const { register, formState, handleSubmit } = useForm<CoverLetterCoverLetter>({
    defaultValues: letter.cover_letter,
  });
  
  const handleLetterSubmit = async (data: CoverLetterCoverLetter) => {
    // console.log(JSON.stringify((data)));
    try {
      const response = await updateApplicationLetterAction(id, data);
      
      if (response.success) {
        toast.success("Application cover letter updated successfully!");
        console.log("Application cover letter updated successfully");
      } else {
        toast.error("Error updating application cover letter.");
        console.error("Error updating application cover letter:", response.error);

      }
    } catch (error) {
      console.error("Error submitting application cover letter:", error);
    }
  };

  return (
    <>
      <div className={`w-[940px] h-[1330px] mx-auto overflow-y-auto text-black shadow-xl mb-[80px] ${activeSection ? 'bg-black/20' : 'bg-white'}`}>
        <form
          id='my-form'
          className="w-full"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onSubmit={handleSubmit(handleLetterSubmit)}
        >
          <div id="letter-sections" className="w-full h-full flex flex-col gap-4 px-10 py-8 text-base">
            {/* Header */}
            <div className="">
              <TextareaAutosize
                {...register(`header.applicant_details.name`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`header.applicant_details.address`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`header.applicant_details.city_state_zip`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`header.applicant_details.email`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`header.applicant_details.phone_number`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`header.company_details.name`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
            </div>

            {/* Body */}
            <div className="">
              <TextareaAutosize
                {...register(`body.greeting`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`body.opening_paragraph`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`body.body_paragraphs`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`body.closing_paragraph`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
            </div>

            {/* Footer */}
            <div className="">
              <TextareaAutosize
                {...register(`footer.date`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`footer.closing`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
              <TextareaAutosize
                {...register(`footer.signature`)}
                minRows={1}
                className="w-full leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="fixed bottom-0 z-10 w-full h-[60px] flex items-center bg-secondary">
        <div className="w-[1440px] mx-auto flex flex-none items-center justify-between">
          <button
            className="w-[220px] h-[40px] rounded-full text-white text-lg"
            type="button"
            onClick={() => router.replace('/manager')}
          >
            Go Back
          </button>
          <div className="flex items-center gap-10">
            <p className='text-base text-white'>You’re editing the Cover Letter</p>
            <button
              className="bg-black text-base leading-none text-white w-[220px] h-[40px] rounded-full flex justify-center items-center hover:bg-base-content disabled:bg-neutral-content"
              form='my-form'
              type="submit"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting && <FaSpinner className="animate-spin" />}
              <p>Update Cover Letter</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
