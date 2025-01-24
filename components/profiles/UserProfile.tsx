'use client';

import { JobProfile } from '@/libs/definitions';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { updateJobProfile } from '@/libs/actions';
import toast from 'react-hot-toast';
import { PersonalInformationOnboarding } from '../onboarding/cv-sections/PersonalInformationOnboarding';
import { EducationDetailsOnboarding } from '../onboarding/cv-sections/EducationDetailsOnboarding';
import { ExperienceDetailsOnboarding } from '../onboarding/cv-sections/ExperienceDetailsOnboarding';
import { AdditionalInfoOnboarding } from '../onboarding/cv-sections/AdditionalInfoOnboarding';

interface Props {
  profile: JobProfile
}

export const UserProfile: React.FC<Props> = ({ profile }) => {
  // profile = toJobProfile({
  //     "personal_information": {
  //       "name": "Marco",
  //       "surname": "Rossi",
  //       "date_of_birth": "15/08/1995",
  //       "country": "Italy",
  //       "city": "Milan",
  //       "address": "Corso Buenos Aires 12",
  //       "phone_prefix": "+39",
  //       "phone": "3401234567",
  //       "email": "marco.rossi@example.com",
  //       "github": "https://github.com/marco-rossi/ProjectExample",
  //       "linkedin": "https://www.linkedin.com/in/marco-rossi"
  //     },
  //     "education_details": [
  //       {
  //         "education_level": "Master's Degree",
  //         "institution": "Politecnico di Milano",
  //         "field_of_study": "Software Engineering",
  //         "final_evaluation_grade": "3.8/4",
  //         "start_date": "2018",
  //         "year_of_completion": "2024",
  //         "exam": {
  //           "Data Structures": "3.9",
  //           "Web Technologies": "3.8",
  //           "Mobile Development": "4.0",
  //           "Database Management": "3.7",
  //           "Machine Learning": "4.0",
  //           "Cloud Computing": "3.8"
  //         }
  //       }
  //     ],
  //     "experience_details": [
  //       {
  //         "position": "Software Engineer",
  //         "company": "Tech Innovations",
  //         "employment_period": "06/2020 - Present",
  //         "location": "Italy",
  //         "industry": "Technology",
  //         "key_responsibilities": [
  //           "Developed scalable web applications using modern frameworks",
  //           "Collaborated with cross-functional teams to define project requirements",
  //           "Implemented RESTful APIs for mobile and web applications",
  //           "Conducted code reviews and mentored junior developers",
  //           "Participated in Agile ceremonies and continuous improvement initiatives"
  //         ],
  //         "skills_acquired": [
  //           "JavaScript",
  //           "React",
  //           "Node.js",
  //           "Agile Methodologies",
  //           "REST APIs",
  //           "Cloud Services",
  //           "DevOps Practices",
  //           "Database Management",
  //           "Team Collaboration",
  //           "Technical Documentation"
  //         ]
  //       }
  //     ],
  //     "projects": [
  //       {
  //         "name": "Portfolio Website",
  //         "description": "Created a personal portfolio website to showcase my projects and skills",
  //         "link": "https://github.com/marco-rossi/portfolio-website"
  //       },
  //       {
  //         "name": "E-commerce Platform",
  //         "description": "Developed a full-stack e-commerce application with payment integration and user authentication",
  //         "link": "https://github.com/marco-rossi/ecommerce-platform"
  //       }
  //     ],
  //     "achievements": [
  //       {
  //         "name": "Top Performer",
  //         "description": "Recognized as a top performer in the software engineering team for three consecutive quarters"
  //       },
  //       {
  //         "name": "Hackathon Winner",
  //         "description": "Won first place in a regional hackathon for developing an innovative mobile app"
  //       },
  //       {
  //         "name": "Publication",
  //         "description": "Published an article on Medium about best practices in web development"
  //       }
  //     ],
  //     "certifications": [
  //       {
  //         "name": "AWS Certified Solutions Architect",
  //         "description": "Certification demonstrating proficiency in designing distributed applications and systems on AWS"
  //       }
  //     ],
  //     "languages": [
  //       {
  //         "language": "Italian",
  //         "proficiency": "Native"
  //       },
  //       {
  //         "language": "English",
  //         "proficiency": "Fluent"
  //       },
  //       {
  //         "language": "Spanish",
  //         "proficiency": "Intermediate"
  //       }
  //     ],
  //     "interests": [
  //       "Artificial Intelligence",
  //       "Blockchain Technology",
  //       "Open Source Development",
  //       "Cybersecurity",
  //       "Game Development",
  //       "Robotics",
  //       "Virtual Reality"
  //     ],
  //     "availability": {
  //       "notice_period": "2 weeks"
  //     },
  //     "salary_expectations": {
  //       "salary_range_usd": "80000"
  //     },
  //     "self_identification": {
  //       "gender": "Male",
  //       "pronouns": "He",
  //       "veteran": "No",
  //       "disability": "No",
  //       "ethnicity": "White"
  //     },
  //     "legal_authorization": {
  //       "eu_work_authorization": "Yes",
  //       "us_work_authorization": "No",
  //       "requires_us_visa": "Yes",
  //       "requires_us_sponsorship": "Yes",
  //       "requires_eu_visa": "No",
  //       "legally_allowed_to_work_in_eu": "Yes",
  //       "legally_allowed_to_work_in_us": "No",
  //       "requires_eu_sponsorship": "No",
  //       "canada_work_authorization": "Yes",
  //       "requires_canada_visa": "Yes",
  //       "legally_allowed_to_work_in_canada": "Yes",
  //       "requires_canada_sponsorship": "No",
  //       "uk_work_authorization": "Yes",
  //       "requires_uk_visa": "No",
  //       "legally_allowed_to_work_in_uk": "Yes",
  //       "requires_uk_sponsorship": "No"
  //     },
  //     "work_preferences": {
  //       "remote_work": "Yes",
  //       "in_person_work": "Yes",
  //       "open_to_relocation": "Yes",
  //       "willing_to_complete_assessments": "Yes",
  //       "willing_to_undergo_drug_tests": "No",
  //       "willing_to_undergo_background_checks": "Yes"
  //     }
  // })
  
  const methods = useForm({
    defaultValues: profile,
  });

  const onSubmit = async (data: JobProfile) => {
    console.log("sumbitting bro")
    try {
      const response = await updateJobProfile(data);
      
      if (response.success) {
        toast.success("Profile updated successfully!");
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

      <FormProvider {...methods}>
        <form
          className="w-full flex flex-col"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="collapse collapse-arrow bg-base-200 group">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium group-has-[input:checked]:bg-base-300">Personal Information</div>
            <div className="collapse-content">
              <PersonalInformationOnboarding />
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 group">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium group-has-[input:checked]:bg-base-300">Education Details</div>
            <div className="collapse-content">
              <EducationDetailsOnboarding />
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 group">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium group-has-[input:checked]:bg-base-300">Experience Details</div>
            <div className="collapse-content">
              <ExperienceDetailsOnboarding />
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 group">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium group-has-[input:checked]:bg-base-300">Additional Information</div>
            <div className="collapse-content">
              <AdditionalInfoOnboarding />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-[200px] self-end mt-2">Save Changes</button>
        </form>
      </FormProvider>
    </div>
  );
};