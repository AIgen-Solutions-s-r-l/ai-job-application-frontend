import { getUserAutoJobs, getUserJobRoles } from "@/libs/supabase-data";
import StatsCards from "@/components/stats/StatsCards";

export default async function BotStatisticsPage() {

  const autoJobs = await getUserAutoJobs();
  const jobRoles = await getUserJobRoles();

  // Calcula las estadísticas necesarias
  const totalJobsApplied = autoJobs.filter((job: { status: string; }) => job.status === 'Success').length;
  const totalJobsAnalyzed = autoJobs.length;
  const totalJobRolesCreated = jobRoles.length;

  return (
    <StatsCards
      totalJobsApplied={totalJobsApplied}
      totalJobsAnalyzed={totalJobsAnalyzed}
      totalJobRolesCreated={totalJobRolesCreated}
    />
  );
}