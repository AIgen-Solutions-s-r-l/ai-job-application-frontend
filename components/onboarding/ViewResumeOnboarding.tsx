'use client';

import { JobProfile } from '@/libs/definitions';
import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { updateJobProfile } from '@/libs/actions';
import toast from 'react-hot-toast';
import { PersonalInformationOnboarding } from './cv-sections/PersonalInformationOnboarding';
import { ResumeSection } from '../ResumeSection';

interface Props {
  profile: JobProfile
}

export const ViewResumeOnboarding: React.FC<Props> = ({ profile }) => {
  const methods = useForm<JobProfile>({ defaultValues: profile });

  // const validateStep = useCallback(async () => {
  //   let validateFields: any = ['personalInfo', 'educationDetails', 'experienceDetails', 'additionalInfo'];

  //   return await methods.trigger(validateFields);
  // }, [methods]);
    
  const onSubmit = async (data: JobProfile) => {
    // await validateStep()
    console.log('gay', data);
    // try {
    //   const response = await updateJobProfile(data);
      
    //   if (response.success) {
    //     toast.success("Profile updated successfully!");
    //     console.log("Profile updated successfully");
    //   } else {
    //     toast.error("Error updating profile.");
    //     console.error("Error updating profile:", response.error);

    //   }
    // } catch (error) {
    //   console.error("Error submitting profile:", error);
    // }
  };

  return (
    <div className='w-full h-full px-[100px]'>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">View & Edit Resume</h1>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className=''>
          <div className="flex flex-col gap-10">
            <ResumeSection title="Personal Information">
              <PersonalInformationOnboarding />
            </ResumeSection>

            <ResumeSection title="Education">
              <div></div>
            </ResumeSection>
            
            <ResumeSection title="Work Experience">
              <div></div>
            </ResumeSection>

            <ResumeSection title="Additional Information">
              <div></div>
            </ResumeSection>
          </div>
          <button type="submit" className="btn btn-primary w-[200px] mx-auto">Save Changes</button>
        </form>
      </FormProvider>
    </div>
  );
};