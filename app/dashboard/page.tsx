import JobRoles from "@/components/roles/page";
import JobProfiles from "@/components/profiles/page";
import AutoJobs from "@/components/jobs/page"; // Importar el componente de Job Profiles
import StatsCards from "@/components/stats/page"; // Componente para las cards de estadísticas
import JobsAppliedChart from "@/components/JobsAppliedChart"; // Componente para el chart
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <>
      {/* Contenido del dashboard */}
      <section className="mx-auto space-y-8">
        {/* <StatsCards />

        <Suspense fallback={<div>Loading auto jobs...</div>}>
          <AutoJobs />
        </Suspense>

        <Suspense fallback={<div>Loading job profiles...</div>}>
          <JobProfiles />
        </Suspense>

        <Suspense fallback={<div>Loading job roles...</div>}>
          <JobRoles />
        </Suspense>

        <JobsAppliedChart /> */}
      </section>
    </>
  );
}
