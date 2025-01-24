import React, { useEffect, useRef } from 'react';
import { ResumePersonal } from './_components/ResumePersonal';
import { ResumeEducation } from './_components/ResumeEducation';
import { ResumeExperience } from './_components/ResumeExperience';
import { ResumeAdditional } from './_components/ResumeAdditional';
import { useActiveSectionContext } from '../../contexts/active-section-context';
import { Resume } from '../../libs/types/application.types';
import { FormProvider, useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { updateApplicationResumeAction } from '@/libs/actions';
import toast from 'react-hot-toast';

interface Props {
  id: string;
  resume: Resume;
}

export const TemplateProfessional = React.forwardRef<any, Props>(({ id, resume }, ref) => {
  const { activeSection } = useActiveSectionContext();

  const methods = useForm({
    defaultValues: resume,
    shouldUnregister: false,
  });

  React.useImperativeHandle(ref, () => ({
    formState: methods.formState,
    getValues: () => methods.control._formValues,
  }));
  
  const handleResumeSubmit = async (data: Resume) => {
    try {
      const response = await updateApplicationResumeAction(id, data);
      
      if (response.success) {
        toast.success("Application resume updated successfully!");
        methods.reset(data, { keepDirty: false });
      } else {
        toast.error("Error updating application resume.");
      }
    } catch (error) {
      console.error("Error submitting application resume:", error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className={`w-[940px] h-[1330px] mx-auto overflow-y-auto text-black shadow-xl ${activeSection ? 'bg-black/20' : 'bg-white'}`}>
          <form
            id='my-form'
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            onSubmit={methods.handleSubmit(handleResumeSubmit)}
          >
            <div id="resume-sections" className="w-full py-8 h-full px-10">
              <ResumePersonal />
              <ResumeEducation />
              <ResumeExperience />
              <ResumeAdditional />
            </div>
          </form>
        </div>
      </FormProvider>
      <button 
        className="bg-black px-10 mx-auto mt-5 py-3 text-lg leading-none text-white rounded-full flex gap-5 items-center hover:bg-base-content" 
        form='my-form' 
        type="submit" 
        disabled={methods.formState.isSubmitting}
      >
        {methods.formState.isSubmitting && <FaSpinner className="animate-spin" />}
        <p>Save Editing</p>
      </button>
    </>
  );
});

TemplateProfessional.displayName = "TemplateProfessional"