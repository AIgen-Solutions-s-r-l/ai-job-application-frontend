'use client';

import { DetailedPendingApplication } from '@/libs/definitions';
import React, { useState } from 'react';

interface Props {
  applicationDetails: DetailedPendingApplication;
}

type Tab = "jobInfo" | "resume" | "coverLetter";

export const JobApplicationTabs: React.FC<Props> = ({ applicationDetails }) => {
  if (!applicationDetails) {
      applicationDetails = {
      "resume_optimized": "test",
      "cover_letter": "test",
      "job_id": 8888,
      "title": "Frontend Developer",
      "description": "Frontend developer for creative interfaces",
      "portal": "sium",
      "sent": true
    }
  }
  const [ activeTab, setActiveTab ] = useState<Tab>("resume")
  
  return (
    <div className="w-full h-full flex flex-col bg-base-200">
      <div className="w-[1440px] mx-auto flex gap-10">
        <button className={`btn btn-outline ${activeTab === "jobInfo" ? "btn-primary" : ""}`} onClick={() => setActiveTab("jobInfo")}>jobInfo</button>
        <button className={`btn btn-outline ${activeTab === "resume" ? "btn-primary" : ""}`} onClick={() => setActiveTab("resume")}>resume</button>
        <button className={`btn btn-outline ${activeTab === "coverLetter" ? "btn-primary" : ""}`} onClick={() => setActiveTab("coverLetter")}>coverLetter</button>
      </div>
      <div className="w-[1440px] mx-auto">
        {activeTab === "jobInfo" && (<h1 className='text-[32px] leading-10 mb-8'>jobInfo</h1>)}
        {activeTab === "resume" && (<h1 className='text-[32px] leading-10 mb-8'>resume</h1>)}
        {activeTab === "coverLetter" && (<h1 className='text-[32px] leading-10 mb-8'>coverLetter</h1>)}
      </div>
    </div>
  );
};