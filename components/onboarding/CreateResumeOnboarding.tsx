'use client';

import { useCVDataContext } from '@/contexts/cv-data-context';
import { createJobProfile } from '@/libs/actions';
import { JobProfile } from '@/libs/definitions';
import React, { FormEvent, useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { ViewResumeOnboarding } from './ViewResumeOnboarding';
import { defaultJobProfile } from '@/libs/job-profile-util';
import { PersonalInformationOnboarding } from './cv-sections/PersonalInformationOnboarding';
import { EducationDetailsOnboarding } from './cv-sections/EducationDetailsOnboarding';
import { ExperienceDetailsOnboarding } from './cv-sections/ExperienceDetailsOnboarding';
import { AdditionalInfoOnboarding } from './cv-sections/AdditionalInfoOnboarding';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CreateResumeOnboarding: React.FC = () => {
  const router = useRouter()
  const { CVData, setCVData } = useCVDataContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedProfile, setSubmittedProfile] = useState<JobProfile | null>(null);
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
    console.log('test', jobProfile);
    setSubmittedProfile(jobProfile);
    // try {      
    //   const response = await createJobProfile(jobProfile);

    //   if (response.success) {
    //     toast.success("Profile saved successfully!");
    //     setSubmittedProfile(jobProfile);
    //     // router.push('/dashboard')
    //   } else {
    //     toast.error("Error saving profile.");
    //     console.error("Error saving profile:", response.error);
    //   }
    // } catch (error) {
    //   console.error("Error submitting profile:", error);
    // }
  };

  if (submittedProfile) {
    return <ViewResumeOnboarding profile={submittedProfile} />;
  }
  
  return (
    <div className='w-full h-full py-5 flex flex-col'>
      <div className="flex-1 overflow-y-auto px-[270px] mb-5">
        <h1 className="text-[32px] mb-6 leading-none">View & Edit Resume</h1>
        <p className='text-xl mb-12 leading-none'>Your resume is filled out. Please check each section and correct them, before continuing.</p>
        <div className="mb-10">
          <ul className="w-full flex items-center ">
            <li className={`w-[280px] h-[80px] border-2 rounded-2xl text-lg flex items-center px-10 ${currentStep >= 1 ? 'border-primary text-primary' : 'border-[#E0E0E0] text-[#595959]'}`}><span className="text-[40px] mr-5">1</span>Pesonal Info</li>
            <li className={`w-10 h-1 flex-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-[#E0E0E0]'}`}></li>
            <li className={`w-[280px] h-[80px] border-2 rounded-2xl text-lg flex items-center px-10 ${currentStep >= 2 ? 'border-primary text-primary' : 'border-[#E0E0E0] text-[#595959]'}`}><span className="text-[40px] mr-5">2</span>Education</li>
            <li className={`w-10 h-1 flex-1 ${currentStep >= 3 ? 'bg-primary' : 'bg-[#E0E0E0]'}`}></li>
            <li className={`w-[280px] h-[80px] border-2 rounded-2xl text-lg flex items-center px-10 ${currentStep >= 3 ? 'border-primary text-primary' : 'border-[#E0E0E0] text-[#595959]'}`}><span className="text-[40px] mr-5">3</span>Experience</li>
            <li className={`w-10 h-1 flex-1 ${currentStep >= 4 ? 'bg-primary' : 'bg-[#E0E0E0]'}`}></li>
            <li className={`w-[280px] h-[80px] border-2 rounded-2xl text-lg flex items-center px-10 ${currentStep >= 4 ? 'border-primary text-primary' : 'border-[#E0E0E0] text-[#595959]'}`}><span className="text-[40px] mr-5">4</span>Additional Info</li>
          </ul>
        </div>

        <FormProvider {...methods}>
          <form
            id='my-form'
            className="w-full flex flex-col"
            onSubmit={methods.handleSubmit(handleProfileSubmit)}>
            <div className="">
              {currentStep === 1 && <PersonalInformationOnboarding />}
              {currentStep === 2 && <EducationDetailsOnboarding />}
              {currentStep === 3 && <ExperienceDetailsOnboarding />}
              {currentStep === 4 && <AdditionalInfoOnboarding />}
            </div>
          </form>
        </FormProvider>
      </div>

      <div className="w-full flex flex-none justify-between px-[270px] border-t border-base-content pt-5">
        {currentStep === 1 
        ? <button
            className="w-max place-self-end btn btn-primary rounded-full px-4 text-white text-lg"
            type="button"
            onClick={() => setCVData(null)}
          >
            Continue with CV
          </button>
        : <div></div>}
        <div className="flex gap-5">
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
  );
};