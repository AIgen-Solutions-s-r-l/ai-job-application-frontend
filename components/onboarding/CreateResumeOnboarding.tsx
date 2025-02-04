'use client';

import { useCVDataContext } from '@/contexts/cv-data-context';
import { createJobProfile } from '@/libs/actions';
import { JobProfile } from '@/libs/definitions';
import React, { FormEvent, useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { PersonalInformationOnboarding } from './cv-sections/PersonalInformationOnboarding';
import { EducationDetailsOnboarding } from './cv-sections/EducationDetailsOnboarding';
import { ExperienceDetailsOnboarding } from './cv-sections/ExperienceDetailsOnboarding';
import { AdditionalInfoOnboarding } from './cv-sections/AdditionalInfoOnboarding';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StepTracking } from './cv-sections/StepTracking';

export const CreateResumeOnboarding: React.FC = () => {
  const router = useRouter()
  const { CVData, setCVData } = useCVDataContext();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm({
    defaultValues: CVData,
  });

  const validateStep = useCallback(async () => {
    let validateFields: any = [];
    switch (currentStep) {
      case 1: validateFields = ['personalInfo']; break;
      case 2: validateFields = ['educationDetails']; break;
      case 3: validateFields = ['experienceDetails']; break;
      case 4: validateFields = ['additionalInfo']; break;
    }

    return await methods.trigger(validateFields);
  }, [currentStep]);

  const nextStep = async (ev: FormEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (await validateStep())
      setCurrentStep((prev) => prev + 1)
  };

  const prevStep = (ev: FormEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    setCurrentStep((prev) => prev - 1);
  }

  const handleProfileSubmit = async (jobProfile: JobProfile) => {
    try {
      const response = await createJobProfile(jobProfile);

      if (response.success) {
        toast.success("Profile saved successfully!");
        router.push('/dashboard')
      } else {
        toast.error("Error saving profile.");
        console.error("Error saving profile:", response.error);
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };


  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className="w-full pb-[100px] bg-base-100">
        <div className="w-[1440px] mx-auto flex-1">
          <h4 className="text-[20px] font-montserrat mb-[60px] font-medium leading-none">View & edit your information</h4>
          <div className="mb-10">
            <StepTracking currentStep={currentStep} />
          </div>
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
              <div className="font-jura">
                {currentStep === 1 && <PersonalInformationOnboarding />}
                {currentStep === 2 && <EducationDetailsOnboarding />}
                {currentStep === 3 && <ExperienceDetailsOnboarding />}
                {currentStep === 4 && <AdditionalInfoOnboarding />}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="fixed bottom-0 z-10 w-full h-[80px] flex items-center bg-primary">
        <div className="w-[1440px] mx-auto flex flex-none items-center justify-between">
          {currentStep === 1
            ? <button
              className="my-btn text-white text-[18px] font-jura font-semibold"
              type="button"
              onClick={() => setCVData(null)}
            >
              Back to CV Uploader
            </button>
            : <div></div>}
          <div className="flex gap-5 font-jura">
            <button className="bg-my-neutral-6 pl-[16px] pr-[30px] py-3 text-lg font-semibold leading-none text-white w-[240px] rounded-[20px] flex justify-between items-center hover:bg-my-neutral-5 disabled:hidden" type="button" onClick={prevStep} disabled={currentStep === 1 || methods.formState.isSubmitting}>
              <ChevronLeft size={30} />
              <p>Previous Step</p>
            </button>
            {currentStep < 4 ? (
              <button
                className="bg-splash-green pl-[30px] pr-[16px] py-3 text-lg font-semibold leading-none text-black w-[240px] rounded-[20px] flex justify-between items-center"
                type="button"
                onClick={nextStep}
              >
                <p>Next Step</p>
                <ChevronRight size={30} />
              </button>
            ) : (
              <button className="bg-splash-green pl-[30px] pr-[16px] py-3 text-lg font-semibold leading-none text-black w-[300px] rounded-[20px] flex justify-between items-center" form='my-form' type="submit" disabled={methods.formState.isSubmitting}>
                {methods.formState.isSubmitting && <FaSpinner className="animate-spin" />}
                <p>Save & Continue</p>
                <ChevronRight size={30} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};