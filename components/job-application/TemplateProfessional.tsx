import { FC } from "react";
import Link from "next/link";
import { Resume } from "@/libs/types/application.types";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const TemplateProfessional: FC<Resume> = (resume) => {
  const { 
    header: { personal_information }, 
    body: {
      education_details,
      experience_details,
      side_projects,
      achievements,
      certifications,
      additional_skills,
    }, 
  } = resume;
  
  return (
    <div className="w-full py-6 h-full px-6">
      <div className="flex flex-col gap-4" id="personal_section ">
        <div className="flex flex-col items-center" contentEditable={true}>
          <h1 className="font-semibold tracking-widest text-2xl">
            {personal_information.name + ' '}
            {personal_information.surname}
          </h1>
          <ul className="mt-3 text-gray-700 text-sm flex flex-row gap-8 list-none">
            <li className="flex gap-[2px]">
              <MapPin size={20} />
              {personal_information.country}, {personal_information.city}
            </li>
            <li className="flex gap-[2px]">
              <Phone size={20} />
              {personal_information.phone_prefix + personal_information.phone}
            </li>
            <li className="flex gap-[2px]">
              <Mail size={20} />
              {personal_information.email}
            </li>
            <li className="flex gap-[2px]">
              <FaLinkedin size={20} />
              <a href={personal_information.linkedin} className="text-blue-500">Linkedin</a>
            </li>
            <li className="flex gap-[2px]">
              <FaGithub size={20} />
              <a href={personal_information.github} className="text-blue-500">Github</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8" id="education-section" contentEditable={true}>
        {!!education_details.education_details.length && (
          <h1 className="text-lg font-medium tracking-widest w-full border-b-4 pb-2 text-center uppercase">
            Education
          </h1>
        )}
        {education_details?.education_details.map((exp, index) => {
          return (
            <div
              key={index}
              className="flex flex-row justify-between items-center"
            >
              <div className="flex flex-col py-2">
                <span className="text-lg font-normal">{exp.institution}</span>
                <span className="text-base italic">{exp.education_level} in {exp.field_of_study} | Grade: {exp.final_evaluation_grade}/4</span>
              </div>
              <div className="flex flex-col items-end text-gray-700 text-base">
                <span className="">{exp.start_date}</span>
                <span className="">{exp.year_of_completion}</span>
                <span></span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8" id="experience-section"  contentEditable={true}>
        <h1 className="text-lg font-medium tracking-widest w-full border-b-4 pb-2 text-center uppercase">
          Experience
        </h1>
        {experience_details?.experience_details.map((exp, index) => {
          return (
            <div 
              key={index}
              className="flex flex-col"
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col py-2">
                  <span className="text-lg font-normal">{exp.company}</span>
                  <span className="text-base italic">{exp.position}</span>
                </div>
                <div className="flex flex-col items-end text-gray-700 text-base">
                  <span className="">{exp.location}</span>
                  <span className="italic">{exp.employment_period}</span>
                  <span></span>
                </div>
              </div>
              <ul className="list-disc list-inside text-base">
                {exp.key_responsibilities.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-8" id="project-section">
        {!!side_projects.length && (
          <h1 className="text-lg font-medium tracking-widest w-full border-b-4 pb-2 text-center uppercase">
            Projects
          </h1>
        )}
        {side_projects?.map((exp, index) => {
          return (
            <div
              key={index}
              className="flex flex-row justify-between items-center"
            >
              <div className="flex flex-col py-2">
                <div className="flex items-center gap-2">
                  <FaGithub size={20} />
                  <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="text-base font-normal text-blue-500">
                    {exp.name}
                  </Link>
                </div>

                <div className="list-disc list-inside text-base">
                  <li className="">{exp.description}</li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8" id="acheivement-section">
        {!!achievements.achievements.length && (
          <h1 className="text-lg font-medium tracking-widest w-full border-b-4 pb-2 text-center uppercase">
            Achievements
          </h1>
        )}
        {achievements?.achievements.map((exp, index) => {
          return (
            <ul
              key={index}
              className="list-disc list-inside text-base text-gray-700"
            >
              <li>
                <span className="font-semibold">{exp.name}: </span>
                <p className="inline">{exp.description}</p>
              </li>
            </ul>
          );
        })}
      </div>
      <div className="mt-8" id="acheivement-section">
        {!!certifications.certifications.length && (
          <h1 className="text-lg font-medium tracking-widest w-full border-b-4 pb-2 text-center uppercase">
            Certifications
          </h1>
        )}
        {certifications?.certifications.map((exp, index) => {
          return (
            <ul
              key={index}
              className="list-disc list-inside text-base text-gray-700"
            >
              <li>
                <span className="font-semibold">{exp.name}: </span>
                <p className="inline">{exp.description}</p>
              </li>
            </ul>
          );
        })}
      </div>
      <div className="mt-8" id="skills-section">
        {!!additional_skills.additional_skills.length && (
          <h1 className="text-base font-medium tracking-widest w-full border-b-4 pb-2 text-center uppercase mb-3">
            Skills
          </h1>
        )}
        {additional_skills?.additional_skills.map((exp, index) => {
          return (
            <span key={index} className="px-2 py-1 mr-2 bg-gray-300 rounded-xl">
              {exp}
            </span>
          );
        })}
        {additional_skills?.languages.length && (
          <ul className="list-disc list-inside text-base text-gray-700 mt-2">
            <li>
              <span className="font-semibold">Languages: </span>
              {additional_skills?.languages.map((exp, index) => {
                return (    
                  <p key={index} className="inline">{exp.language} ({exp.proficiency}){index !== additional_skills.languages.length - 1 ? ', ' : '.'}</p>
                )
              })}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
