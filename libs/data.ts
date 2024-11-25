import { createClient } from "@/libs/supabase/server";
import { CVType, JobProfile } from "./definitions";

export async function getCVAction(): Promise<CVType> {
  const supabase = createClient();
  try {
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
  } catch (error) {
    console.error("Error in getCVAction:", error);
    return {} as CVType;
  }
}

export async function getUserJobProfiles(): Promise<JobProfile[]> {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
  } catch (error) {
    console.error("Error in getUserJobProfiles:", error);
    return [];
  }
}

export async function getUserJobRoles() {
  const supabase = createClient();
  try {
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
  } catch (error) {
    console.error("Error in getUserJobRoles:", error);
    return [];
  }
}

export async function getUserAutoJobs() {
  const supabase = createClient();
  try {
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
  } catch (error) {
    console.error("Error in getUserAutoJobs:", error);
    return [];
  }
}

export async function getUserBots() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return [];
    }

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

    const botsWithApplications = [];

    for (const bot of bots) {
      try {
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

        botsWithApplications.push({ ...bot, total_applications: count || 0 });
      } catch (innerError) {
        console.error("Error processing bot:", bot.id, innerError);
        botsWithApplications.push({ ...bot, total_applications: 0 });
      }
    }

    return botsWithApplications;
  } catch (error) {
    console.error("Error in getUserBots:", error);
    return [];
  }
}

export async function fetchProfileData() {
  const supabase = createClient();
  try {
    const {
      data: { user },
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
  } catch (error) {
    console.error("Error in fetchProfileData:", error);
    return null;
  }
}

export async function fetchIntegrationsData() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("integrations")
      .select("*")
      .eq("profile_id", user?.id)
      .maybeSingle();

    if (error) {
      throw new Error(`Error fetching integrations data: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in fetchIntegrationsData:", error);
    return null;
  }
}

export async function fetchPassesData() {
  try {
    const fakeUserId = "fake-user-id";

    const passes = [
      {
        type: "day",
        delta: 24 * 60 * 60 * 1000,
      },
      {
        type: "week",
        delta: 7 * 24 * 60 * 60 * 1000,
      },
      {
        type: "month",
        delta: 30 * 24 * 60 * 60 * 1000,
      },
    ];

    const activePass = passes[1];

    const currentTime = new Date().getTime();
    const passExpiryTime = currentTime + activePass.delta;
    const remainingTime = passExpiryTime - currentTime;

    return {
      userId: fakeUserId,
      activePass: activePass.type,
      remainingTime: remainingTime > 0 ? remainingTime : 0,
      totalTime: passExpiryTime,
    };
  } catch (error) {
    console.error("Error in fetchPassesData:", error);
    return null;
  }
}