'use client';

import { ChevronRight } from "lucide-react";
import { AiFillFilePdf } from "react-icons/ai";
import React, { ChangeEvent, DragEvent, FormEvent, useState } from 'react';
import { useCVDataContext } from "@/contexts/cv-data-context";
import { extractResume } from "@/libs/actions";
import { defaultJobProfile, toJobProfile } from "@/libs/job-profile-util";
import Loading from "../Loading";
import { FaSpinner } from "react-icons/fa";
import { JobProfile } from "@/libs/definitions";

export const UploadResumeOnboarding: React.FC = () => {
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('Thinking...');
  const { setCVData } = useCVDataContext();

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

  const handleUpload = async (ev: FormEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    if (cvFile instanceof File) {
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append('pdf_file', cvFile);

        setProgress(0);
        const progressInternval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 20) {
              setProgressText('Reading your resume...')
            }
            if (prev >= 40) {
              setProgressText('Getting data out of your resume...')
            }
            if (prev >= 80) {
              setProgressText('Finalizing...')
            }
            if (prev >= 99) {

              clearInterval(progressInternval);
              return prev;
            }
            return prev + 1;
          });
        }, 120);

        const data = await extractResume(formData);

        clearInterval(progressInternval);
        setProgress(100);

        setCVData(data);
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full grow flex items-center justify-center flex-col gap-10">
        <div className="flex gap-4 items-center justify-between text-xl w-[400px]">
          <span>{progressText}</span>
          <span>{progress}%</span>
        </div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-[896px] mx-auto flex flex-col">
      <p className="text-xl mt-[100px]">Please upload your resume or drag & drop here to continue</p>

      {!cvFile ? (
        <>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center flex-grow rounded-xl border-2 mt-16  ${isDragging ? 'border-dashed border-primary bg-primary/10' : 'border-dashed border-gray-300 bg-base-200'
              } transition-all duration-200 p-6`}
          >
            <div className="flex flex-col items-center py-10">
              <AiFillFilePdf className={`text-7xl ${isDragging ? 'text-primary' : 'text-neutral'} mb-4`} />
              <p className="text-gray-600 text-base font-medium">Drag & drop your PDF resume here</p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <label className="btn btn-neutral">
                Browse Files
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <button className="w-max place-self-end btn btn-primary rounded-full px-4 text-white text-lg mt-14" onClick={() => setCVData(defaultJobProfile)}>Continue Manually</button>
        </>
      ) : (
        <div className="mt-10">
          <p className="text-xl font-bold mb-16">{cvFile.name}</p>
          <div className="flex gap-16">
            <button
              type="button"
              onClick={() => setCVFile(null)}
              className="btn btn-outline rounded-full px-6 text-lg"
            >
              Upload Again
            </button>
            <button
              type="button"
              onClick={handleUpload}
              className="btn btn-primary rounded-full flex items-center pl-6 pr-2 text-white text-lg"
            >
              <p className="text-xl">Upload Resume</p>
              <ChevronRight size={36} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};