import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { cn } from '@/lib/utils'; // Utility for merging class names
import { Resume, ResumeOptimized } from '@/components/job-application/trash/old-application.types';

// Define template variants
const templates = {
  default: {
    container: "max-w-[700px] mx-auto p-4 text-gray-800 text-sm leading-tight font-sans",
    header: "text-center mb-4",
    heading1: "text-4xl font-bold mb-2",
    contactInfo: "flex flex-wrap justify-center gap-3 text-sm",
    contactItem: "flex items-center gap-1",
    sectionContainer: "mb-6",
    sectionHeading: "text-xl font-semibold border-b border-gray-800 pb-1 mb-3 text-center",
    entryContainer: "mb-3",
    entryHeader: "flex justify-between font-semibold",
    entryDetails: "flex justify-between italic text-xs mb-1",
    list: "list-disc pl-4",
    listItem: "mb-1",
    link: "text-blue-600 hover:underline",
    icon: "mr-2",
    skillsGrid: "flex justify-between",
    skillsList: "list-disc pl-4 w-1/2"
  },
  minimal: {
    container: "max-w-[700px] mx-auto p-4 text-gray-900 text-sm leading-tight font-mono",
    header: "text-left mb-6",
    heading1: "text-3xl font-normal mb-4 border-b border-gray-200",
    contactInfo: "flex flex-wrap gap-4 text-sm",
    contactItem: "flex items-center gap-2",
    sectionContainer: "mb-8",
    sectionHeading: "text-lg font-bold mb-4 text-left uppercase tracking-wider",
    entryContainer: "mb-4",
    entryHeader: "flex justify-between font-bold",
    entryDetails: "flex justify-between text-xs mb-2 text-gray-600",
    list: "list-none pl-0",
    listItem: "mb-2",
    link: "text-gray-900 hover:text-gray-600",
    icon: "mr-2",
    skillsGrid: "grid grid-cols-2 gap-4",
    skillsList: "list-none pl-0"
  },
  modern: {
    container: "max-w-[700px] mx-auto p-6 text-gray-800 text-sm leading-tight font-sans bg-white",
    header: "mb-8 bg-gray-50 p-6 rounded-lg",
    heading1: "text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text",
    contactInfo: "flex flex-wrap justify-start gap-4 text-sm",
    contactItem: "flex items-center gap-2 hover:text-blue-600 transition-colors",
    sectionContainer: "mb-8",
    sectionHeading: "text-xl font-bold mb-4 text-left flex items-center gap-2 text-blue-600",
    entryContainer: "mb-6 hover:bg-gray-50 p-3 rounded-lg transition-colors",
    entryHeader: "flex justify-between font-bold text-gray-900",
    entryDetails: "flex justify-between text-sm mb-2 text-gray-500",
    list: "list-none pl-4 border-l-2 border-gray-200",
    listItem: "mb-2 hover:text-blue-600",
    link: "text-blue-600 hover:text-blue-800 transition-colors",
    icon: "mr-2",
    skillsGrid: "grid grid-cols-2 gap-6",
    skillsList: "list-none pl-0 space-y-2"
  }
} as const;

type TemplateVariant = keyof typeof templates;

interface ResumeProps {
  resume: Resume;
  variant?: TemplateVariant;
}

export const ResumePreview = ({ resume, variant = 'default' }: ResumeProps) => {
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
  const styles = templates[variant];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.heading1}>
          {personal_information.name} {personal_information.surname}
        </h1>
        <div className={styles.contactInfo}>
          <p className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <span>{personal_information.country}, {personal_information.city}</span>
          </p>
          <p className={styles.contactItem}>
            <FaPhone className={styles.icon} />
            {personal_information.phone_prefix}{personal_information.phone}
          </p>
          <p className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <span>{personal_information.email}</span>
          </p>
          <p className={styles.contactItem}>
            <FaLinkedin className={styles.icon} />
            <a href={personal_information.linkedin} className={styles.link}>LinkedIn</a>
          </p>
          <p className={styles.contactItem}>
            <FaGithub className={styles.icon} />
            <a href={personal_information.github} className={styles.link}>GitHub</a>
          </p>
        </div>
      </header>

      {/* Education Section */}
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>Education</h2>
        {education_details?.education_details.map((edu, index) => (
          <div key={index} className={styles.entryContainer}>
            <div className={styles.entryHeader}>
              <span>{edu.institution}</span>
              <span>{edu.start_date}</span>
            </div>
            <div className={styles.entryDetails}>
              <span>{edu.education_level} in {edu.field_of_study} | Grade: {edu.final_evaluation_grade}/4</span>
              <span>{edu.year_of_completion}</span>
            </div>
            {/* <ul className={styles.list}>
              {edu.courses.map((course, idx) => (
                <li key={idx} className={styles.listItem}>
                  {course.name} → Grade: {course.grade}
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </section>

      {/* Work Experience Section */}
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>Work Experience</h2>
        {experience_details?.experience_details.map((work, index) => (
          <div key={index} className={styles.entryContainer}>
            <div className={styles.entryHeader}>
              <span>{work.company}</span>
              <span>{work.location}</span>
            </div>
            <div className={styles.entryDetails}>
              <span>{work.position}</span>
              <span>{work.employment_period}</span>
            </div>
            <ul className={styles.list}>
              {work.key_responsibilities.map((resp, idx) => (
                <li key={idx} className={styles.listItem}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* <section className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>Side Projects</h2>
        {props.sideProjects.map((project, index) => (
          <div key={index} className={styles.entryContainer}>
            <div className="font-semibold flex items-center gap-2">
              <FaGithub className={styles.icon} />
              <a href={project.link} className={styles.link}>{project.name}</a>
            </div>
            <ul className={styles.list}>
              {project.descriptions.map((desc, idx) => (
                <li key={idx} className={styles.listItem}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>Achievements</h2>
        <ul className={styles.list}>
          {props.achievements.map((achievement, index) => (
            <li key={index} className={styles.listItem}>
              <strong>{achievement.title}:</strong> {achievement.description}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>Certifications</h2>
        <ul className={styles.list}>
          {props.certifications.map((cert, index) => (
            <li key={index} className={styles.listItem}>
              <strong>{cert.name}:</strong> {cert.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className={styles.sectionHeading}>Additional Skills</h2>
        <div className={styles.skillsGrid}>
          <ul className={styles.skillsList}>
            {props.skills.slice(0, Math.ceil(props.skills.length / 2)).map((skill, index) => (
              <li key={index} className={styles.listItem}>{skill}</li>
            ))}
          </ul>
          <ul className={styles.skillsList}>
            {props.skills.slice(Math.ceil(props.skills.length / 2)).map((skill, index) => (
              <li key={index} className={styles.listItem}>{skill}</li>
            ))}
            <li className={styles.listItem}>
              <strong>Languages:</strong> {props.languages.join(', ')}
            </li>
          </ul>
        </div>
      </section> */}
    </div>
  );
};