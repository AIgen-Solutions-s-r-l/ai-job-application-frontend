'use client';

import { JobProfile } from '@/libs/definitions';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { updateJobProfile } from '@/libs/actions';
import toast from 'react-hot-toast';
import { defaultJobProfile } from '@/libs/utils/job-profile-util';
import { ProfilePersonalInformation } from './resume-sections/ProfilePersonalInformation';
import { ProfileEducationDetails } from './resume-sections/ProfileEducationDetails';
import { ProfileExperienceDetails } from './resume-sections/ProfileExperienceDetails';
import { ProfileAdditionalInfo } from './resume-sections/ProfileAdditionalInfo';

interface Props {
  profile: JobProfile
}

export const UserProfile: FC<Props> = ({ profile }) => {

  const methods = useForm({
    defaultValues: profile ?? defaultJobProfile,
  });

  const onSubmit = async (data: JobProfile) => {
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
          className="w-full flex flex-col"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <ProfilePersonalInformation />
          <ProfileEducationDetails />
          <ProfileExperienceDetails />
          <ProfileAdditionalInfo />

          <button type="submit" className="btn btn-primary text-white w-[200px] self-end mt-5">Save Changes</button>
        </form>
      </FormProvider>
    </div>
  );
};