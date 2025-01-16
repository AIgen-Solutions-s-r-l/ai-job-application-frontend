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
  if (!applications) {
    applications = {
      "115eb9e4-fb8c-4229-b986-01d9b0d70a6c": {
          "job_id": 9999,
          "title": "Mobile Developer",
          "description": "Mobile developer for creative apps in Flutter",
          "portal": "my_portal",
          "sent": true
      },
      "215eb9e4-fb8c-4229-b986-01d9b0d70a6d": {
          "job_id": 8888,
          "title": "Frontend Developer",
          "description": "Frontend developer for creative interfaces",
          "portal": "sium",
          "sent": true
      },
      "315eb9e4-fb8c-4229-b986-01d9b0d70a6e": {
          "job_id": 7777,
          "title": "Backend Developer",
          "description": "Backend developer with a focus on APIs",
          "portal": "test_portal",
          "sent": true
      }
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