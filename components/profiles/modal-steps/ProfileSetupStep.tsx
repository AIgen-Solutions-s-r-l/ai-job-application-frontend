import React, { ChangeEvent, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiFillFilePdf } from "react-icons/ai";
import { JobProfile } from '@/libs/definitions';
import { CVFileContext } from '../table';

type FormData = Pick<JobProfile, "personalInfo" | "cv">;

const ProfileSetupStep = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  const { cvFile, setCVFile } = useContext(CVFileContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

      {/* Profile Alias Explanation */}
      <div>
        <label className="label flex justify-start">Profile Alias <span className="text-error ml-1">*</span></label>
        <p className="text-sm text-gray-500 mb-2">The profile alias is a name that helps you easily identify this profile for future management. Use a descriptive name.</p>
        <input
          {...register('personalInfo.profile_alias', { required: 'Profile alias is required' })}
          className={`input input-bordered w-full ${errors.personalInfo?.profile_alias ? 'input-error' : ''}`}
          placeholder="e.g., Dev Profile, Marketing Profile"
        />
        {errors.personalInfo?.profile_alias && <p className="text-error">{errors.personalInfo?.profile_alias.message}</p>}
      </div>

      {/* CV Upload */}
      <div>
        <label className="label flex justify-start">Upload Resume</label>
        <p className="text-sm text-gray-500 mb-2">Upload your Resume to associate it with this profile, so you can use it for job applications.</p>
        {cvFile ?
          <div className='flex justify-between items-center bg-gray-200 py-2 px-4 rounded-full'>
            <div className='flex items-center'>
              <AiFillFilePdf className='text-4xl mr-2' /> {cvFile.name}
            </div>
            <button
              type="button"
              onClick={() => setCVFile(null)}
              className="btn btn-sm btn-outline btn-error"
            >
              <span className="text-sm">−</span>
            </button>
          </div> :
          <>
            <input
              type="file"
              accept=".pdf"
              {...register('cv', { required: 'CV is required' })}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                const file = ev.target.files[0];
                setCVFile(file ? file : cvFile);
              }}
              className={`file-input file-input-bordered w-full ${errors.cv ? 'input-error' : ''}`}
            />
            {errors.cv && <p className="text-error">{errors.cv.message}</p>}
          </>
        }
      </div>
    </div>
  );
};

export default ProfileSetupStep;