'use client';

import React from 'react';
import { JobManagerHeader } from './JobManagerHeader';
import { JobManagerList } from './JobManagerList';
import { JobManagerBottomSheet } from './JobManagerBottomSheet';
import { PendingApplicationRecord } from '@/libs/definitions';
import JobManagerProvider from '@/contexts/job-manager-context';

interface Props {
  applications: PendingApplicationRecord;
}

export const JobManagerView: React.FC<Props> = ({ applications }) => {
  applications = {
    "30302425-44ca-466a-ae37-87a5039d73ee": {
      "job_id": 9999,
      "title": "Mobile Developer",
      "description": "Mobile developer for creative apps in Flutter",
      "portal": "my_portal",
      "company": 'Backend Gurus',
      "location": 'Turin, Italy',
      "workplace_type": 'Remote',
      "sent": true
    },
    "e162ec6e-75c2-4cf7-b858-5e4edd7e9b0c": {
      "job_id": 8888,
      "title": "Frontend Developer",
      "description": "Frontend developer for creative interfaces",
      "portal": "sium",
      "company": 'Backend Gurus',
      "location": 'Turin, Italy',
      "workplace_type": 'Remote',
      "sent": true
    },
    "30302425-44ca-466a-ae37-87a5039d73e1": {
      "job_id": 9999,
      "title": "Mobile Developer",
      "description": "Mobile developer for creative apps in Flutter",
      "portal": "my_portal",
      "company": 'Backend Gurus',
      "location": 'Turin, Italy',
      "workplace_type": 'Remote',
      "sent": true
    },
    "e162ec6e-75c2-4cf7-b858-5e4edd7e9b02": {
      "job_id": 8888,
      "title": "Frontend Developer",
      "description": "Frontend developer for creative interfaces",
      "portal": "sium",
      "company": 'Backend Gurus',
      "location": 'Turin, Italy',
      "workplace_type": 'Remote',
      "sent": true
    },
    "315eb9e4-fb8c-4229-b986-01d9b0d70a6e": {
      "job_id": 7777,
      "title": "Backend Developer",
      "description": "Backend developer with a focus on APIs",
      "portal": "test_portal",
      "company": 'Backend Gurus',
      "location": 'Turin, Italy',
      "workplace_type": 'Remote',
      "sent": true
    }
  }

  return (
    <JobManagerProvider initialApplications={applications}>
      <div className="w-full h-full flex flex-col items-center">
        <JobManagerHeader />
        <JobManagerList />
        <JobManagerBottomSheet />
      </div>
    </JobManagerProvider>
  );
};