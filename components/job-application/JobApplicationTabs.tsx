'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { TemplateProfessional } from './TemplateProfessional';
import { toResumeType } from '../../libs/utils/application.util';
import { ActiveSectionProvider } from '../../contexts/active-section-context';
import { DetailedPendingApplication } from '../../libs/types/response-application.types';
import { useRouter } from 'next/navigation';
import { ApplicationCoverLetter } from './ApplicationCoverLetter';
import { ApplicationJobInfo } from './ApplicationJobInfo';
import { Container } from '../Container';
import { updateApplicationLetterAction, updateApplicationResumeAction } from '@/libs/actions';
import toast from 'react-hot-toast';

interface Props {
  id: string;
  applicationDetails: DetailedPendingApplication;
}

type Tab = "jobInfo" | "resume" | "coverLetter";

export const JobApplicationTabs: React.FC<Props> = ({ id, applicationDetails }) => {
  const mockApplicationDetails = {
    "resume_optimized": {
      "resume": {
        "header": {
          "personal_information": {
            "name": "Marco",
            "surname": "Rossi",
            "date_of_birth": "15/08/1995",
            "country": "Germany",
            "city": "Berlin",
            "address": "Corso Buenos Aires 12",
            "phone_prefix": "+39",
            "phone": "3401234567",
            "email": "marco.rossi@example.com",
            "github": "https://github.com/marco-rossi/ProjectExample",
            "linkedin": "https://www.linkedin.com/in/marco-rossi"
          }
        },
        "body": {
          "education_details": {
            "education_details": [
              {
                "education_level": "Masters Degree",
                "institution": "Politecnico di Milano",
                "field_of_study": "Software Engineering",
                "final_evaluation_grade": "3.8/4",
                "start_date": "2018",
                "year_of_completion": "2024",
              }
            ]
          },
          "experience_details": {
            "experience_details": [
              {
                "position": "Software Engineer",
                "company": "Tech Innovations",
                "employment_period": "06/2020 - Present",
                "location": "Italy",
                "industry": "Technology",
                "key_responsibilities": [
                  "Developed scalable web applications using modern frameworks",
                  "Collaborated with cross-functional teams to define project requirements",
                  "Implemented RESTful APIs for mobile and web applications",
                  "Conducted code reviews and mentored junior developers",
                  "Participated in Agile ceremonies and continuous improvement initiatives"
                ],
                "skills_acquired": [
                  "JavaScript",
                  "React",
                  "Node.js",
                  "Agile Methodologies",
                  "REST APIs",
                  "Cloud Services",
                  "DevOps Practices",
                  "Database Management",
                  "Team Collaboration",
                  "Technical Documentation"
                ]
              }
            ]
          },
          "side_projects": [
            {
              "name": "Portfolio",
              "description": "Validates expertise in developing and maintaining applications on the AWS platform, showcasing skills in cloud computing.",
              "link": "https://www.perplexity.ai/"
            },
            {
              "name": "Web Scaper",
              "description": "Validates expertise in developing and maintaining applications on the AWS platform, showcasing skills in cloud computing.",
              "link": "https://www.perplexity.ai/"
            }
          ],
          "achievements": {
            "achievements": [
              {
                "name": "Top Performer",
                "description": "Recognized as a top performer in the software engineering team for three consecutive quarters, showcasing exceptional performance and contribution to team objectives."
              },
              {
                "name": "Hackathon Winner",
                "description": "Won first place in a regional hackathon for developing an innovative mobile app, demonstrating creativity and technical skills in a competitive environment."
              },
              {
                "name": "Publication",
                "description": "Published an article on Medium about best practices in web development, contributing to the professional community and sharing knowledge on effective development strategies."
              }
            ]
          },
          "certifications": {
            "certifications": [
              {
                "name": "AWS Certified Solutions Architect",
                "description": "Certification demonstrating proficiency in designing distributed applications and systems on AWS"
              }
            ]
          },
          "additional_skills": {
            "additional_skills": [
              "Artificial Intelligence",
              "Blockchain Technology",
              "Open Source Development",
              "Cybersecurity",
              "Game Development",
              "Robotics",
              "Virtual Reality",
              "React",
              "Node.js",
              "JavaScript",
              "Cloud Services",
              "DevOps Practices",
              "Technical Documentation",
              "Agile Methodologies",
              "Team Collaboration",
              "Database Management",
              "REST APIs"
            ],
            "languages": [
              {
                "language": "Italian",
                "proficiency": "Native"
              },
              {
                "language": "English",
                "proficiency": "Fluent"
              },
              {
                "language": "Spanish",
                "proficiency": "Intermediate"
              }
            ]
          }
        }
      }
    },
    "cover_letter": {
      "cover_letter": {
        "header": {
          "applicant_details": {
            "name": "Marco Rossi",
            "address": "Corso Buenos Aires 12",
            "city_state_zip": "Milan, Italy",
            "email": "marco.rossiiiiiii@example.com",
            "phone_number": "+39 3401234567"
          },
          "company_details": {
            "name": "[Company Name]"
          }
        },
        "body": {
          "greeting": "Dear [Recipient Team]",
          "opening_paragraph": "I am excited to apply for the web developer position at [Company Name]. With a strong foundation in Python and Django, alongside experience in front-end technologies like HTML, CSS, and JavaScript, I am eager to contribute to your team and help drive innovative web solutions.",
          "body_paragraphs": "In my previous role, I successfully designed and maintained web applications, ensuring clean, efficient, and well-documented code. My proficiency in RESTful APIs and database technologies such as PostgreSQL and MySQL has allowed me to optimize application performance and implement robust security measures. Additionally, my familiarity with Agile methodologies and contributions to open-source projects have honed my teamwork and problem-solving skills, aligning perfectly with the collaborative culture at [Company Name].",
          "closing_paragraph": "I am particularly drawn to [Company Name]'s commitment to leveraging emerging technologies and continuous learning. I am enthusiastic about the opportunity to discuss how my background and skills can contribute to your mission. Thank you for considering my application."
        },
        "footer": {
          "closing": "Sincerely",
          "signature": "asdasd asdasd",
          "date": "[Date]"
        }
      }
    },
    "job_info": {
      "job_id": 1,
      "title": "Software Developer",
      "description": "Remote position  Skills & Requirements  Experience: B.S. Computer Science or applicable field and 2 to 5 years of professional experience working in full-stack development with demonstrated experience in front-end, server side, and database work.  Needed Skills: Python, Django, JavaScript, SQL, HTML, CSS, strong experience with developing and using APIs.  Bonus Credit Skills: React, PostgreSQL, AWS exposure, EC2, S3, Git, Responsive web frameworks, Jira  Additional: The candidate should have strong experience working with Django, ORM, Python, and responsive front-end development. Experience developing and integrating APIs is a must. Adept communication skills, talking with content experts, design specialists, and product owners will be expected and interpreting their needs into actionable items is crucial.",
      "portal": "test_portal",
      "sent": false
    }
  }

  const router = useRouter();
  const converted = toResumeType(mockApplicationDetails);
  const [ activeTab, setActiveTab ] = useState<Tab>("resume");

  // Create refs to access form methods
  const resumeFormRef = useRef<any>(null);
  const letterFormRef = useRef<any>(null);

  const [isResumeDirty, setIsResumeDirty] = useState(false);
  const [isLetterDirty, setIsLetterDirty] = useState(false);

  const handleResumeDirtyChange = useCallback((dirty: boolean) => {
    setIsResumeDirty(dirty);
  }, []);

  const handleLetterDirtyChange = useCallback((dirty: boolean) => {
    setIsLetterDirty(dirty);
  }, []);

  // Use useMemo to store the initial data. This ensures it's only created once.
  const initialResumeData = useMemo(() => converted, []);
  const initialLetterData = useMemo(() => mockApplicationDetails.cover_letter, []);

  // Store the current resume and letter data in state, initialized with the initial data
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [letterData, setLetterData] = useState(initialLetterData);

  const handleSave = async () => {
    const resumeForm = resumeFormRef.current;
    const letterForm = letterFormRef.current;

    // Check dirty states
    const resumeDirty = resumeForm?.formState?.isDirty;
    const letterDirty = letterForm?.formState?.isDirty;

    try {
      // If both are dirty, save both
      if (resumeDirty && letterDirty) {
        const resumeData = resumeForm.getValues();
        const letterData = letterForm.getValues();
        console.log("both dirty");
        console.log("resumeData", resumeData);
        console.log("letterData", letterData);

        // const [resumeResponse, letterResponse] = await Promise.all([
        //   updateApplicationResumeAction(id, resumeData),
        //   updateApplicationLetterAction(id, letterData)
        // ]);

        // if (resumeResponse.success && letterResponse.success) {
        //   toast.success("Resume and Cover Letter updated successfully!");
        //   // Reset forms
        //   resumeForm.reset(resumeData, { keepDirty: false });
        //   letterForm.reset(letterData, { keepDirty: false });
        // } else {
        //   toast.error("Error updating application details.");
        // }
      } 
      // If only resume is dirty
      else if (resumeDirty) {
        const resumeData = resumeForm.getValues();
        console.log("resumeData", resumeData);

        // const response = await updateApplicationResumeAction(id, resumeData);
        
        // if (response.success) {
        //   toast.success("Resume updated successfully!");
        //   resumeForm.reset(resumeData, { keepDirty: false });
        // } else {
        //   toast.error("Error updating resume.");
        // }
      } 
      // If only letter is dirty
      else if (letterDirty) {
        const letterData = letterForm.getValues();
        console.log("letterData", letterData);

        // const response = await updateApplicationLetterAction(id, letterData);
        
        // if (response.success) {
        //   toast.success("Cover Letter updated successfully!");
        //   letterForm.reset(letterData, { keepDirty: false });
        // } else {
        //   toast.error("Error updating cover letter.");
        // }
      }
    } catch (error) {
      console.error("Error saving application details:", error);
      toast.error("An unexpected error occurred.");
    }
  };
  
  return (
    <ActiveSectionProvider>
      <div className="w-full grow flex flex-col bg-base-200">
        <div className="w-[940px] mx-auto flex gap-2 pt-5">
          <button className={`rounded-t-md w-[160px] h-10 flex items-center justify-center text-base font-light ${activeTab === "resume" ? "bg-white" : "bg-neutral-content"}`} onClick={() => setActiveTab("resume")}>Resume</button>
          <button className={`rounded-t-md w-[160px] h-10 flex items-center justify-center text-base font-light ${activeTab === "coverLetter" ? "bg-white" : "bg-neutral-content"}`} onClick={() => setActiveTab("coverLetter")}>Cover Letter</button>
          <button className={`rounded-t-md w-[160px] h-10 flex items-center justify-center text-base font-light ${activeTab === "jobInfo" ? "bg-white" : "bg-neutral-content"}`} onClick={() => setActiveTab("jobInfo")}>Job Description</button>
        </div>
        <Container className="mb-[80px] grow">
          {activeTab === "resume" && (
            <TemplateProfessional 
              ref={resumeFormRef} 
              id={id} 
              resume={resumeData} 
            />
          )}
          {activeTab === "coverLetter" && (
            <ApplicationCoverLetter 
              ref={letterFormRef} 
              id={id} 
              letter={letterData} 
            />
          )}
          {activeTab === "jobInfo" &&  (
            <ApplicationJobInfo job={mockApplicationDetails.job_info} />
          )}
        </Container>
        <div className="fixed bottom-0 z-10 w-full h-[60px] flex items-center bg-secondary">
          <div className="w-[1440px] mx-auto flex flex-none items-center justify-between">
            <button
              className="w-[220px] h-[40px] rounded-full text-white text-lg"
              type="button"
              onClick={() => router.back()}
            >
              Go Back
            </button>
            <button 
              className="bg-black text-lg leading-none text-white w-[220px] h-[40px] rounded-full flex justify-center items-center hover:bg-base-content disabled:bg-neutral-content" 
              onClick={handleSave}
              disabled={!isResumeDirty && !isLetterDirty}
            >
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>
    </ActiveSectionProvider>
  );
};