'use client';

import { JobProfile } from '@/libs/definitions';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { updateJobProfile } from '@/libs/actions';
import toast from 'react-hot-toast';
import { defaultJobProfile } from '@/libs/utils/job-profile-util';
import { ProfilePersonalInformation } from './resume-sections/ProfilePersonalInformation';
import { ProfileEducationDetails } from './resume-sections/ProfileEducationDetails';
import { ProfileExperienceDetails } from './resume-sections/ProfileExperienceDetails';
import { ProfileAdditionalInfo } from './resume-sections/ProfileAdditionalInfo';
import { type CVFormData, cvFormSchema } from '@/libs/validations/cv-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaSpinner } from 'react-icons/fa';

interface Props {
  profile: JobProfile
}

export const UserProfile: FC<Props> = ({ profile }) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<CVFormData>({
    defaultValues: profile ?? defaultJobProfile,
    resolver: zodResolver(cvFormSchema)
  });

  const onSubmit = async (data: JobProfile) => {
    setIsLoading(true);
    try {
      const response = await updateJobProfile(data);

      if (response.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Error updating profile.");
        console.error("Error updating profile:", response.error);
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full'>
      {/* Header Section */}
      <div className="mb-5 font-montserrat">
        <p className="page-header mb-2">My Profile</p>
        <p className="text-gray-500">Manage your personal and professional information</p>
      </div>

      <FormProvider {...methods}>
        <form
          className="w-full flex flex-col md:p-6 lg:p-8 font-jura"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onSubmit={methods.handleSubmit((data) => onSubmit(data as JobProfile))}
        >
          <ProfilePersonalInformation />
          <ProfileEducationDetails />
          <ProfileExperienceDetails />
          <ProfileAdditionalInfo />

          <button 
            type="submit"
            className="btn btn-primary text-white w-[200px] self-end mt-5 font-semibold text-[18px] disabled:bg-my-neutral-2 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading
              ? (
                <>
                    <p>Submitting</p>
                    <FaSpinner className="animate-spin" />
                </>
              ) : (
                <>
                    <p>Save Changes</p>
                </>
              )
            }
          </button>
        </form>
      </FormProvider>
    </div>
  );
};