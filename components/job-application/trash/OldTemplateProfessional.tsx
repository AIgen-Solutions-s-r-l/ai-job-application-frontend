import { FC } from "react";
import Link from "next/link";
import { Resume } from "@/components/job-application/trash/old-application.types";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface Props {
  resume: Resume;
}

export const TemplateProfessional: FC<Props> = ({ resume }) => {
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
    <div className="w-full py-8 h-full px-10">
      <div className="flex flex-col gap-4" id="personal_section" contentEditable={true}>
        <div className="flex flex-col items-center">
          <h1 className="font-semibold tracking-widest text-xl">
            {personal_information.name + ' '}
            {personal_information.surname}
          </h1>
          <ul className="mt-3 text-gray-700 text-xs flex flex-row gap-2 list-none">
            <li className="flex gap-[2px]">
              <MapPin size={16} />
              {personal_information.country}, {personal_information.city}
            </li>
            <li className="flex gap-[2px]">
              <Phone size={16} />
              {personal_information.phone_prefix + personal_information.phone}
            </li>
            <li className="flex gap-[2px]">
              <Mail size={16} />
              {personal_information.email}
            </li>
            <li className="flex gap-[2px]">
              <FaLinkedin size={16} />
              <a href={personal_information.linkedin} className="text-blue-500">Linkedin</a>
            </li>
            <li className="flex gap-[2px]">
              <FaGithub size={16} />
              <a href={personal_information.github} className="text-blue-500">Github</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8" id="education-section">
        {!!education_details.education_details.length && (
          <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
            Education
          </h1>
        )}
        {education_details?.education_details.map((exp, index) => {
          return (
            <div
              key={index}
              className="flex flex-row justify-between items-start pt-2"
            >
              <div className="flex flex-col w-[70%]">
                <span className="text-xs font-semibold">{exp.institution}</span>
                <span className="text-xs italic">{exp.education_level} in {exp.field_of_study} | Grade: {exp.final_evaluation_grade}/4</span>
              </div>
              <div className="flex flex-col items-end w-[30%] text-gray-700 text-base">
                <span className="text-xs">{exp.start_date}</span>
                <span className="text-xs">{exp.year_of_completion}</span>
                <span></span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8" id="experience-section">
        <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase" contentEditable={true}>
          Work Experience
        </h1>
        {experience_details?.experience_details.map((exp, index) => {
          return (
            <div 
              key={index}
              className="flex flex-col"
            >
              <div className="flex flex-row justify-between items-start pt-2">
                <div className="flex flex-col w-[70%]">
                  <span className="text-xs font-semibold">{exp.company}</span>
                  <span className="text-xs italic">{exp.position}</span>
                </div>
                <div className="flex flex-col items-end w-[30%] text-gray-700 text-base">
                  <span className="text-xs">{exp.location}</span>
                  <span className="text-xs">{exp.employment_period}</span>
                  <span></span>
                </div>
              </div>
              <ul className="list-disc list-inside text-xs ml-4 pt-1">
                {exp.key_responsibilities.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-8" id="skills-section text-xs">
        {!!additional_skills.additional_skills.length && (
          <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
            Additional Information
          </h1>
        )}
        {additional_skills?.additional_skills.length && (
          <div className="flex flex-wrap text-xs leading-none mt-2 gap-1">
            <span className="font-semibold">Technincal Skills: </span>
            {additional_skills?.additional_skills.map((exp, index) => {
              return (    
                <p key={index} className="inline">{exp}{index !== additional_skills.additional_skills.length - 1 ? ', ' : '.'}</p>
              )
            })}
          </div>
        )}
        {additional_skills?.languages.length && (
          <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
            <span className="font-semibold">Languages: </span>
            {additional_skills?.languages.map((exp, index) => {
              return (    
                <p key={index} className="inline">{exp.language} ({exp.proficiency}){index !== additional_skills.languages.length - 1 ? ', ' : '.'}</p>
              )
            })}
          </div>
        )}
        {side_projects.length && (
          <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
            <span className="font-semibold">Projects: </span>
            <ul className="list-disc list-inside ml-4">
              {side_projects.map((exp, index) => {
                return (
                  <li className="pb-1" key={index}>
                    <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="font-normal text-blue-500" contentEditable={true}>
                      {exp.name} -
                    </Link>
                    <p className="inline ml-1" contentEditable={true}>{exp.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {achievements.achievements.length && (
          <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
            <span className="font-semibold">Achievements: </span>
            <ul className="list-disc list-inside ml-4">
              {achievements.achievements.map((exp, index) => {
                return (
                  <li className="pb-1" key={index}>
                    <span className="font-semibold">
                      {exp.name + ': '}
                    </span>
                    <p className="inline">{exp.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {certifications.certifications.length && (
          <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
            <span className="font-semibold">Certifications: </span>
            <ul className="list-disc list-inside ml-4">
              {certifications.certifications.map((exp, index) => {
                return (
                  <li className="pb-1" key={index}>
                    <span className="font-semibold">
                      {exp.name + ': '}
                    </span>
                    <p className="inline">{exp.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      {/* <div className="mt-8" id="project-section">
        {!!side_projects.length && (         
          <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
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
      </div> */}
      {/* <div className="mt-8" id="acheivement-section">
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
      </div> */}
      {/* <div className="mt-8" id="acheivement-section">
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
      </div> */}
    </div>
  );
};
