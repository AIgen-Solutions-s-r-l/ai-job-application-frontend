'use client';

import { JobProfile } from '@/libs/definitions';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AdditionalInfoStep from './modal-steps/AdditionalInfoStep';
import PersonalInformationStep from './modal-steps/PersonalInformationStep';
import EducationDetailsStep from './modal-steps/EducationDetailsStep';
import { updateJobProfile } from '@/libs/actions';
import toast from 'react-hot-toast';
import ExperienceDetailsStep from './modal-steps/ExperienceDetailsStep';
import { 
  User, Edit, GraduationCap, Briefcase, Info 
} from 'lucide-react'
import { cn } from '@/lib/utils';

interface Props {
  profile: JobProfile
}

const renderPersonalInfo = (personalInfo: JobProfile["personalInfo"]) => (
  <div className="space-y-2">
    <p><span className="font-semibold">Name:</span> {personalInfo.name} {personalInfo.surname}</p>
    <p><span className="font-semibold">Date of Birth:</span> {personalInfo.date_of_birth}</p>
    <p><span className="font-semibold">Location:</span> {personalInfo.city}, {personalInfo.country}</p>
    <p><span className="font-semibold">Email:</span> {personalInfo.email}</p>
    <p><span className="font-semibold">Phone:</span> {personalInfo.phone_prefix} {personalInfo.phone}</p>
    {personalInfo.github && <p><span className="font-semibold">GitHub:</span> <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="link">{personalInfo.github}</a></p>}
    {personalInfo.linkedin && <p><span className="font-semibold">LinkedIn:</span> <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="link">{personalInfo.linkedin}</a></p>}
  </div>
);


const renderEducation = (educationDetails: JobProfile["educationDetails"]) => (
  <div className="space-y-2">
    {educationDetails.map((education, index) => (
      <div key={index} className={cn("space-y-2 border-b pb-4 mb-4", (index + 1) === educationDetails.length && 'border-none pb-0')}>
        <p><span className="font-semibold">Institution:</span> {education.institution}</p>
        <p><span className="font-semibold">Field of Study:</span> {education.field_of_study}</p>
        <p><span className="font-semibold">Degree:</span> {education.education_level}</p>
        <p><span className="font-semibold">Year of Completion:</span> {education.year_of_completion}</p>
      </div>
    ))}
  </div>
);

