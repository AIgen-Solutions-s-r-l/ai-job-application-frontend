"use client"

import React, { useState, useEffect, useCallback, FormEvent, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { JobProfile } from "@/libs/definitions";
import { FaSpinner } from 'react-icons/fa';
import PersonalInformationStep from "./modal-steps/PersonalInformationStep";
import EducationDetailsStep from "./modal-steps/EducationDetailsStep";
import ExperienceDetailsStep from "./modal-steps/ExperienceDetailsStep";
import AdditionalInfoStep from "./modal-steps/AdditionalInfoStep";
import ProfileSetupStep from "./modal-steps/ProfileSetupStep";
import { CVFileContext } from "./table";
import { cVDataToJobProfile  } from "@/libs/utils";
import { apiClientJwt } from "@/libs/api/client";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  existingProfile?: any;
  onSubmit: (jobProfile: JobProfile) => void;
}

const defaultJobProfile: JobProfile = {
  personalInfo: {
    name: "",
    surname: "",
    date_of_birth: Date.now().toString(),
    country: "",
    city: "",
    address: "",
    phone_prefix: "",
    phone: "",
    email: "",
    github: "",
  },
  educationDetails: [
    {
      start_date: "",
      institution: "",
      field_of_study: "",
      education_level: "",
      year_of_completion: "",
      final_evaluation_grade: "",
    }
  ],
  experienceDetails: [
    {
      company: "",
      industry: "",
      location: "",
      position: "",
      skills_acquired: [],
      employment_period: "",
      key_responsibilities: [],
    }
  ],
  additionalInfo: {
    projects: [
      {
        link: "",
        name: "",
        description: "",
      }
    ],
    achievements: [
      {
        name: "",
        description: "",
      }
    ],
    certifications: [
      {
        name: "",
        description: "",
      }
    ],
    languages: [
      {
        language: "",
        proficiency: "",
      }
    ],
    interests: [],
    availability: {
      notice_period: "",
    },
    salaryExpectations: {
      salary_range_usd: "",
    },
    selfIdentification: {
      gender: "",
      veteran: false,
      pronouns: "",
      ethnicity: "",
      disability: false,
    },
    legalAuthorization: {
      requires_eu_visa: false,
      requires_uk_visa: false,
      requires_us_visa: false,
      requires_canada_visa: false,
      eu_work_authorization: false,
      uk_work_authorization: false,
      us_work_authorization: false,
      requires_eu_sponsorship: false,
      requires_uk_sponsorship: false,
      requires_us_sponsorship: false,
      canada_work_authorization: false,
      requires_canada_sponsorship: false,
      legally_allowed_to_work_in_eu: false,
      legally_allowed_to_work_in_uk: false,
      legally_allowed_to_work_in_us: false,
      legally_allowed_to_work_in_canada: false
    },
    workPreferences: {
      remote_work: false,
      in_person_work: false,
      open_to_relocation: false,
      willing_to_undergo_drug_tests: false,
      willing_to_complete_assessments: false,
      willing_to_undergo_background_checks: false
    }
  }
}

const JobProfileDetail = ({ isModalOpen, setIsModalOpen, existingProfile, onSubmit }: ModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm({ mode: "all" });
  const [isLoading, setIsLoading] = useState(false);
  const { cvFile, setCVData } = useContext(CVFileContext);

  useEffect(() => {
    methods.reset(existingProfile || defaultJobProfile)
  }, [existingProfile, methods.reset]);

  const validateStep = useCallback(async () => {
    let validateFields: string[] = [];
    switch (currentStep) {
      case 1: validateFields = ['personalInfo.profile_alias', 'cv']; break;
      case 2: validateFields = ['personalInfo']; break;
      case 3: validateFields = ['educationDetails']; break;
      case 4: validateFields = ['experienceDetails']; break;
      case 5: validateFields = ['additionalInfo']; break;
    }

    return await methods.trigger(validateFields);
  }, [currentStep]);

  const nextStep = async (ev: FormEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    if (currentStep === 1 && cvFile instanceof File) {
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append('file', cvFile);
        const {
          data: { data },
        } = await apiClientJwt.post('/api/upload/resume', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 20000,
        });

        setCVData(data);
        const newProfile = cVDataToJobProfile(data);
        methods.reset(newProfile || defaultJobProfile);
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    }

    if (await validateStep())
      setCurrentStep((prev) => prev + 1)
  };

  const prevStep = (ev: FormEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    setCurrentStep((prev) => prev - 1);
  }

  return (
    <>
      <input type="checkbox" id="job-profile-detail-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(false)} />
      <div className="modal">
        <FormProvider {...methods}>
          <form
            className="modal-box w-11/12 max-w-4xl h-[95vh] rounded-xl flex flex-col px-0"
            onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex-col justify-between items-center px-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold leading-7">
                  {existingProfile ? "Edit Job Profile" : "Add New Job Profile"}
                </h3>
                <label htmlFor="job-profile-detail-modal" className="btn btn-sm btn-circle btn-ghost">
                  ✕
                </label>
              </div>

              {/* Steps */}
              <ul className="steps w-full mb-4">
                <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Profile Setup</li>
                <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Personal Info</li>
                <li className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Education</li>
                <li className={`step ${currentStep >= 4 ? 'step-primary' : ''}`}>Experience</li>
                <li className={`step ${currentStep >= 5 ? 'step-primary' : ''}`}>Additional Info</li>
              </ul>
            </div>

            {/* Contenedor scrolleable */}
            <div className="flex-grow overflow-y-auto px-6 pb-6">
              {currentStep === 1 && <ProfileSetupStep />}
              {currentStep === 2 && <PersonalInformationStep />}
              {currentStep === 3 && <EducationDetailsStep />}
              {currentStep === 4 && <ExperienceDetailsStep />}
              {currentStep === 5 && <AdditionalInfoStep />}
            </div>

            {/* Botones de navegación */}
            <div className="modal-action px-6">
              <button className="btn" type="button" onClick={prevStep} disabled={currentStep === 1 || methods.formState.isSubmitting}>
                Previous
              </button>
              {currentStep < 5 ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={nextStep}
                  disabled={isLoading}
                >
                  {isLoading && <FaSpinner className="animate-spin" />}
                  Next
                </button>
              ) : (
                <button className="btn btn-primary" type="submit" disabled={methods.formState.isSubmitting}>
                  {methods.formState.isSubmitting && <FaSpinner className="animate-spin" />}
                  {existingProfile ? "Update Profile" : "Add Profile"}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default JobProfileDetail;