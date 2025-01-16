import { ResumeAdditionalInfo } from "./trash/application.types";
import { Resume } from "./trash/application.types";

export function toResumeType(resumeData: any): Resume {
  const { 
    resume_optimized: {
      resume: {
        header: { personal_information }, 
        body: {
          education_details: {
            education_details
          },
          experience_details: {
            experience_details
          },
          side_projects,
          achievements: {
            achievements
          },
          certifications: {
            certifications
          },
          additional_skills: {
            additional_skills,
            languages,
            interests
          },
        }, 
      }
    }
  } = resumeData;

  const additionalInfo: ResumeAdditionalInfo = {
    side_projects: side_projects?.length ? side_projects : null,
    achievements: achievements?.length ? achievements : null,
    certifications: certifications?.length ? certifications : null,
    languages: languages?.length ? languages : null,
    additional_skills: additional_skills || null,
    interests: interests || null,
  };

  return {
    personalInfo: personal_information,
    educationDetails: education_details || null,
    experienceDetails: experience_details || null,
    additionalInfo,
  };
}