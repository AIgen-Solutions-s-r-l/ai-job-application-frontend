import React from 'react';
import { ResumePersonal } from './_components/ResumePersonal';
import { ResumeEducation } from './_components/ResumeEducation';
import { ResumeExperience } from './_components/ResumeExperience';
import { ResumeAdditional } from './_components/ResumeAdditional';
import { useActiveSectionContext } from '../../contexts/active-section-context';
import { Resume } from '../../libs/types/application.types';
import { FormProvider, useForm } from 'react-hook-form';
import { updateApplicationResumeAction } from '@/libs/actions';
import toast from 'react-hot-toast';
import { useCVTemplateContext } from '../../contexts/cv-template-context';
import { TemplateType } from './_components/resumeTemplates';
import { FaSpinner } from 'react-icons/fa';
import { fromResumeType } from '@/libs/utils/application.util';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
  resume: Resume;
}

export const TemplateProfessional: React.FC<Props> = ({ id, resume }) => {
  const { activeSection } = useActiveSectionContext();
  const { template, setSelectedTemplate } = useCVTemplateContext();
  const router = useRouter();

  const methods = useForm({
    defaultValues: resume,
  });
  
  const handleResumeSubmit = async (data: Resume) => {
    // console.log(JSON.stringify(fromResumeType(data)));
    try {
      const response = await updateApplicationResumeAction(id, data);
      
      if (response.success) {
        toast.success("Application resume updated successfully!");
        console.log("Application resume updated successfully");
      } else {
        toast.error("Error updating application resume.");
        console.error("Error updating application resume:", response.error);

      }
    } catch (error) {
      console.error("Error submitting application resume:", error);
    }
  };

  return (
    <>
      {/* <select onChange={(e) => setSelectedTemplate(e.target.value as TemplateType)}>
        <option value="default">Default</option>
        <option value="cloyola">Cloyola</option>
        <option value="josyladBlue">Josylad Blue</option>
        <option value="josyladGrey">Josylad Grey</option>
        <option value="samodumBold">Samodum Bold</option>
        <option value="krishnavalliappan">Krishnavalliappan</option>
      </select> */}
      <FormProvider {...methods}>
        <div className={cn(
          'w-[940px] h-[1330px] mx-auto overflow-y-auto text-black shadow-xl mb-[80px]', 
          activeSection ? 'bg-black/20' : (template.background ?? 'bg-white'))}>
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
            <div id="resume-sections" className={template.body}>
              <ResumePersonal />
              <ResumeEducation />
              <ResumeExperience />
              <ResumeAdditional />
            </div>
          </form>
        </div>
      </FormProvider>
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
            <p className='text-base text-white'>You’re editing the Resume</p>
            <button
              className="bg-black text-base leading-none text-white w-[220px] h-[40px] rounded-full flex justify-center items-center hover:bg-base-content disabled:bg-neutral-content"
              form='my-form'
              type="submit"
              disabled={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting && <FaSpinner className="animate-spin" />}
              <p>Update Resume</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
