'use client';

import { ChevronRight } from "lucide-react";
import { AiFillFilePdf } from "react-icons/ai";
import React, { ChangeEvent, DragEvent, FormEvent, useState } from 'react';
import { useCVDataContext } from "@/contexts/cv-data-context";
import { extractResume } from "@/libs/actions";
import { defaultJobProfile, toJobProfile } from "@/libs/job-profile-util";
import { FaSpinner } from "react-icons/fa";
import { JobProfile } from "@/libs/definitions";

export const UploadResumeOnboarding: React.FC = () => {
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

        // const data = await extractResume(formData);

        const data = JSON.parse(
          '{"personal_information":{"name":"Arystanbek","surname":"Kazhym","date_of_birth":null,"country":"Kazakhstan","city":"Almaty","address":null,"zip_code":null,"phone_prefix":"+7","phone":"7059848044","email":"cholicer@gmail.com","github":"https://github.com/Cholicer","linkedin":null},"education_details":[{"education_level":"B.S.","institution":"Almaty University of Power Engineering and Telecommunications","field_of_study":"Computer Science","final_evaluation_grade":null,"start_date":null,"year_of_completion":"March 2024","exam":{}}],"experience_details":[{"position":"Software Engineer Intern","company":"Aura","employment_period":"MAY 2024 - Present","location":"Almaty, KZ","industry":null,"key_responsibilities":["Participated in agile development processes, effectively adapting to changing requirements while maintaining high-quality results.","Documented development procedures, creating valuable reference materials for future projects or team members joining the team.","Collaborated with software engineers to develop and test application procedures for system efficiency.","Enhanced software performance by optimizing algorithms and streamlining code.","Utilized version control systems like Git effectively managing changes over time allowing for seamless collaboration among team members."],"skills_acquired":["Dart","JavaScript","TypeScript","Flutter","React.js","Next.js","Git","RESTful APIs","Firebase","Agile","Scrum"]}],"projects":[],"achievements":[],"certifications":[],"languages":[],"interests":["DC Comics","Touhou","Games","Movies","Manga"],"availability":{"notice_period":null},"salary_expectations":{"salary_range_usd":null},"self_identification":{"gender":null,"pronouns":null,"veteran":null,"disability":null,"ethnicity":null},"legal_authorization":{"eu_work_authorization":null,"us_work_authorization":null,"requires_us_visa":null,"legally_allowed_to_work_in_us":null,"requires_us_sponsorship":null,"requires_eu_visa":null,"legally_allowed_to_work_in_eu":null,"requires_eu_sponsorship":null,"canada_work_authorization":null,"requires_canada_visa":null,"legally_allowed_to_work_in_canada":null,"requires_canada_sponsorship":null,"uk_work_authorization":null,"requires_uk_visa":null,"legally_allowed_to_work_in_uk":null,"requires_uk_sponsorship":null},"work_preferences":{"remote_work":null,"in_person_work":null,"open_to_relocation":null,"willing_to_complete_assessments":null,"willing_to_undergo_drug_tests":null,"willing_to_undergo_background_checks":null}}'
        )

        const cvData: JobProfile = toJobProfile(data);

        setCVData(cvData);
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="w-full grow flex items-center justify-center">
      <FaSpinner className="animate-spin text-[42px]" />
    </div>;
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
            className={`flex flex-col items-center justify-center flex-grow rounded-xl border-2 mt-16  ${
              isDragging ? 'border-dashed border-primary bg-primary/10' : 'border-dashed border-gray-300 bg-base-200'
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