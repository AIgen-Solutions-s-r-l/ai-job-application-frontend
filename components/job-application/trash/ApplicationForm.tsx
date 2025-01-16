'use client';

import { Resume } from '@/components/job-application/trash/old-application.types';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PersonalInfo } from './PersonalInfo';

interface Props {
  resumeData: Resume;
  setResumeData: React.Dispatch<React.SetStateAction<Resume>>;
}

export const ApplicationForm: React.FC<Props> = ({ resumeData, setResumeData }) => {
  const methods = useForm({
    defaultValues: resumeData,
  });

  // Watch for changes and update resumeData state
  React.useEffect(() => {
    const subscription = methods.watch((data) => {
      const updatedData: Resume = {
        ...data,
        body: {
          ...data.body,
          education_details: {
            ...data.body?.education_details,
            education_details: data.body?.education_details?.education_details.map((detail) => ({
              education_level: detail.education_level || '',
              institution: detail.institution || '',
              field_of_study: detail.field_of_study || '',
              final_evaluation_grade: detail.final_evaluation_grade || '',
              start_date: detail.start_date || '',
              year_of_completion: detail.year_of_completion || '',
            })) || [],
          },
        },
      };
      return setResumeData(updatedData);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, setResumeData]);

  const handleProfileSubmit = async (cvData: Resume) => {
    console.log('cvData', cvData);
    // try {      
      
    // } catch (error) {
    //   console.error("Error submitting profile:", error);
    // }
  };
    
  return (
    <FormProvider {...methods}>
      <form
        id='my-form'
        className="w-full flex flex-col"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        onSubmit={methods.handleSubmit(handleProfileSubmit)}
      >
        <div className="">
          <PersonalInfo />
        </div>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};