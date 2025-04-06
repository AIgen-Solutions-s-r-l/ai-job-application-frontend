"use server";

import { createClient } from "@/libs/supabase/server";
import { revalidatePath } from "next/cache";
import { Bot, JobProfile, UploadFile } from "./definitions";
import crypto from "crypto";
import { formDataToObject, resumeFileSchema } from "./utils";
import { SafeParseError, SafeParseReturnType, SafeParseSuccess } from "zod";
import moment from "moment";
import { createResume, pdfToJson, updateResume } from "./api/resume";
import { fromJobProfile, toJobProfile } from "./utils/job-profile-util";
import { createJobApplication } from "./api/application";
import { applySelectedApplications, updateApplicationLetter, updateApplicationResume } from "./api/apply_pending";
import { Resume } from "./types/application.types";
import { fromResumeType } from "./utils/application.util";
import { CoverLetterCoverLetter } from "./types/response-application.types";
import { spendCredits } from "./api/auth";
import { ServerActionResult } from "./action-utils";

const supabase = createClient();
const algorithm = "aes-256-ctr";
const secretKey = crypto.scryptSync(
  process.env.SECRET_KEY || "your-secret-key",
  "salt",
  32
);

function encrypt(text: string) {
  const iv = crypto.randomBytes(16); // IV único por cifrado
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

//JOB ROLES
export async function upsertJobRole(job: any, jobToEdit?: any) {
  const jobWithProfileId = {
    profile_id: job.profile_id,
    job_title: job.job_title,
    location: job.location,
    job_type: job.job_type,
    work_type: job.work_type,
    experience_level: job.experience_level,
    date: job.date,
    apply_once_at_company: job.apply_once_at_company,
    company_blacklist: job.company_blacklist,
    title_blacklist: job.title_blacklist,
    min_applicants: job.min_applicants ?? 0,
    max_applicants: job.max_applicants ?? 100,
  };

  let data, error;
  if (jobToEdit) {
    ({ data, error } = await supabase
      .from("job_roles")
      .update(jobWithProfileId)
      .eq("id", jobToEdit.id));
  } else {
    ({ data, error } = await supabase
      .from("job_roles")
      .insert(jobWithProfileId));
  }

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");

  return data;
}

export async function deleteJobRole(jobId: string) {
  const { error } = await supabase.from("job_roles").delete().eq("id", jobId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}

export async function extractResume(formData: FormData): Promise<JobProfile> {
  try {
    const { data } = await pdfToJson(formData);

    const cvData: JobProfile = toJobProfile(data);

    return cvData;
  } catch (error) {
    console.error("Error fetching user profiles from API:", error);
    throw error;
  }
}

export const createJobProfile = async (profileData: JobProfile): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const entries: any = fromJobProfile(profileData);

    const response = await createResume(entries);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving job profile:", error);
    return { success: false, error: error.message };
  }
}

export const updateJobProfile = async (profileData: JobProfile): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const entries: any = fromJobProfile(profileData);

    const response = await updateResume(entries);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    revalidatePath("/dashboard/profiles");

    return { success: true };
  } catch (error) {
    console.error("Error updating job profile:", error);
    return { success: false, error: error.message };
  }
}

export const addJobsToManager = async (formData: FormData): Promise<{
  success: boolean
}> => {
  try {
    await createJobApplication(formData);

    revalidatePath(`/manager`);

    return { success: true };
  } catch (error) {
    console.error("Error when adding jobs to jobs manager:", error);
    throw error;
  }
}

export const applySelectedApplicationsAction = async (applications: string[]): Promise<{
  success: boolean;
  error?: string
}> => {
  try {
    const response = await applySelectedApplications(applications);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    revalidatePath(`/manager`);

    return { success: true };
  } catch (error) {
    console.error("Error when applying to selected jobs:", error);
    return { success: false, error: error.message };
  }
}

export const updateApplicationResumeAction = async (id: string, resumeData: Resume): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const entries: any = fromResumeType(resumeData);

    const response = await updateApplicationResume(id, entries);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    revalidatePath(`/manager/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating job profile:", error);
    return { success: false, error: error.message };
  }
}

export const updateApplicationLetterAction = async (id: string, letterData: CoverLetterCoverLetter): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const coverLetter = {
      cover_letter: letterData
    }

    const response = await updateApplicationLetter(id, coverLetter);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    revalidatePath(`/manager/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating job profile:", error);
    return { success: false, error: error.message };
  }
}

