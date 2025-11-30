'use client';

import React, { useState } from 'react';
import { TemplateProfessional } from './TemplateProfessional';
import { toResumeType } from '../../libs/utils/application.util';
import { ActiveSectionProvider } from '../../contexts/active-section-context';
import { DetailedPendingApplication } from '../../libs/types/response-application.types';
import { ApplicationCoverLetter } from './ApplicationCoverLetter';
import { ApplicationJobInfo } from './ApplicationJobInfo';
import CVTemplateProvider from '../../contexts/cv-template-context';
import { JobApplicationHeader } from './JobApplicationHeader';
import { useRouter } from 'next/navigation';
import { Container } from '../Container';
import { TemplateType } from '../../libs/utils/resume-template-utils';

interface Props {
    id: string;
    applicationDetails: DetailedPendingApplication;
}

type Tab = "jobInfo" | "resume" | "coverLetter";

const ButtonTab = ({ text, isActive, onClick }: { text: string, isActive: boolean, onClick: () => void }) => {
    return (
        <button 
            className={`
                rounded-t-md grow md:grow-0 md:w-[160px] h-10 flex items-center justify-center text-sm transition-all ease-in-out duration-200 md:text-base  
                ${isActive ? "bg-white text-black" : "bg-my-neutral-2 text-primary-light-purple font-light"}
            `} 
            onClick={onClick}
        >{text}</button>
    )
}

