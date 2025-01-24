import React, { useEffect, useRef } from 'react';
import { useActiveSectionContext } from '../../contexts/active-section-context';
import { CoverLetter, CoverLetterCoverLetter } from '../../libs/types/response-application.types';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { updateApplicationLetterAction } from '@/libs/actions';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';


interface Props {
  id: string;
  letter: CoverLetter;
}

export const ApplicationCoverLetter = React.forwardRef<any, Props>(({ id, letter }, ref) => {
  const { activeSection } = useActiveSectionContext();

  const { register, formState, handleSubmit, reset, control } = useForm<CoverLetterCoverLetter>({
    defaultValues: letter.cover_letter,
    shouldUnregister: false,
  });
  
  React.useImperativeHandle(ref, () => ({
    getValues: () => control._formValues,
    formState: formState,
  }));
  
  const handleLetterSubmit = async (data: CoverLetterCoverLetter) => {
    try {
      const response = await updateApplicationLetterAction(id, data);
      
      if (response.success) {
        toast.success("Application cover letter updated successfully!");
        reset(data, { keepDirty: false });
      } else {
        toast.error("Error updating application cover letter.");
      }
    } catch (error) {
      console.error("Error submitting application cover letter:", error);
    }
  };

  return (
    <>
        <div className={`w-[940px] mx-auto overflow-y-auto text-black shadow-xl ${activeSection ? 'bg-black/20' : 'bg-white'}`}>
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
      <button 
        className="bg-black px-10 mx-auto mt-5 py-3 text-lg leading-none text-white rounded-full flex gap-5 items-center hover:bg-base-content" 
        form='my-form' 
        type="submit" 
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting && <FaSpinner className="animate-spin" />}
        <p>Save Editing</p>
      </button>
    </>
  );
});

ApplicationCoverLetter.displayName = "ApplicationCoverLetter"