export const spendCreditsAction = async (amount: number): Promise<ServerActionResult<number>> => {
  try {
    const response = await spendCredits(amount);
    return { success: true, value: response.new_balance };
  } catch (error) {
    console.error("Error fetching user balance:", error);
    return { success: false, error: error.message };
  }
}

//JOB PROFILE
export const upsertJobProfile = async (
  profileData: FormData
): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const entires: JobProfile = formDataToObject(profileData);
    const {
      personalInfo,
      educationDetails,
      experienceDetails,
      additionalInfo,
      cv,
    } = entires;

    if (cv) {
      const validFile: SafeParseReturnType<File, Object> =
        resumeFileSchema.safeParse(cv);
      if (!validFile.success) {
        return {
          success: false,
          error: (validFile as SafeParseError<Object>).error.message,
        };
      }

      const cvFile: File = (validFile as SafeParseSuccess<File>).data;
      const { data, error } = await supabase.storage
        .from("job_rizzler")
        .upload(`resumes/${user.id}.pdf`, cvFile, { upsert: true });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      const { error: deleteError } = await supabase
        .from("files")
        .delete()
        .eq("class", "resume")
        .eq("user_id", user.id);

      if (deleteError) {
        return {
          success: false,
          error: deleteError.message,
        };
      }

      const { id, path, fullPath: full_path } = data;
      const { size, name, type } = cvFile;
      const dbData: UploadFile = {
        id,
        path,
        full_path,
        size,
        name,
        type,
        class: "resume",
        user_id: user.id,
      };
      const { error: insertError } = await supabase
        .from("files")
        .insert(dbData);

      if (insertError) {
        return {
          success: false,
          error: insertError.message,
        };
      }
    }

    // 1. Si existe un `id` en `personalInfo`, actualizamos en lugar de insertar.
    let personalInformationId;
    if (personalInfo.id) {
      // Actualizar la información personal
      const { error: personalInfoError } = await supabase
        .from("personal_information")
        .update({
          name: personalInfo.name,
          surname: personalInfo.surname,
          date_of_birth: personalInfo.date_of_birth,
          country: personalInfo.country,
          city: personalInfo.city,
          zip_code: personalInfo.zip_code,
          address: personalInfo.address,
          phone_prefix: personalInfo.phone_prefix,
          phone: personalInfo.phone,
          email: personalInfo.email,
          github: personalInfo.github,
          linkedin: personalInfo.linkedin,
        })
        .eq("id", personalInfo.id);

      if (personalInfoError) throw personalInfoError;

      personalInformationId = personalInfo.id; // Usamos el ID existente
    } else {
      // Insertar nueva información personal
      const { data: personalInfoData, error: personalInfoError } =
        await supabase
          .from("personal_information")
          .insert([
            {
              profile_id: user.id,
              name: personalInfo.name,
              surname: personalInfo.surname,
              date_of_birth: personalInfo.date_of_birth,
              country: personalInfo.location.country,
              city: personalInfo.location.city,
              zip_code: personalInfo.zip_code,
              address: personalInfo.address,
              phone_prefix: personalInfo.phone_prefix,
              phone: personalInfo.phone,
              email: personalInfo.email,
              github: personalInfo.github,
              linkedin: personalInfo.linkedin,
            },
          ])
          .select()
          .single();

      if (personalInfoError) throw personalInfoError;

      personalInformationId = personalInfoData.id; // Guardamos el nuevo ID
    }

    // 2. Actualizar o insertar detalles de educación
    for (const education of educationDetails) {
      if (education.id) {
        const { error: educationError } = await supabase
          .from("education_details")
          .update({
            education_level: education.education_level,
            institution: education.institution,
            field_of_study: education.field_of_study,
            final_evaluation_grade: education.final_evaluation_grade,
            year_of_completion: education.year_of_completion,
            start_date: education.start_date,
          })
          .eq("id", education.id);

        if (educationError) throw educationError;
      } else {
        const { error: educationError } = await supabase
          .from("education_details")
          .insert([
            {
              personal_information_id: personalInformationId,
              education_level: education.education_level,
              institution: education.institution,
              field_of_study: education.field_of_study,
              final_evaluation_grade: education.final_evaluation_grade,
              year_of_completion: education.year_of_completion,
              start_date: education.start_date,
            },
          ]);

        if (educationError) throw educationError;
      }
    }

    // 3. Actualizar o insertar detalles de experiencia
    for (const experience of experienceDetails) {
      if (experience.id) {
        const { error: experienceError } = await supabase
          .from("experience_details")
          .update({
            position: experience.position,
            company: experience.company,
            employment_end_date: experience.employment_end_date,
            employment_start_date: experience.employment_start_date,
            country: experience.location.country,
            city: experience.location.city,
            industry: experience.industry,
            key_responsibilities: experience.key_responsibilities, // JSON
            skills_acquired: experience.skills_acquired, // JSON
          })
          .eq("id", experience.id);

        if (experienceError) throw experienceError;
      } else {
        const { error: experienceError } = await supabase
          .from("experience_details")
          .insert([
            {
              personal_information_id: personalInformationId,
              position: experience.position,
              company: experience.company,
              employment_end_date: experience.employment_end_date,
              employment_start_date: experience.employment_start_date,
              country: experience.location.country,
              city: experience.location.city,
              industry: experience.industry,
              key_responsibilities: experience.key_responsibilities, // JSON
              skills_acquired: experience.skills_acquired, // JSON
            },
          ]);

        if (experienceError) throw experienceError;
      }
    }

    // 4. Actualizar o insertar proyectos
    for (const project of additionalInfo.projects) {
      if (project.id) {
        const { error: projectError } = await supabase
          .from("projects")
          .update({
            name: project.name,
            description: project.description,
            link: project.link,
          })
          .eq("id", project.id);

        if (projectError) throw projectError;
      } else {
        const { error: projectError } = await supabase.from("projects").insert([
          {
            personal_information_id: personalInformationId,
            name: project.name,
            description: project.description,
            link: project.link,
          },
        ]);

        if (projectError) throw projectError;
      }
    }

    // 5. Actualizar o insertar logros (achievements)
    for (const achievement of additionalInfo.achievements) {
      if (achievement.id) {
        const { error: achievementError } = await supabase
          .from("achievements")
          .update({
            name: achievement.name,
            description: achievement.description,
          })
          .eq("id", achievement.id);

        if (achievementError) throw achievementError;
      } else {
        const { error: achievementError } = await supabase
          .from("achievements")
          .insert([
            {
              personal_information_id: personalInformationId,
              name: achievement.name,
              description: achievement.description,
            },
          ]);

        if (achievementError) throw achievementError;
      }
    }

    // 6. Actualizar o insertar certificaciones
    for (const certification of additionalInfo.certifications) {
      if (certification.id) {
        const { error: certificationError } = await supabase
          .from("certifications")
          .update({
            name: certification.name,
          })
          .eq("id", certification.id);

        if (certificationError) throw certificationError;
      } else {
        const { error: certificationError } = await supabase
          .from("certifications")
          .insert([
            {
              personal_information_id: personalInformationId,
              name: certification.name,
            },
          ]);

        if (certificationError) throw certificationError;
      }
    }

    // 7. Actualizar o insertar idiomas (languages)
    for (const language of additionalInfo.languages) {
      if (language.id) {
        const { error: languageError } = await supabase
          .from("languages")
          .update({
            language: language.language,
            proficiency: language.proficiency,
          })
          .eq("id", language.id);

        if (languageError) throw languageError;
      } else {
        const { error: languageError } = await supabase
          .from("languages")
          .insert([
            {
              personal_information_id: personalInformationId,
              language: language.language,
              proficiency: language.proficiency,
            },
          ]);

        if (languageError) throw languageError;
      }
    }

    // 8. Actualizar o insertar disponibilidad (availability)
    // const { data: availabilityData, error: availabilityError } = await supabase
    //   .from("availability")
    //   .select("id")
    //   .eq("personal_information_id", personalInformationId)
    //   .single();

    // if (availabilityData) {
    //   // Actualizar disponibilidad si ya existe
    //   const { error: updateAvailabilityError } = await supabase
    //     .from("availability")
    //     .update({
    //       notice_period: additionalInfo.availability,
    //     })
    //     .eq("personal_information_id", personalInformationId);

    //   if (updateAvailabilityError) throw updateAvailabilityError;
    // } else {
    //   // Insertar nueva disponibilidad
    //   const { error: insertAvailabilityError } = await supabase
    //     .from("availability")
    //     .insert({
    //       personal_information_id: personalInformationId,
    //       notice_period: additionalInfo.availability,
    //     });

    //   if (insertAvailabilityError) throw insertAvailabilityError;
    // }

    // 9. Actualizar o insertar expectativas salariales (salary expectations)
    // const { data: salaryExpectationsData, error: salaryExpectationsError } =
    //   await supabase
    //     .from("salary_expectations")
    //     .select("id")
    //     .eq("personal_information_id", personalInformationId)
    //     .single();

    // if (salaryExpectationsData) {
    //   // Actualizar expectativas salariales si ya existe
    //   const { error: updateSalaryExpectationsError } = await supabase
    //     .from("salary_expectations")
    //     .update({
    //       salary_range_usd: additionalInfo.salary_expectations,
    //     })
    //     .eq("personal_information_id", personalInformationId);

    //   if (updateSalaryExpectationsError) throw updateSalaryExpectationsError;
    // } else {
    //   // Insertar nuevas expectativas salariales
    //   const { error: insertSalaryExpectationsError } = await supabase
    //     .from("salary_expectations")
    //     .insert({
    //       personal_information_id: personalInformationId,
    //       salary_range_usd: additionalInfo.salary_expectations,
    //     });

    //   if (insertSalaryExpectationsError) throw insertSalaryExpectationsError;
    // }

    // 10. Actualizar o insertar auto-identificación (self_identification)
    if (additionalInfo.self_identification.id) {
      const { error: selfIdentificationError } = await supabase
        .from("self_identification")
        .update({
          gender: additionalInfo.self_identification.gender,
          pronouns: additionalInfo.self_identification.pronouns,
          veteran: additionalInfo.self_identification.veteran,
          disability: additionalInfo.self_identification.disability,
          ethnicity: additionalInfo.self_identification.ethnicity,
        })
        .eq("id", additionalInfo.self_identification.id);

      if (selfIdentificationError) throw selfIdentificationError;
    } else {
      const { error: selfIdentificationError } = await supabase
        .from("self_identification")
        .insert([
          {
            personal_information_id: personalInformationId,
            gender: additionalInfo.self_identification.gender,
            pronouns: additionalInfo.self_identification.pronouns,
            veteran: additionalInfo.self_identification.veteran,
            disability: additionalInfo.self_identification.disability,
            ethnicity: additionalInfo.self_identification.ethnicity,
          },
        ]);

      if (selfIdentificationError) throw selfIdentificationError;
    }

    // 11. Actualizar o insertar autorización legal (legal_authorization)
    if (additionalInfo.legal_authorization.id) {
      const { error: legalAuthorizationError } = await supabase
        .from("legal_authorization")
        .update({
          ...additionalInfo.legal_authorization,
        })
        .eq("id", additionalInfo.legal_authorization.id);

      if (legalAuthorizationError) throw legalAuthorizationError;
    } else {
      const { error: legalAuthorizationError } = await supabase
        .from("legal_authorization")
        .insert([
          {
            personal_information_id: personalInformationId,
            ...additionalInfo.legal_authorization,
          },
        ]);

      if (legalAuthorizationError) throw legalAuthorizationError;
    }

    // 12. Actualizar o insertar preferencias laborales (work_preferences)
    if (additionalInfo.work_preferences.id) {
      const { error: workPreferencesError } = await supabase
        .from("work_preferences")
        .update({
          ...additionalInfo.work_preferences,
        })
        .eq("id", additionalInfo.work_preferences.id);

      if (workPreferencesError) throw workPreferencesError;
    } else {
      const { error: workPreferencesError } = await supabase
        .from("work_preferences")
        .insert([
          {
            personal_information_id: personalInformationId,
            ...additionalInfo.work_preferences,
          },
        ]);

      if (workPreferencesError) throw workPreferencesError;
    }

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error saving job profile:", error);
    return { success: false, error: error.message };
  }
};