const renderExperience = (experienceDetails: JobProfile["experienceDetails"]) => (
  <div className="space-y-2">
    {experienceDetails.map((experience, index) => (
      <div key={index} className={cn("space-y-2 border-b pb-4 mb-4", (index + 1) === experienceDetails.length && 'border-none pb-0')}>
        <p><span className="font-semibold">Company:</span> {experience.company}</p>
        <p><span className="font-semibold">Position:</span> {experience.position}</p>
        <p><span className="font-semibold">Period:</span> {experience.employment_period}</p>
        <p><span className="font-semibold">Responsibilities:</span></p>
        <ul className="list-disc list-inside ml-4">
          {experience.key_responsibilities.map((responsibility, i) => (
            <li key={i}>{responsibility}</li>
          ))}
        </ul>
        <p><span className="font-semibold">Skills:</span></p>
        <ul className="list-disc list-inside ml-4">
          {experience.skills_acquired.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const renderAdditionalInfo = (additionalInfo: JobProfile["additionalInfo"]) => (
  <div className="space-y-2">
    {/* Projects */}
    <div>
      <p className="font-semibold">Projects:</p>
      <ul>
        {additionalInfo.projects.map((project, index) => (
          <li key={index}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="link">
              {project.name}
            </a> - {project.description}
          </li>
        ))}
      </ul>
    </div>

    {/* Achievements */}
    <div>
      <p className="font-semibold">Achievements:</p>
      <ul>
        {additionalInfo.achievements.map((achievement, index) => (
          <li key={index}>{achievement.name} - {achievement.description}</li>
        ))}
      </ul>
    </div>

    {/* Languages */}
    <div>
      <p className="font-semibold">Languages:</p>
      <ul>
        {additionalInfo.languages.map((language, index) => (
          <li key={index}>{language.language} - {language.proficiency}</li>
        ))}
      </ul>
    </div>

    {/* Availability */}
    <div>
      <p className="font-semibold">Availability:</p>
      <p>Notice Period: {additionalInfo.availability.notice_period}</p>
    </div>

    {/* Salary Expectations */}
    <div>
      <p className="font-semibold">Salary Expectations:</p>
      <p>Salary Range (USD): {additionalInfo.salary_expectations.salary_range_usd}</p>
    </div>
  </div>
);

export const MyProfile: React.FC<Props> = ({ profile }) => {
  const [editingSection, setEditingSection] = useState<keyof JobProfile | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const methods = useForm({
    defaultValues: profile,
  });

  console.log('profile', profile);

  const handleEditClick = (section: keyof JobProfile) => {
    setEditingSection(section);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setEditingSection(null);
    setModalIsOpen(false);
  };
  
  const onSubmit = async (data: JobProfile) => {
    try {
      const response = await updateJobProfile(data);
      
      if (response.success) {
        toast.success("Profile updated successfully!");
        console.log("Profile updated successfully");
        handleCloseModal();
      } else {
        toast.error("Error updating profile.");
        console.error("Error updating profile:", response.error);

      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };
  
  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No profile found</p>
      </div>
    );
  }

  return (
    <div className='w-full px-[100px]'>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-500">Manage your personal and professional information</p>
      </div>

      {/* Profile Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-title flex items-center justify-between">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <User className="w-5 h-5" /> Personal Information
              </h2>
              <button onClick={() => handleEditClick("personalInfo")} className="btn btn-ghost btn-sm">
                <Edit className="w-4 h-4" /> 
              </button>
            </div>
            {profile.personalInfo && renderPersonalInfo(profile.personalInfo)}
          </div>
        </div>

        {/* Education Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-title flex items-center justify-between">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <GraduationCap className="w-5 h-5" /> Education
              </h2>
              <button onClick={() => handleEditClick("educationDetails")} className="btn btn-ghost btn-sm">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            {profile.educationDetails && renderEducation(profile.educationDetails)}
          </div>
        </div>

        {/* Experience Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-title flex items-center justify-between">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Experience
              </h2>
              <button onClick={() => handleEditClick("experienceDetails")} className="btn btn-ghost btn-sm">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            {profile.experienceDetails && renderExperience(profile.experienceDetails)}
          </div>
        </div>


        {/* Additional Information Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-title flex items-center justify-between">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <Info className="w-5 h-5" /> Additional Information
              </h2>
              <button onClick={() => handleEditClick("additionalInfo")} className="btn btn-ghost btn-sm">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            {profile.additionalInfo && renderAdditionalInfo(profile.additionalInfo)}
          </div>
        </div>          
      </div>

      {/* Modal */}
      {modalIsOpen && (
        <>
          <input type="checkbox" id="job-profile-detail-modal" className="modal-toggle" checked={modalIsOpen} onChange={() => setModalIsOpen(false)} />
          <div className="modal">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className='modal-box w-11/12 max-w-4xl h-[95vh] rounded-xl flex flex-col px-0'>
                <div className="flex-col justify-between items-center px-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-semibold leading-7">
                      Edit Resume
                    </h3>
                    <label htmlFor="job-profile-detail-modal" className="btn btn-sm btn-circle btn-ghost">
                      ✕
                    </label>
                  </div>

                </div>
                <div className="flex-grow overflow-y-auto px-6 pb-6">
                  {editingSection === "personalInfo" && <PersonalInformationStep />}
                  {editingSection === "educationDetails" && <EducationDetailsStep />}
                  {editingSection === "experienceDetails" && <ExperienceDetailsStep />}
                  {editingSection === "additionalInfo" && <AdditionalInfoStep />}
                </div>

                <button type="submit" className="btn btn-primary w-[200px] mx-auto">Save Changes</button>
              </form>
            </FormProvider>
          </div>
        </>
      )}
    </div>
  );
};