'use client';

import React from 'react';
import { MatchingJob } from '@/libs/definitions';
import { useRouter } from 'next/navigation';
import { JobSearchBar } from './JobSearchBar';
import { JobFeedList } from './JobFeedList';
import { JobSearchBottomSheet } from './JobSearchBottomSheet';
import JobSearchProvider from '@/contexts/job-search-context';

type JobSearchViewProps = {
  initialJobs: MatchingJob[];
  searchParams: { q?: string; l?: string };
};

export const JobSearchView: React.FC<JobSearchViewProps> = ({
  initialJobs,
  searchParams,
}) => {
  if (initialJobs.length === 0) {
    initialJobs = [
      {
        "id": 1,
        "title": "Backend Developer",
        "is_remote": false,
        "workplace_type": "On-site",
        "posted_date": "2024-12-03T10:00:00",
        "job_state": "Active",
        "description": "Develop and optimize backend APIs, ensure robust database management.",
        "apply_link": "https://backend.jobs/apply/789",
        "company": "Backend Gurus",
        "location": "Turin, Italy",
        "portal": "Indeed"
      },
      {
        "id": 2,
        "title": "Backend Developer",
        "is_remote": false,
        "workplace_type": "On-site",
        "posted_date": "2024-12-03T10:00:00",
        "job_state": "Active",
        "description": `
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque temporibus porro suscipit ipsam. Dolore maiores consequuntur laboriosam ad explicabo, quod harum culpa sit soluta. Eveniet laboriosam explicabo repudiandae fuga.
          A vitae libero alias ratione autem quam unde esse aliquam fugit, non cum voluptatibus velit impedit molestiae fuga? Hic, laboriosam? Natus distinctio ut, expedita culpa nemo ducimus nostrum a accusantium.
          Laborum dolorem reiciendis inventore nulla officia a veritatis, laudantium recusandae perspiciatis vitae culpa molestias nam facere blanditiis nesciunt minus accusamus quam nisi velit autem sint. Aspernatur distinctio explicabo nesciunt aperiam!
          Recusandae, architecto explicabo harum quaerat rem distinctio, esse inventore fugit autem vel nisi officia accusantium qui! Quidem expedita aliquam, blanditiis accusamus, neque, hic cum quibusdam consequuntur odit dolore corrupti cumque.
          Minima nam dignissimos facere ullam rem sit incidunt. Consequuntur expedita blanditiis quos minus corporis aspernatur, sequi qui, dolorum, eos nobis dignissimos iste veritatis doloremque officia magnam exercitationem possimus incidunt atque!
          Quibusdam illo, animi non quasi qui fuga corporis reprehenderit, assumenda possimus libero atque, ea beatae temporibus impedit ipsam molestiae vitae eaque. Porro error officiis dolores voluptatibus facere ipsa deleniti. Incidunt!
        `,
        "apply_link": "https://backend.jobs/apply/789",
        "company": "Backend Gurus",
        "location": "Turin, Italy",
        "portal": "Indeed"
      },
      {
        "id": 3,
        "title": "Backend Developer",
        "is_remote": false,
        "workplace_type": "On-site",
        "posted_date": "2024-12-03T10:00:00",
        "job_state": "Active",
        "description": "Develop and optimize backend APIs, ensure robust database management.",
        "apply_link": "https://backend.jobs/apply/789",
        "company": "Backend Gurus",
        "location": "Turin, Italy",
        "portal": "Indeed"
      },
      {
        "id": 4,
        "title": "Backend Developer",
        "is_remote": false,
        "workplace_type": "On-site",
        "posted_date": "2024-12-03T10:00:00",
        "job_state": "Active",
        "description": "Develop and optimize backend APIs, ensure robust database management.",
        "apply_link": "https://backend.jobs/apply/789",
        "company": "Backend Gurus",
        "location": "Turin, Italy",
        "portal": "Indeed"
      },
      {
        "id": 5,
        "title": "Backend Developer",
        "is_remote": false,
        "workplace_type": "On-site",
        "posted_date": "2024-12-03T10:00:00",
        "job_state": "Active",
        "description": "Develop and optimize backend APIs, ensure robust database management.",
        "apply_link": "https://backend.jobs/apply/789",
        "company": "Backend Gurus",
        "location": "Turin, Italy",
        "portal": "Indeed"
      },
    ]
  }
  const router = useRouter();

  const onSearch = (keywords: string, location: string) => {
    const params = new URLSearchParams();
    params.set('q', keywords);
    params.set('l', location);
    router.push(`?${params.toString()}`);
  };

  return (
    <JobSearchProvider initialJobs={initialJobs}>
      <div className='w-full flex flex-col items-center'>
        <JobSearchBar
          onSearch={onSearch}
          keywords={searchParams.q}
          location={searchParams.l}
        />
        <JobFeedList />
        <JobSearchBottomSheet />
      </div>
    </JobSearchProvider>
  );
};
