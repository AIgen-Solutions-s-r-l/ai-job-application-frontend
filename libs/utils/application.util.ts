import { JobInfo, ResumeAdditionalInfo } from "../types/application.types";
import { Resume } from "../types/application.types";
import { EducationDetail } from "../types/response-application.types";

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

  const transformedEducationDetails = education_details.map((education: EducationDetail) => {
    if (education.exam) {
      return {
        ...education,
        exam: Object.entries(education.exam).map(([subject, grade]) => ({ subject, grade })),
      };
    }
    return education;
  });

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
    educationDetails: transformedEducationDetails || null,
    experienceDetails: experience_details || null,
    additionalInfo,
  };
}

export function fromResumeType(resumeData: Resume): any {
  const {
    personalInfo,
    educationDetails,
    experienceDetails,
    additionalInfo,
  } = resumeData;

  const originalEducationDetails = educationDetails?.map(edu => ({
    ...edu,
    exam: edu.exam && edu.exam.length > 0 && !edu.exam.every(({ subject, grade }) => subject === "" && grade === "")
      ? edu.exam.reduce((acc: { [key: string]: string }, { subject, grade }) => {
          acc[subject] = grade;
          return acc;
        }, {})
      : null
  }));
  
  return {
    resume: {
      header: {
        personal_information: personalInfo,
      },
      body: {
        education_details: {
          education_details: originalEducationDetails,
        },
        experience_details: {
          experience_details: experienceDetails,
        },
        side_projects: additionalInfo.side_projects,
        achievements: {
          achievements: additionalInfo.achievements,
        },
        certifications: {
          certifications: additionalInfo.certifications,
        },
        additional_skills: {
          additional_skills: additionalInfo.additional_skills,
          languages: additionalInfo.languages,
          // interests: additionalInfo.interests,
        },
      },
    }
  };
}

export function toJobInfoType(applicationData: any): JobInfo {
  const { 
    title,
    is_remote,
    workplace_type,
    posted_date,
    job_state,
    description,
    apply_link,
    company_name,
    location,
    id,
    job_id,
    portal,
    gen_cv,
  } = applicationData;

  return {
    title,
    is_remote,
    workplace_type,
    posted_date,
    job_state,
    description,
    apply_link,
    company_name,
    location,
    id,
    job_id,
    portal,
    gen_cv,
  };
}