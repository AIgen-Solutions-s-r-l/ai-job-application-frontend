'use client';

import React, { useState } from 'react';
import { JobManagerCard } from './JobManagerCard';
import { useJobManager } from '@/contexts/job-manager-context';
import { Container } from '../Container';

export const JobManagerList: React.FC = () => {
  const { applications } = useJobManager();
  const [focusedJobId, setFocusedJobId] = useState<string>('');

  return (
    <div className='w-full h-full gap-5 pt-16'>
      <Container className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-[100px]">
        {Object.entries(applications).map(([key, value]) => (
          <JobManagerCard 
            key={key} 
            id={key} 
            job={value} 
            onClick={() => setFocusedJobId(key)} 
            className={focusedJobId === key ? "outline outline-1 outline-primary" : ""} 
          />
        ))}
      </Container>
    </div>
  );
};