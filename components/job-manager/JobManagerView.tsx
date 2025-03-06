'use client';

import { FC } from 'react';
import { JobManagerHeader } from './JobManagerHeader';
import { JobManagerList } from './JobManagerList';
import { JobManagerBottomSheet } from './JobManagerBottomSheet';
import { PendingApplicationRecord } from '@/libs/definitions';
import JobManagerProvider from '@/contexts/job-manager-context';

interface Props {
  applications: PendingApplicationRecord;
}

export const JobManagerView: FC<Props> = ({ applications }) => {
  applications = {
        "ab586298-ab35-4591-94c9-266881002d41": {
            "id": null,
            "portal": "example",
            "title": "FP&A manager",
            "workplace_type": null,
            "posted_date": null,
            "job_state": null,
            "description": "Boh",
            "apply_link": null,
            "company_name": null,
            "location": null,
            "short_description": null,
            "field": null,
            "company_logo": null,
            "experience": null,
            "skills_required": null,
            "style": null,
            "sent": false,
            "gen_cv": null
        },
        "1aed2d05-d011-43cc-bf0a-77dc9f15253a": {
            "id": null,
            "portal": "example",
            "title": "FP&A manager",
            "workplace_type": null,
            "posted_date": null,
            "job_state": null,
            "description": "Boh",
            "apply_link": null,
            "company_name": null,
            "location": null,
            "short_description": null,
            "field": null,
            "company_logo": null,
            "experience": null,
            "skills_required": null,
            "style": "samudum_bold",
            "sent": false,
            "gen_cv": null
        },
        "6f1b0483-0136-4a91-a5d3-a6f57e461949": {
            "id": null,
            "portal": "example",
            "title": "FP&A manager",
            "workplace_type": null,
            "posted_date": null,
            "job_state": null,
            "description": "Boh",
            "apply_link": null,
            "company_name": null,
            "location": null,
            "short_description": null,
            "field": null,
            "company_logo": null,
            "experience": null,
            "skills_required": null,
            "style": "samudum_bold",
            "sent": false,
            "gen_cv": null
        },
        "15af2b58-d155-4210-9758-856a9b0401aa": {
            "id": null,
            "portal": "example",
            "title": "FP&A manager",
            "workplace_type": null,
            "posted_date": null,
            "job_state": null,
            "description": "Boh",
            "apply_link": null,
            "company_name": null,
            "location": null,
            "short_description": null,
            "field": null,
            "company_logo": null,
            "experience": null,
            "skills_required": null,
            "style": null,
            "sent": false,
            "gen_cv": null
        },
        "bad6bd9e-d346-4a60-883b-8ef2134ccc24": {
            "id": null,
            "portal": "example",
            "title": "FP&A manager",
            "workplace_type": null,
            "posted_date": null,
            "job_state": null,
            "description": "Boh",
            "apply_link": null,
            "company_name": null,
            "location": null,
            "short_description": null,
            "field": null,
            "company_logo": null,
            "experience": null,
            "skills_required": null,
            "style": null,
            "sent": false,
            "gen_cv": null
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