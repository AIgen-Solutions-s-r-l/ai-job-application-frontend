import React from 'react';
import { ResumePersonal } from './ResumeSections/ResumePersonal';
import { ResumeEducation } from './ResumeSections/ResumeEducation';
import { ResumeExperience } from './ResumeSections/ResumeExperience';
import { ResumeAdditional } from './ResumeSections/ResumeAdditional';

export const TemplateProfessional: React.FC = () => {
  return (
    <div className="w-full py-8 h-full px-10">
      <ResumePersonal />

      <ResumeEducation />

      <ResumeExperience />

      <ResumeAdditional />
    </div>
  );
};
