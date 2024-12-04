import React, { ChangeEvent, DragEvent, useState, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiFillFilePdf } from 'react-icons/ai';
import { CVFileContext } from '../table';

type FormData = {
  cv: File | null;
};

const ProfileSetupStep = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  const { cvFile, setCVFile } = useContext(CVFileContext);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setCVFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) setCVFile(file);
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold text-base">Upload Resume</h3>
      <p className="text-sm text-gray-500 mb-2">
        Drag and drop your resume or click to upload. This will automatically fill the following sections:
      </p>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center flex-grow rounded-xl border-2 ${
          isDragging ? 'border-dashed border-primary bg-primary/10' : 'border-dashed border-gray-300 bg-gray-50'
        } transition-all duration-200 p-6`}
      >
        {!cvFile ? (
          <>
            <AiFillFilePdf className={`text-7xl ${isDragging ? 'text-primary' : 'text-base-400'} mb-4`} />
            <p className="text-gray-600 text-base font-medium mb-2">Drag & drop your PDF resume here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label className="btn btn-primary">
              Browse Files
              <input
                type="file"
                accept=".pdf"
                {...register('cv', { required: 'Resume is required' })}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <AiFillFilePdf className="text-7xl text-red-500 mb-4" />
            <p className="text-gray-600 text-sm">{cvFile.name}</p>
            <button
              type="button"
              onClick={() => setCVFile(null)}
              className="btn btn-error mt-4"
            >
              Remove File
            </button>
          </div>
        )}
        {errors.cv && <p className="text-error text-sm mt-4">{errors.cv.message}</p>}
      </div>
    </div>
  );
};

export default ProfileSetupStep;