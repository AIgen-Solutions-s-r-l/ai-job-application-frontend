'use client';

import { DetailedPendingApplication } from '@/libs/types/application.types';
import React, { useState } from 'react';
import { TemplateProfessional } from './TemplateProfessional';

interface Props {
  applicationDetails: DetailedPendingApplication;
}

type Tab = "jobInfo" | "resume" | "coverLetter";

export const JobApplicationTabs: React.FC<Props> = ({ applicationDetails }) => {
  if (!applicationDetails) {
    applicationDetails = {
      "resume_optimized": {
        "resume": {
          "header": {
            "personal_information": {
              "name": "Arystanbek",
              "surname": "Kazhym",
              "date_of_birth": "2000-10-23",
              "country": "Kazakhstan",
              "city": "Almaty",
              "address": "Street of Rage 1",
              "phone_prefix": "+7",
              "phone": "7059848044",
              "email": "cholicer@gmail.com",
              "github": "https://www.perplexity.ai/",
              "linkedin": "https://www.linkedin.com/in/arystanbek-kagan-3b968733a/"
            }
          },
          "body": {
            "education_details": {
              "education_details": [
                {
                  "education_level": "B.S.",
                  "institution": "Almaty University of Power Engineering and Telecommunications",
                  "field_of_study": "Computer Science",
                  "final_evaluation_grade": "3.8",
                  "start_date": "September 2019",
                  "year_of_completion": "March 2024"
                }
              ]
            },
            "experience_details": {
              "experience_details": [
                {
                  "position": "Software Engineer Intern",
                  "company": "Aura",
                  "employment_period": "MAY 2024 - Present",
                  "location": "Almaty, KZ",
                  "industry": "Tech",
                  "key_responsibilities": [
                      "Participated in agile development processes, effectively adapting to changing requirements while maintaining high-quality results.",
                      "Documented development procedures, creating valuable reference materials for future projects or team members joining the team.",
                      "Collaborated with software engineers to develop and test application procedures for system efficiency.",
                      "Enhanced software performance by optimizing algorithms and streamlining code.",
                      "Utilized version control systems like Git effectively managing changes over time allowing for seamless collaboration among team members."
                  ],
                  "skills_acquired": [
                      "Dart",
                      "JavaScript",
                      "TypeScript",
                      "Flutter",
                      "React.js",
                      "Next.js",
                      "Git",
                      "RESTful APIs",
                      "Firebase",
                      "Agile",
                      "Scrum"
                  ]
                }
              ]
            },
            "side_projects": [
              {
                "name": "Portfolio",
                "description": "Validates expertise in developing and maintaining applications on the AWS platform, showcasing skills in cloud computing.",
                "link": "https://www.perplexity.ai/"
              }
            ],
            "achievements": {
              "achievements": [
                {
                  "name": "Top Performer",
                  "description": "Validates expertise in developing and maintaining applications on the AWS platform, showcasing skills in cloud computing. Validates expertise in developing and maintaining applications on the AWS platform, showcasing skills in cloud computing."
                }
              ]
            },
            "certifications": {
              "certifications": [
                {
                  "name": "AWS Certified Developer",
                  "description": "Validates expertise in developing and maintaining applications on the AWS platform, showcasing skills in cloud computing."
                },
                {
                  "name": "Microsoft Certified: Azure Developer",
                  "description": "Demonstrates proficiency in designing, building, testing, and maintaining cloud applications and services on Microsoft Azure."
                }
              ]
            },
            "additional_skills": {
              "additional_skills": [
                "Python",
                "Java",
                "C++",
                "Agile methodologies",
                "Scrum",
                "Git",
                "Debugging",
                "Unit testing",
                "Integration testing",
                "SQL",
                "NoSQL databases"
              ],
              "languages": [
                {
                  "language": "Kazakh",
                  "proficiency": "Native"
                },
                {
                  "language": "Russian",
                  "proficiency": "Fluent"
                },
                {
                  "language": "English",
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
              "name": "asdasd asdasd",
              "address": "sad",
              "city_state_zip": "asdasd, sadasd",
              "email": "asasddasd@asas.asd",
              "phone_number": "asdsad asdasd"
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
      "job_id": null,
      "title": "Software Developer",
      "description": "Remote position  Skills & Requirements  Experience: B.S. Computer Science or applicable field and 2 to 5 years of professional experience working in full-stack development with demonstrated experience in front-end, server side, and database work.  Needed Skills: Python, Django, JavaScript, SQL, HTML, CSS, strong experience with developing and using APIs.  Bonus Credit Skills: React, PostgreSQL, AWS exposure, EC2, S3, Git, Responsive web frameworks, Jira  Additional: The candidate should have strong experience working with Django, ORM, Python, and responsive front-end development. Experience developing and integrating APIs is a must. Adept communication skills, talking with content experts, design specialists, and product owners will be expected and interpreting their needs into actionable items is crucial.",
      "portal": "test_portal",
      "sent": "false"
    }
  }
  const [ activeTab, setActiveTab ] = useState<Tab>("resume");
  
  return (
    <div className="w-full flex flex-col bg-base-200">
      <div className="w-[1440px] mx-auto flex gap-10 pt-5">
        <button className={`btn btn-outline ${activeTab === "resume" ? "btn-primary" : ""}`} onClick={() => setActiveTab("resume")}>resume</button>
        <button className={`btn btn-outline ${activeTab === "jobInfo" ? "btn-primary" : ""}`} onClick={() => setActiveTab("jobInfo")}>jobInfo</button>
        <button className={`btn btn-outline ${activeTab === "coverLetter" ? "btn-primary" : ""}`} onClick={() => setActiveTab("coverLetter")}>coverLetter</button>
      </div>
      <div className="w-[1440px] mx-auto py-5">
        {activeTab === "resume" && (
          <div className="w-1/2 bg-white text-black">
            <TemplateProfessional
              header={applicationDetails.resume_optimized.resume.header}
              body={applicationDetails.resume_optimized.resume.body}
            />
          </div>
        )}
        {activeTab === "jobInfo" && (<h1 className='text-[32px] leading-10 mb-8'>
          {applicationDetails.title}
        </h1>)}
        {activeTab === "coverLetter" && (<h1 className='text-[32px] leading-10 mb-8'>
          {
            applicationDetails.cover_letter.cover_letter.header.applicant_details.name
          }
        </h1>)}
      </div>
    </div>
  );
};