'use client';

import React, { ChangeEvent, DragEvent, FormEvent, useState } from 'react';
import Image from "next/image";
import { useCVDataContext } from "@/contexts/cv-data-context";
import { extractResume } from "@/libs/actions";
import { defaultJobProfile } from "@/libs/utils/job-profile-util";
import LaboroSmiley from '@/public/LaboroSmileyPurple.svg';
import { Container } from "@/components/Container";
import { AiFillFilePdf } from "react-icons/ai";
import { ArrowRightIcon } from '@/components/AppIcons';

export const UploadResumeOnboarding: React.FC = () => {
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(10);
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

        setProgress(10);
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
        }, 100);

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

  return (
    <Container className="flex flex-col">
      <h4 className="text-xl font-montserrat leading-none font-medium">Upload your resume</h4>

      <div className="w-full mt-[120px] p-[30px] rounded-[22px] bg-my-neutral-0">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-[408px] rounded-[22px] border border-dashed border-my-neutral-7 ${isDragging && 'bg-neutral-cold-0'}`}
        >
          {isDragging ? (
            <AiFillFilePdf className='text-7xl text-primary' />
          ) : cvFile ? (
            <>
              <p className="font-montserrat text-[20px] font-semibold leading-none mb-10">You have successfully uploaded "{cvFile.name}"</p>
              <button
                type="button"
                onClick={handleUpload}
                className="w-[273px] my-btn-green"
              >
                <p className="text-xl">Create Resume</p>
                <ArrowRightIcon />
              </button>
            </>
          ) : (
            <>
              <p className="hidden md:inline-block font-montserrat text-[20px] leading-none mb-10">You can also drag & drop your resume here.</p>
              <label className="w-[273px] my-btn-green cursor-pointer">
                <p className="font-jura text-[18px] font-semibold">Upload</p>
                <ArrowRightIcon />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="w-full grow flex items-center justify-center flex-col gap-10">
          <div className="flex gap-4 items-center justify-between text-xl w-[400px]">
          </div>
          <div className='absolute left-0 bottom-0 h-[28px] w-full text-my-neutral-0' >
            <div
              className='flex items-center px-4 absolute left-0 h-full bg-primary-light-purple transition-all duration-300'
              style={{ width: `${progress}%` }}
            >
              <span>{`${progressText} ${progress}%`}</span>
              <Image
                src={LaboroSmiley}
                alt='Smiley Face :)'
                className='absolute right-[-14px] bottom-0'
              />
            </div>
          </div>
        </div>
      )}

      {!cvFile && (
        <button className="my-btn place-self-end text-white text-[18px] font-jura mt-14 mb-10" onClick={() => setCVData(defaultJobProfile)}>Continue Manually</button>
      )}
    </Container>
  );
};