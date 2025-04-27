'use client';

import { useCVDataContext } from '@/contexts/cv-data-context';
import { createJobProfile } from '@/libs/actions';
import { JobProfile } from '@/libs/definitions';
import React, { FormEvent, useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { PersonalInformationOnboarding } from './cv-sections/PersonalInformationOnboarding';
import { EducationDetailsOnboarding } from './cv-sections/EducationDetailsOnboarding';
import { ExperienceDetailsOnboarding } from './cv-sections/ExperienceDetailsOnboarding';
import { AdditionalInfoOnboarding } from './cv-sections/AdditionalInfoOnboarding';
import { StepTracking } from './cv-sections/StepTracking';
import { Container } from '../Container';
import { ButtonUnderline } from '../ButtonUnderline';
import { ArrowLeftIcon, ArrowRightIcon } from '../AppIcons';
import ChoseLocationModal from './ChooseLocationModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { cvFormSchema, type CVFormData } from '@/libs/validations/cv-form-schema';
import { scrollToError } from '@/libs/utils/form-utils';

export const CreateResumeOnboarding: React.FC = () => {
  const { CVData, setCVData } = useCVDataContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [defaultLocation, setDefaultLocation] = useState<string>('');

  const methods = useForm<CVFormData>({
    defaultValues: CVData,
    resolver: zodResolver(cvFormSchema)
  });

  const validateStep = useCallback(async () => {
    let validateFields: any = [];
    switch (currentStep) {
      case 1: validateFields = ['personalInfo']; break;
      case 2: validateFields = ['educationDetails']; break;
      case 3: validateFields = ['experienceDetails']; break;
      case 4: validateFields = ['additionalInfo']; break;
    }

    const isValid = await methods.trigger(validateFields);
    if (!isValid) {
      // Scroll to the first error
      scrollToError(methods.formState.errors);
    }
    return isValid;
  }, [currentStep, methods]);

  const nextStep = async (ev: FormEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (await validateStep())
      setCurrentStep((prev) => prev + 1)
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const prevStep = (ev: FormEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }

  const handleProfileSubmit = async (jobProfile: JobProfile) => {
    try {
      const response = await createJobProfile(jobProfile);
      if (response.success) {
        toast.success("Profile saved successfully!");
        setDefaultLocation(jobProfile.personalInfo.country)
        setIsModalOpen(true);
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
        <Container className="flex-1">
          <h4 className="text-[16px] md:text-[20px] font-montserrat mb-[30px] lg:mb-[60px] font-medium leading-none">View & edit your information</h4>
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
        </Container>
      </div>

      <div className="fixed bottom-0 left-0 z-10 w-full h-[70px] flex items-center bg-primary">
        <Container className="flex flex-none items-center justify-between">
          {currentStep === 1
            ? <ButtonUnderline title='Back to CV Uploader' handleClick={() => setCVData(null)} />
            : <div></div>}
          {/* <button
            className="my-btn-clay gap-10 text-[18px] font-jura text-white font-semibold disabled:hidden"
            type="button"
            onClick={() => {
              console.log("the errors: ", methods.formState.errors);
              console.log("the values: ", methods.getValues());
            }}
          >
            <p>test</p>
          </button> */}
          <div className="flex gap-2 md:gap-5 font-jura text-sm md:text-lg">
            <button
              className="my-btn-clay gap-1 md:gap-10 text-[18px] font-jura text-white font-semibold disabled:hidden"
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1 || methods.formState.isSubmitting}
            >
              <ArrowLeftIcon classname='fill-white' />
              <p>Previous Step</p>
            </button>
            {currentStep < 4 ? (
              <button
                className="my-btn-green gap-1 md:gap-10 font-semibold text-[18px] font-jura"
                type="button"
                onClick={nextStep}
              >
                <p>Next Step</p>
                <ArrowRightIcon classname='fill-black' />
              </button>
            ) : (
              <button
                className="my-btn-green gap-1 md:gap-10 font-semibold text-[18px] font-jura"
                form='my-form'
                type="submit"
                disabled={methods.formState.isSubmitting}
              >
                {methods.formState.isSubmitting && <FaSpinner className="animate-spin" />}
                <p>Save & Continue</p>
                <ArrowRightIcon classname='fill-black' />
              </button>
            )}
          </div>
        </Container>
      </div>

      {defaultLocation && (
        <ChoseLocationModal
          isModalOpen={isModalOpen}
          defaultLocation={''}
        />
      )}
    </div>
  );
};