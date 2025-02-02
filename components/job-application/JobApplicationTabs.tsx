'use client';

import React, { useState } from 'react';
import { TemplateProfessional } from './TemplateProfessional';
import { toJobInfoType, toResumeType } from '../../libs/utils/application.util';
import { ActiveSectionProvider } from '../../contexts/active-section-context';
import { DetailedPendingApplication } from '../../libs/types/response-application.types';
import { ApplicationCoverLetter } from './ApplicationCoverLetter';
import { ApplicationJobInfo } from './ApplicationJobInfo';
import CVTemplateProvider from '../../contexts/cv-template-context';
import { JobApplicationHeader } from './JobApplicationHeader';
import { useRouter } from 'next/navigation';

interface Props {
    id: string;
    applicationDetails: DetailedPendingApplication;
}

type Tab = "jobInfo" | "resume" | "coverLetter";

export const JobApplicationTabs: React.FC<Props> = ({ id, applicationDetails }) => {
    const mockApplicationDetails: DetailedPendingApplication = {
        "resume_optimized": {
            "resume": {
                "header": {
                    "personal_information": {
                        "name": "Marco",
                        "surname": "Rossi",
                        "date_of_birth": "15/08/1995",
                        "country": "Italy",
                        "city": "Milan",
                        "address": "Corso Buenos Aires 12",
                        "phone_prefix": "+39",
                        "phone": 3401234567.0,
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
                                "location": "Italy",
                                "field_of_study": "Software Engineering",
                                "final_evaluation_grade": "3.8/4",
                                "start_date": 2018,
                                "year_of_completion": 2024,
                                "exam": {
                                    "Data Structures": 3.9,
                                    "Web Technologies": 3.8,
                                    "Mobile Development": 4,
                                    "Database Management": 3.7,
                                    "Machine Learning": 4,
                                    "Cloud Computing": 3.8
                                }
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
                    "projects": [
                        {
                            "name": "Portfolio Website",
                            "description": "Created a personal portfolio website to showcase my projects and skills",
                            "link": "https://github.com/marco-rossi/portfolio-website"
                        },
                        {
                            "name": "E-commerce Platform",
                            "description": "Developed a full-stack e-commerce application with payment integration and user authentication",
                            "link": "https://github.com/marco-rossi/ecommerce-platform"
                        }
                    ],
                    "achievements": {
                        "achievements": [
                            {
                                "name": "Top Performer",
                                "description": "Recognized as a top performer in the software engineering team for three consecutive quarters, demonstrating consistent excellence in software development and teamwork."
                            },
                            {
                                "name": "Hackathon Winner",
                                "description": "Won first place in a regional hackathon for developing an innovative mobile app, showcasing problem-solving skills and creativity in software design."
                            },
                            {
                                "name": "Publication",
                                "description": "Published an article on Medium about best practices in web development, highlighting expertise in the field and ability to communicate technical concepts effectively."
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
                            "REST APIs",
                            "Technical Documentation",
                            "React",
                            "DevOps Practices",
                            "Agile Methodologies",
                            "Cloud Services",
                            "Database Management",
                            "Team Collaboration",
                            "Node.js",
                            "JavaScript"
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
                        "email": "marco.rossi@example.com",
                        "phone_number": "+39 3401234567"
                    },
                    "company_details": {
                        "name": "Google"
                    }
                },
                "body": {
                    "greeting": "Dear Google Hiring Team,",
                    "opening_paragraph": "I am writing to express my interest in the Software Engineer position at Google. With a Master's degree in Software Engineering from Politecnico di Milano and over three years of professional experience in developing scalable web applications, I am excited about the opportunity to contribute to a company that values innovation and excellence.",
                    "body_paragraphs": "In my current role at Tech Innovations, I have successfully developed and implemented RESTful APIs and collaborated with cross-functional teams to deliver high-quality software solutions. My proficiency in Java and cloud services, along with my experience in Agile methodologies, aligns well with the requirements outlined in the job description. Additionally, my AWS Certified Solutions Architect certification demonstrates my commitment to staying current with industry trends, particularly in cloud computing and microservices architecture. I am particularly drawn to Google's mission of organizing the world's information and making it universally accessible and useful, as I believe technology should empower and enhance lives.",
                    "closing_paragraph": "I am eager to bring my skills in software development and my passion for problem-solving to Google. Thank you for considering my application; I look forward to the opportunity to discuss how I can contribute to your team."
                },
                "footer": {
                    "closing": "Sincerely",
                    "signature": "Marco Rossi",
                    "date": "October 2023"
                }
            }
        },
        "title": "FP&A manager",
        "is_remote": null,
        "workplace_type": null,
        "posted_date": null,
        "job_state": null,
        "description": "Boh",
        "apply_link": null,
        "company_name": null,
        "location": null,
        "id": null,
        "job_id": 1111,
        "portal": "example",
        "gen_cv": null
    }

    const router = useRouter();
    const converted = toResumeType(mockApplicationDetails);
    const jobInfo = toJobInfoType(mockApplicationDetails);
    const [activeTab, setActiveTab] = useState<Tab>("resume");

    return (
        <>
            <JobApplicationHeader job={jobInfo} />
            <ActiveSectionProvider>
                <div className="w-full grow flex flex-col bg-base-100">
                    <div className="w-[940px] mx-auto flex gap-2 pt-5">
                        <button className={`rounded-t-md w-[160px] h-10 flex items-center justify-center text-base font-light ${activeTab === "resume" ? "bg-white" : "bg-neutral-content"}`} onClick={() => setActiveTab("resume")}>Resume</button>
                        <button className={`rounded-t-md w-[160px] h-10 flex items-center justify-center text-base font-light ${activeTab === "coverLetter" ? "bg-white" : "bg-neutral-content"}`} onClick={() => setActiveTab("coverLetter")}>Cover Letter</button>
                        <button className={`rounded-t-md w-[160px] h-10 flex items-center justify-center text-base font-light ${activeTab === "jobInfo" ? "bg-white" : "bg-neutral-content"}`} onClick={() => setActiveTab("jobInfo")}>Job Description</button>
                    </div>
                    <div className="">
                        {activeTab === "resume" && (
                            <CVTemplateProvider>
                                <TemplateProfessional id={id} resume={converted} goBack={() => router.back()} />
                            </CVTemplateProvider>
                        )}
                        {activeTab === "coverLetter" && (
                            <ApplicationCoverLetter id={id} letter={mockApplicationDetails.cover_letter} goBack={() => router.back()} />
                        )}
                        {activeTab === "jobInfo" && (
                            <ApplicationJobInfo job={jobInfo} goBack={() => router.back()} />
                        )}
                    </div>
                </div>
            </ActiveSectionProvider>
        </>
    );
};