export async function deleteJobProfile(personalInfoId: any) {
  try {
    const { error } = await supabase
      .from("personal_information")
      .delete()
      .eq("id", personalInfoId.id); // Utilizamos el ID de la tabla `personal_information`

    if (error) {
      throw new Error(error.message);
    }

    // Revalidar la página para reflejar los cambios
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting job profile:", error);
    return { success: false, error: error.message };
  }
}

export async function addBot(
  botData: Omit<
    Bot,
    "id" | "created_at" | "updated_at" | "total_applications" | "status"
  >
) {
  const { name, max_applications, job_role, personal_information, ai_cv } =
    botData;

  // Obtener el usuario actual
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error(
      `Authentication error: ${authError?.message || "User not authenticated"}`
    );
  }

  // Insertar el nuevo bot en la tabla 'bots'
  const { data, error } = await supabase.from("bots").insert([
    {
      profile_id: user.id,
      name,
      max_applications,
      job_role_id: job_role.id, // ID del rol de trabajo
      personal_information_id: personal_information.id, // ID de la información personal
      ai_cv,
      status: "inactive", // Estado inicial del bot
    },
  ]);

  // Manejo de errores en la inserción
  if (error) {
    throw new Error(`Failed to add bot: ${error.message}`);
  }

  // Revalidar la caché de la ruta
  revalidatePath("/dashboard/bots");

  return data; // Retorna los datos del bot insertado
}

