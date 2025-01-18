import React, { useEffect, useRef, useState } from 'react';
import { ResumePersonal } from './ResumeSections/ResumePersonal';
import { ResumeEducation } from './ResumeSections/ResumeEducation';
import { ResumeExperience } from './ResumeSections/ResumeExperience';
import { ResumeAdditional } from './ResumeSections/ResumeAdditional';
import { useActiveSectionContext } from './ResumeSections/active-section-context';
import { Resume } from './trash/application.types';
import { FormProvider, useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { DocumentPages } from './DocumentPages';

interface Props {
  resume: Resume;
}

const PAGE_HEIGHT = 1330;
const PAGE_WIDTH = 940;
const PAGE_PADDING = 40;

export const TemplateProfessional: React.FC<Props> = ({ resume }) => {
  const { activeSection } = useActiveSectionContext();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(1);

  const methods = useForm({
    defaultValues: resume,
  });
  
  const handleResumeSubmit = (data: Resume) => {
    // const updates = {};
    // for (const key in methods.formState.dirtyFields) {
    //   // Convert dot notation to MongoDB update format
    //   const parts = key.split('.');
    //   let current = updates;
    //   for (let i = 0; i < parts.length - 1; i++) {
    //     if (!current[parts[i]]) {
    //       current[parts[i]] = {};
    //     }
    //     current = current[parts[i]];
    //   }
    //   current[parts[parts.length - 1]] = data[key as keyof Resume]; // Type-safe access
    // }

    const redef = {
      "resume_optimized": {
        "resume": data
      }
    }

    console.log("Updates for data:", JSON.stringify(redef));
    console.log("Updates for dirtyFields:", JSON.stringify(methods.formState.dirtyFields));

    // console.log("Updates for MongoDB:", JSON.stringify(updates, null, 2));
    // onSave(data); // Or send the 'updates' object to your backend for the PUT request
  };

  useEffect(() => {
    if (resumeRef.current) {
      const resumeHeight = resumeRef.current.clientHeight;
      setTotalPages(Math.ceil(resumeHeight / PAGE_HEIGHT));
    }
  }, [resume, activeSection]); // Add dependencies to recalculate on resume change

  return (
    <>
      <FormProvider {...methods}>
        {/* <div className={`aspect-[210/297] h-fit w-1/2 mx-auto overflow-y-auto text-black shadow-xl ${activeSection ? 'bg-black/20' : 'bg-white'}`}> */}
          <DocumentPages>
            <form
              id='my-form'
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              onSubmit={methods.handleSubmit(handleResumeSubmit)}
            >
              <div id="resume-sections" className="w-full py-8 h-full px-10">
                <ResumePersonal />
                <ResumeEducation />
                <ResumeExperience />
                <ResumeAdditional />
              </div>
            </form>
          </DocumentPages>
        {/* </div> */}
      </FormProvider>
      <button 
        className="bg-black pl-[30px] pr-[16px] py-3 text-lg leading-none text-white w-[300px] rounded-full flex justify-between items-center hover:bg-base-content" 
        form='my-form' 
        type="submit" 
        disabled={methods.formState.isSubmitting}
      >
        {methods.formState.isSubmitting && <FaSpinner className="animate-spin" />}
        <p>Save & Continue</p>
      </button>
    </>
  );
};
