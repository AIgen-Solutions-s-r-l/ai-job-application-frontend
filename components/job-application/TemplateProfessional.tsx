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
// import { TemplateType } from './_components/resumeTemplates';
// import { fromResumeType } from '@/libs/utils/application.util';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { ButtonSubmit } from '@/components/ButtonSubmit';
import { ButtonUnderline } from '../ButtonUnderline';

interface Props {
  id: string;
  resume: Resume;
  goBack?: () => void;
}

export const TemplateProfessional: React.FC<Props> = ({
  id,
  resume,
  goBack,
}) => {
  const { activeSection } = useActiveSectionContext();
  const { template, setSelectedTemplate } = useCVTemplateContext();
  const router = useRouter();

  const methods = useForm({
    defaultValues: resume,
  });

  const handleResumeSubmit = async (data: Resume) => {
    // console.log(JSON.stringify(data));
    // console.log(JSON.stringify(fromResumeType(data)));
    try {
      const response = await updateApplicationResumeAction(id, data);

      if (response.success) {
        toast.success('Application resume updated successfully!');
        console.log('Application resume updated successfully');
      } else {
        toast.error('Error updating application resume.');
        console.error('Error updating application resume:', response.error);
      }
    } catch (error) {
      console.error('Error submitting application resume:', error);
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
            className='w-full'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            onSubmit={methods.handleSubmit(handleResumeSubmit)}
          >
            <div id='resume-sections' className={template.body}>
              <ResumePersonal />
              <ResumeEducation />
              <ResumeExperience />
              <ResumeAdditional />
            </div>
          </form>
        </div>
      </FormProvider>
      <JobButtomSheet className='flex-none items-center justify-between'>
        <ButtonUnderline title='Go Back' handleClick={goBack} />
        <div className='flex items-center gap-10'>
          <p className='text-[20px] text-white font-montserrat'>
            You’re editing the Resume
          </p>
          <ButtonSubmit
            title='Update Resume'
            isSubmitting={methods.formState.isSubmitting}
            disabled={methods.formState.isSubmitting}
          />
        </div>
      </JobButtomSheet>
    </>
  );
};