export async function updateBot(
  botId: string,
  botData: Omit<
    Bot,
    "id" | "created_at" | "updated_at" | "total_applications" | "status"
  >
) {
  const { name, max_applications, job_role, personal_information, ai_cv } =
    botData;

  // Actualizar el bot en la tabla 'bots' basado en el ID proporcionado
  const { data, error } = await supabase
    .from("bots")
    .update({
      name,
      max_applications,
      job_role_id: job_role.id, // Actualizar ID del rol de trabajo
      personal_information_id: personal_information.id, // Actualizar ID de la información personal
      ai_cv,
    })
    .eq("id", botId); // Condición de igualdad con el ID del bot

  // Manejo de errores en la actualización
  if (error) {
    throw new Error(`Failed to update bot: ${error.message}`);
  }

  revalidatePath("/dashboard/bots");

  return data; // Retorna los datos del bot actualizado
}

export async function deleteBot(botId: string) {
  const { error } = await supabase
    .from("bots") // Nombre de la tabla
    .delete()
    .eq("id", botId); // Condición para encontrar el bot por su ID

  if (error) {
    throw new Error(`Failed to delete bot: ${error.message}`);
  }

  revalidatePath("/dashboard/bots"); // Revalida la ruta después de eliminar
}

export async function startBot(bot: any) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: userData } = await supabase
    .from("profiles")
    .select(`plan_expire_date`)
    .eq("id", user.id)
    .single();
  if (moment(userData.plan_expire_date) <= moment()) {
    throw new Error("The plan was already expired.");
  }

  // 1. Llamar al endpoint del backend para iniciar el bot
  const response = await fetch("http://127.0.0.1:8000/bot/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bot_id: bot.id,
    }),
  });

  // Manejar la respuesta del backend
  if (!response.ok) {
    throw new Error("Failed to start bot on the backend");
  }

  // 2. Si el backend es exitoso, actualizar el estado del bot en Supabase
  const { data, error } = await supabase
    .from("bots")
    .update({ status: "active" })
    .eq("id", bot.id);

  if (error) {
    throw new Error(`Failed to update bot status: ${error.message}`);
  }

  // Revalida la ruta para que la vista del dashboard se actualice automáticamente
  revalidatePath("/dashboard/bots");

  return data;
}

