import { createClient } from "@/libs/supabase/server";
import { CVType, JobProfile } from "./definitions";

export async function getCVAction(): Promise<CVType> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("files")
    .select("name, type, size, path")
    .eq("class", "resume")
    .eq("user_id", user.id)
    .single();

  return data;
}

// Función para obtener todos los perfiles de trabajo del usuario
export async function getUserJobProfiles(): Promise<JobProfile[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Consulta principal para obtener todos los perfiles
  const { data: profiles } = await supabase
    .from("personal_information")
    .select(
      `*,
      education_details(*),
      experience_details(*),
      projects(*),
      achievements(*),
      certifications(*),
      languages(*),
      interests(*),
      availability(*),
      salary_expectations(*),
      self_identification(*),
      legal_authorization(*),
      work_preferences(*)
      `
    )
    .eq("profile_id", user.id);

  // Si hay perfiles, obtenemos las tablas relacionadas
  const profilesWithDetails = await Promise.all(
    profiles.map(async (profile) => {
      const {
        education_details,
        experience_details,
        projects,
        achievements,
        certifications,
        languages,
        interests,
        availability,
        salary_expectations,
        self_identification,
        legal_authorization,
        work_preferences,
        ...rest
      } = profile;

      return {
        personalInfo: rest,
        educationDetails: education_details || [],
        experienceDetails: experience_details || [],
        additionalInfo: {
          projects: projects || [],
          achievements: achievements || [],
          certifications: certifications || [],
          languages: languages || [],
          interests: interests || [],
          availability: availability?.[0].notice_period || {},
          salaryExpectations: salary_expectations?.[0].salary_range_usd || {},
          selfIdentification: self_identification?.[0] || {},
          legalAuthorization: legal_authorization?.[0] || {},
          workPreferences: work_preferences?.[0] || {},
        },
      };
    })
  );

  return profilesWithDetails as JobProfile[];
}

// Función para obtener los roles de trabajo de un usuario
export async function getUserJobRoles() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs, error } = await supabase
    .from("job_roles")
    .select("*")
    .eq("profile_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return jobs;
}

export async function getUserAutoJobs() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("auto_jobs")
    .select(
      `*,
      bots(personal_information(profile_alias), job_roles(job_title))`
    )
    .eq("profile_id", user?.id);

  if (error) {
    console.error("Error fetching auto jobs:", error);
    return [];
  }

  return data || [];
}

// Función para obtener los bots con las relaciones JobRole y PersonalInformation
export async function getUserBots() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return [];
  }

  // Consulta para obtener los bots
  const { data: bots, error: botsError } = await supabase
    .from("bots")
    .select(
      `
      *,
      job_role:job_roles (*),
      personal_information:personal_information (*)
    `
    )
    .eq("profile_id", user?.id);

  if (botsError) {
    console.error("Error fetching bots:", botsError);
    return [];
  }

  // Inicializa un array para almacenar el conteo de aplicaciones
  const botsWithApplications = [];

  // Itera sobre cada bot para obtener el conteo de aplicaciones
  for (const bot of bots) {
    const { count, error: countError } = await supabase
      .from("auto_jobs")
      .select("*", { count: "exact", head: true })
      .eq("bot_id", bot.id);

    if (countError) {
      console.error(
        `Error fetching applications count for bot ${bot.id}:`,
        countError
      );
    }

    // Agrega el total de aplicaciones al objeto bot
    botsWithApplications.push({ ...bot, total_applications: count || 0 });
  }

  return botsWithApplications;
}

export async function fetchProfileData() {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Error fetching profile data: ${error.message}`);
  }
  return data;
}

export async function fetchIntegrationsData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("integrations")
    .select("*") // Solo seleccionamos los campos que necesitamos
    .eq("profile_id", user?.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Error fetching integrations data: ${error.message}`);
  }

  return data;
}

export async function fetchPassesData() {
  // Simular un usuario autenticado
  const fakeUserId = "fake-user-id";

  // Simular los pases y sus tiempos de expiración usando un delta
  const passes = [
    {
      type: "day",
      delta: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
    },
    {
      type: "week",
      delta: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
    },
    {
      type: "month",
      delta: 30 * 24 * 60 * 60 * 1000, // 30 días en milisegundos
    },
  ];

  // Simular que el pase activo es el pase semanal
  const activePass = passes[1];

  // Calcular el tiempo actual y cuándo expira el pase
  const currentTime = new Date().getTime();
  const passExpiryTime = currentTime + activePass.delta; // Delta añadido al tiempo actual
  const remainingTime = passExpiryTime - currentTime; // Tiempo restante

  return {
    userId: fakeUserId,
    activePass: activePass.type,
    remainingTime: remainingTime > 0 ? remainingTime : 0, // Si el tiempo ha expirado, devolver 0
    totalTime: passExpiryTime,
  };
}
