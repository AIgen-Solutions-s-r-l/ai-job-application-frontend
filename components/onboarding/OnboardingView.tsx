'use client';

import React from 'react';
import { UploadResumeOnboarding } from './UploadResumeOnboarding';
import { useCVDataContext } from '@/contexts/cv-data-context';
import { CreateResumeOnboarding } from './CreateResumeOnboarding';

export const OnboardingView: React.FC = () => {
  const { CVData } = useCVDataContext();

  if (!CVData) {
    return (
     <UploadResumeOnboarding />
    )
  }
  
  return (
    <CreateResumeOnboarding />
  );
};