export async function stopBot(bot: any) {
  // 1. Llamar al endpoint del backend para detener el bot
  const response = await fetch("http://127.0.0.1:8000/bot/stop", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Manejar la respuesta del backend
  if (!response.ok) {
    throw new Error("Failed to stop bot on the backend");
  }

  // 2. Si el backend es exitoso, actualizar el estado del bot en Supabase
  const { data, error } = await supabase
    .from("bots")
    .update({ status: "inactive" })
    .eq("id", bot.id);

  if (error) {
    throw new Error(`Failed to update bot status: ${error.message}`);
  }

  // Revalida la ruta para que la vista del dashboard se actualice automáticamente
  revalidatePath("/dashboard/bots");

  return data;
}

//SETTINGS
export async function saveProfile(
  userId: string,
  fullName: string,
  email: string,
  username: string,
  phoneNumber: string
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      email: email,
      username: username,
      phone_number: phoneNumber,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`Error updating profile: ${error.message}`);
  }
  revalidatePath("/dashboard/settings");

  return data;
}

export async function saveIntegration(
  userId: string,
  platform: string,
  email: string,
  password: string
) {
  const encryptedPassword = encrypt(password);
  // Verifica si el userId está vacío o es nulo, y si es así, obtenlo del usuario autenticado
  if (!userId) {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error(
        `Error fetching user: ${authError?.message || "User not authenticated"}`
      );
    }

    userId = user.id;

    // Si userId viene vacío, hacemos un Insert
    const { data, error } = await supabase.from("integrations").insert({
      profile_id: userId,
      platform: platform,
      email: email,
      password: encryptedPassword, // Aquí deberías usar la versión encriptada si estás cifrando la contraseña
    });

    if (error) {
      throw new Error(`Error inserting integration: ${error.message}`);
    }

    revalidatePath("/dashboard/settings");

    return data;
  }

  // Si userId tiene un valor, se hace un Update
  const { data, error } = await supabase
    .from("integrations")
    .update({
      email: email,
      password: encryptedPassword, // Aquí deberías usar la versión encriptada si estás cifrando la contraseña
    })
    .eq("profile_id", userId)
    .eq("platform", platform);

  if (error) {
    throw new Error(`Error updating integration: ${error.message}`);
  }

  revalidatePath("/dashboard/settings");

  return data;
}
