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
      <div className="w-full pt-5 pb-[120px] bg bg-base-200">
        <div className="w-[1440px] mx-auto flex-1">
          <h3 className="text-[28px] mb-10 leading-none">View & edit your information</h3>
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
              <div className="">
                {currentStep === 1 && <PersonalInformationOnboarding />}
                {currentStep === 2 && <EducationDetailsOnboarding />}
                {currentStep === 3 && <ExperienceDetailsOnboarding />}
                {currentStep === 4 && <AdditionalInfoOnboarding />}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="fixed bottom-0 z-10 w-full h-[100px] flex items-center bg-secondary">
        <div className="w-[1440px] mx-auto flex flex-none items-center justify-between">
          {currentStep === 1
          ? <button
              className="w-max place-self-end btn btn-primary rounded-full px-4 text-white text-lg"
              type="button"
              onClick={() => setCVData(null)}
            >
              Back to CV Uploader
            </button>
          : <div></div>}
          <div className="flex gap-5">
            {/* <button
              className="bg-black py-3 text-lg leading-none text-white w-[240px] rounded-full flex justify-center items-center hover:bg-base-content"
              type="button"
              onClick={() => console.log(methods.formState.errors)}
            >
              <p>Show Errors</p>
            </button>
            <button
              className="bg-black py-3 text-lg leading-none text-white w-[240px] rounded-full flex justify-center items-center hover:bg-base-content"
              type="button"
              onClick={() => console.log(methods.clearErrors())}
            >
              <p>Clear Errors</p>
            </button> */}
            <button className="bg-black pl-[16px] pr-[30px] py-3 text-lg leading-none text-white w-[240px] rounded-full flex justify-between items-center hover:bg-base-content disabled:bg-neutral-content" type="button" onClick={prevStep} disabled={currentStep === 1 || methods.formState.isSubmitting}>
              <ChevronLeft size={30} />
              <p>Previous Step</p>
            </button>
            {currentStep < 4 ? (
              <button
                className="bg-black pl-[30px] pr-[16px] py-3 text-lg leading-none text-white w-[240px] rounded-full flex justify-between items-center hover:bg-base-content"
                type="button"
                onClick={nextStep}
              >
                <p>Next Step</p>
                <ChevronRight size={30} />
              </button>
            ) : (
              <button className="bg-black pl-[30px] pr-[16px] py-3 text-lg leading-none text-white w-[300px] rounded-full flex justify-between items-center hover:bg-base-content" form='my-form' type="submit" disabled={methods.formState.isSubmitting}>
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