export const JobApplicationTabs: React.FC<Props> = ({ id, applicationDetails }) => {
    // const mockApplicationDetails: DetailedPendingApplication = {
    //     "resume_optimized": {
    //         "resume": {
    //             "header": {
    //                 "personal_information": {
    //                     "name": "Arystanbek",
    //                     "surname": "test",
    //                     "date_of_birth": "2000-10-23",
    //                     "country": "Kazakhstan",
    //                     "city": "Almaty",
    //                     "address": "Street og Rage 1",
    //                     "zip_code": "050000",
    //                     "phone_prefix": "7",
    //                     "phone": "7002172080",
    //                     "email": "cholicer@gmail.com",
    //                     "github": null,
    //                     "linkedin": null
    //                 }
    //             },
    //             "body": {
    //                 "education_details": {
    //                     "education_details": [
    //                         {
    //                             "education_level": "Bachelor's Degree",
    //                             "institution": "Almaty University of Information Technology",
    //                             "location": {
    //                                 "country": "russia",
    //                                 "city": "Almaty"
    //                             },
    //                             "field_of_study": "Computer Science",
    //                             "final_evaluation_grade": "3.7/4.0",
    //                             "start_date": "09/2018",
    //                             "year_of_completion": "06/2024",
    //                             "exam": null
    //                         },
    //                         {
    //                             "education_level": "asd",
    //                             "institution": "test",
    //                             "location": {
    //                                 "country": "asd",
    //                                 "city": "asd"
    //                             },
    //                             "field_of_study": "asd",
    //                             "final_evaluation_grade": "123",
    //                             "start_date": "asd",
    //                             "year_of_completion": "asda",
    //                             "exam": null
    //                         }
    //                     ]
    //                 },
    //                 "experience_details": {
    //                     "experience_details": [
    //                         {
    //                             "position": "Frontend Developer",
    //                             "company": "Laboro (AiHawk)",
    //                             "employment_start_date": "11/2024",
    //                             "employment_end_date": "Present",
    //                             "location": {
    //                                 "country": "Italy",
    //                                 "city": "Remote"
    //                             },
    //                             "industry": "Technology",
    //                             "key_responsibilities": [
    //                                 "Engineered responsive user interfaces for an AI-powered job application platform that automatically matches users with relevant positions based on their skills and experience",
    //                                 "Developed key components of the resume and cover letter generation system, creating intuitive workflows that helped users customize AI-generated application materials",
    //                                 "Contributed to the frontend architecture of a platform processing millions of job listings, implementing optimized data visualization and search functionality",
    //                                 "Collaborated with cross-functional teams to enhance user experience for a rapidly growing product with 330K+ Instagram followers",
    //                                 "Implemented performance optimizations and responsive design principles for a globally recognized platform featured in TechCrunch, Business Insider, and Wired",
    //                                 "Participated in open-source development for Python projects that achieved #1 trending status on GitHub globally."
    //                             ],
    //                             "skills_acquired": [
    //                                 "Frontend Development",
    //                                 "Responsive Design",
    //                                 "Data Visualization",
    //                                 "Cross-Functional Collaboration",
    //                                 "Performance Optimization",
    //                                 "Open Source Contribution"
    //                             ]
    //                         },
    //                         {
    //                             "position": "Software Engineer",
    //                             "company": "Aura.kz",
    //                             "employment_start_date": "03/2024",
    //                             "employment_end_date": "123",
    //                             "location": {
    //                                 "country": "asd",
    //                                 "city": "as"
    //                             },
    //                             "industry": "Technology",
    //                             "key_responsibilities": [
    //                                 "Led development of Angular applications, implementing component-based architecture and optimizing performance for enterprise clients",
    //                                 "Designed and delivered a full-featured mobile Tour Guide application using Flutter, incorporating geolocation services, offline functionality, and interactive UI elements",
    //                                 "Architected and single-handedly developed a comprehensive computer monitoring system for a gaming club, utilizing Next.js for the frontend, NestOS for deployment, and Electron for desktop integration",
    //                                 "Engineered a custom data pipeline connecting player statistics from Faceit via a browser extension to a RESTful Express API, enabling real-time player analytics and performance tracking."
    //                             ],
    //                             "skills_acquired": [
    //                                 "Angular Development",
    //                                 "Flutter Development",
    //                                 "Next.js",
    //                                 "RESTful APIs",
    //                                 "Geolocation Services"
    //                             ]
    //                         },
    //                         {
    //                             "position": "Freelance Web Developer",
    //                             "company": "Self-Employed",
    //                             "employment_start_date": "09/2023",
    //                             "employment_end_date": "02/2024",
    //                             "location": {
    //                                 "country": "Kazakhstan",
    //                                 "city": "Almaty"
    //                             },
    //                             "industry": "Freelance",
    //                             "key_responsibilities": [
    //                                 "Developed custom client websites using Next.js with Tailwind CSS for responsive styling and Framer Motion for advanced animations and transitions",
    //                                 "Delivered pixel-perfect implementations of design mockups while ensuring cross-browser compatibility and optimal performance."
    //                             ],
    //                             "skills_acquired": [
    //                                 "Next.js",
    //                                 "Tailwind CSS",
    //                                 "Framer Motion",
    //                                 "Cross-Browser Compatibility"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 "projects": {
    //                     "projects": [
    //                         {
    //                             "name": "Responsive Portfolio Website",
    //                             "description": "Developed a fully responsive portfolio website using React and CSS3, showcasing various projects. The website received positive feedback from users for its design and functionality.",
    //                             "link": null
    //                         },
    //                         {
    //                             "name": "Weather App",
    //                             "description": "Created a weather application using JavaScript and REST API integrations to fetch real-time weather data. The project has garnered over 150 stars on GitHub, highlighting its utility and user-friendly interface.",
    //                             "link": "https://github.com/username/weather-app"
    //                         },
    //                         {
    //                             "name": "E-commerce Platform",
    //                             "description": "Contributed to a full-stack e-commerce platform using Angular for the front end and Node.js for the back end. Focused on implementing adaptive web design principles to enhance mobile user experience.",
    //                             "link": "https://github.com/username/ecommerce-platform"
    //                         }
    //                     ]
    //                 },
    //                 "achievements": {
    //                     "achievements": [
    //                         {
    //                         "name": "Cambridge Assessment, awarded on 29 May 2019, Europass level B2. Cambridge Assessment, awarded on 29 May 2019, Europass level B2.",
    //                         "description": "Enhancement of Italian Excellence - MIUR"
    //                         },
    //                         {
    //                         "name": "Cambridge Assessment, awarded on 29 May 2019, Europass level B2.",
    //                         "description": "Cambridge Assessment, awarded on 29 May 2019, Europass level B2."
    //                         },
    //                         {
    //                         "name": "Cambridge Assessment, awarded on 29 May 2019, Europass level B2.",
    //                         "description": "Cambridge Assessment, awarded on 19/07/2018, level B1."
    //                         }
    //                     ]
    //                 },
    //                 "certifications": {
    //                     "certifications": [
    //                         {
    //                         "name": "AWS Certified Solutions Architect",
    //                         "description": "Certification demonstrating proficiency in designing distributed applications and systems on AWS."
    //                         },
    //                         {
    //                         "name": "AWS Certified Developer",
    //                         "description": "Certification demonstrating proficiency in developing and maintaining applications on AWS."
    //                         },
    //                         {
    //                         "name": "Certification demonstrating proficiency in Android development.",
    //                         "description": "Certification demonstrating foundational knowledge of AWS Cloud."
    //                         },
    //                         {
    //                         "name": "Google Associate Android Developer",
    //                         "description": "Certification demonstrating proficiency in Android development."
    //                         }
    //                     ]
    //                 },
    //                 "additional_skills": {
    //                         "additional_skills": [
    //                             "RESTful APIs",
    //                             "Responsive Design",
    //                             "Frontend Development",
    //                             "Flutter Development",
    //                             "Cross-Functional Collaboration",
    //                             "Next.js",
    //                             "Framer Motion",
    //                             "Angular Development",
    //                             "Geolocation Services",
    //                             "Data Visualization",
    //                             "Open Source Contribution",
    //                             "Cross-Browser Compatibility",
    //                             "Tailwind CSS",
    //                             "Performance Optimizatiasdon"
    //                     ],
    //                     "languages": [
    //                         {
    //                             "language": "English",
    //                             "proficiency": "Fluent"
    //                         },
    //                         {
    //                             "language": "Russian",
    //                             "proficiency": "Native"
    //                         },
    //                         {
    //                             "language": "Kazakh",
    //                             "proficiency": "Native"
    //                         },
    //                         {
    //                             "language": "asd",
    //                             "proficiency": "asd"
    //                         }
    //                     ]
    //                 }
    //             }
    //         }
    //     },
    //     "cover_letter": {
    //         "cover_letter": {
    //             "header": {
    //                 "applicant_details": {
    //                     "name": "Arystanbek Kazhym",
    //                     "address": "Street og Rage 1",
    //                     "city_state_zip": "Almaty, Kazakhstan, 050000",
    //                     "email": "cholicer@gmail.com",
    //                     "phone_number": "7002172080"
    //                 },
    //                 "company_details": {
    //                     "name": "DSR Corporation"
    //                 }
    //             },
    //             "body": {
    //                 "greeting": "Dear DSR Corporation Team",
    //                 "opening_paragraph": "I am writing to express my interest in the Front-End Developer position at DSR Corporation. With a Bachelor's degree in Computer Science and over three years of hands-on experience in front-end development, I am excited about the opportunity to contribute to your innovative team.",
    //                 "body_paragraphs": "In my current role at Laboro, I engineered responsive user interfaces for an AI-powered platform, collaborating closely with cross-functional teams to enhance user experience. My proficiency in JavaScript, Angular, and REST API integrations aligns well with the technical skills you seek. Additionally, my experience in optimizing performance and implementing responsive design principles has been instrumental in delivering high-quality applications. I am particularly drawn to DSR Corporation's commitment to leveraging cutting-edge technology to create impactful solutions, which resonates with my career objectives.",
    //                 "closing_paragraph": "I am eager to bring my background in front-end development and my passion for user-centered design to DSR Corporation. Thank you for considering my application; I look forward to the opportunity to discuss how I can contribute to your team."
    //             },
    //             "footer": {
    //                 "closing": "Sincerely",
    //                 "signature": "Arystanbek Kazhym",
    //                 "date": "2023-10-23"
    //             }
    //         }
    //     },
    //     "job_info": {
    //         "id": "9eb1895f-2a93-4df5-b6bf-d3e792381424",
    //         "portal": "applytojob",
    //         "title": "Front-end developer angular",
    //         "workplace_type": "Full-time",
    //         "posted_date": "2025-01-30T00:00:00",
    //         "job_state": "active",
    //         "description": " Overview:\nFull-time Front-End Software Engineer needed for a cross-functional team in Voronezh. Responsibilities include developing front-end web architectures, enhancing web application responsiveness, and collaborating with graphic designers. Role requires translating business needs into interactive applications.\n\nRequired Degrees & Certifications:\n- Bachelor's degree in Computer Science, Mathematics, or related field\n\nKey Responsibilities:\n- Develop front-end web architectures\n- Improve web application responsiveness\n- Collaborate with graphic designers\n\nRequired Technical Skills:\n- JavaScript ES5-ES6 and/or TypeScript\n- Modern front-end frameworks (Angular, React, Vue)\n- HTML5 and CSS3\n- Adaptive web design (AWD)\n- REST API integrations\n\nRequired Soft Skills:\n- Problem-solving\n- Attention to detail\n- Teamwork\n- Communication\n\nPreferred/Nice-to-have Skills:\n- Node.js, Java-Spring MVC, .NET\n- WebPack\n- CSS preprocessors (SASS, LESS, PostCSS)\n- Functional programming\n- Back-end technologies\n- Solid English skills (spoken and written)\n\nExperience Requirements:\n- Years of experience: 3+ years\n- Category of experience: Mid-level\n- Specific domain experience: Full stack development and back-end technologies\n\nAdditional Informations:\n- Decent salary with annual bonus\n- Paid overtime\n- Permanent employment\n- Employer-sponsored health insurance\n- Paid sick leave days\n- Office in the city center with free parking\n- Free English courses\n- Restaurant-grade lunches\n- Daily treats (coffee, chocolate, bakery)\n- Corporate events\n- Team-building program\n- Mentorship program\n- International DSR Training Center\n- Opportunities for skill development",
    //         "apply_link": "https://dsr.applytojob.com/apply/LmuakjC9Zd/FrontEnd-Software-Engineer-Angular",
    //         "company_name": "DSR Corporation",
    //         "location": "Austria, Voronezh",
    //         "short_description": " Overview",
    //         "field": "Information Technology",
    //         "company_logo": "https://s3.amazonaws.com/resumator/customer_20180201044330_XWLG764UNCE54LLD/logos/20211222142203_logo1.png",
    //         "experience": "Mid-level",
    //         "skills_required": [
    //             "React",
    //             "JavaScript",
    //             "Angular"
    //         ]
    //     },
    //     "style": "style_2",
    //     "sent": false,
    //     "gen_cv": null
    // }

    const { resume_optimized, cover_letter, job_info, style } = applicationDetails;

    const router = useRouter();
    const converted = toResumeType(resume_optimized);
    // console.log("converted: \n", JSON.stringify(converted));
    const [activeTab, setActiveTab] = useState<Tab>("resume");

    return (
        <>
            <JobApplicationHeader job={job_info} />
            <ActiveSectionProvider>
                <div className="w-full grow flex flex-col">
                    <Container>
                        <div className="w-full lg:w-[850px] mx-auto flex gap-2 pt-5 font-kanit">
                            <ButtonTab text="Resume" isActive={activeTab === "resume"} onClick={() => setActiveTab("resume")} />
                            <ButtonTab text="Cover Letter" isActive={activeTab === "coverLetter"} onClick={() => setActiveTab("coverLetter")} />
                            <ButtonTab text="Job Description" isActive={activeTab === "jobInfo"} onClick={() => setActiveTab("jobInfo")} />
                        </div>
                    </Container>
                    <div className="pb-5">
                        {activeTab === "resume" && converted && (
                            <CVTemplateProvider style={style as TemplateType}>
                                <TemplateProfessional
                                    id={id}
                                    resume={converted}
                                    goBack={() => router.back()}
                                />
                            </CVTemplateProvider>
                        )}
                        {activeTab === "coverLetter" && (
                            <ApplicationCoverLetter id={id} letter={cover_letter} goBack={() => router.back()} />
                        )}
                        {activeTab === "jobInfo" && (
                            <ApplicationJobInfo job={job_info} goBack={() => router.back()} />
                        )}
                    </div>
                </div>
            </ActiveSectionProvider>
        </>
    );
};