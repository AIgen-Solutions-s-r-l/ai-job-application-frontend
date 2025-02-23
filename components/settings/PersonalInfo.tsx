'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';
import { JobProfile } from '@/libs/definitions';
import { PersonalInformationOnboarding } from '@/components/onboarding/cv-sections/PersonalInformationOnboarding';
import { updateResume } from '@/libs/api/resume';
import { typography } from '../typography';

type Props = {
  jobProfile?: JobProfile;
};

export const PersonalInfo: React.FC<Props> = ({ jobProfile }) => {
  const methods = useForm({
    defaultValues: jobProfile,
  });

  const handleProfileSubmit = async (jobProfile?: JobProfile) => {
    if (!jobProfile) {
      toast.error('wrong jobProfile');
      return;
    }

    const newData = { personalInfo: jobProfile.personalInfo };

    updateResume(newData)
      .then((response) => {
        if (!response.success) {
          return toast.error('Error saving personal info.');
        }

        toast.success('Personal saved successfully!');
      })
      .catch(() => {
        toast.error('Error saving personal info.');
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        id='personal-info-form'
        className='w-full flex flex-col'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        onSubmit={methods.handleSubmit(handleProfileSubmit)}
      >
        <PersonalInformationOnboarding />

        <div className='flex justify-end gap-4 mt-6'>
          <button
            type='submit'
            className={typography.forms.submitButton}
            disabled={methods.formState.isSubmitting}
          >
            Save Changes
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
