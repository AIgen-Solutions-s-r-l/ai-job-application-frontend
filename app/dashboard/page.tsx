// import JobRoles from "@/components/roles/page";
// import JobProfiles from "@/components/profiles/page";
// import StatsCards from "@/components/stats/page"; // Componente para las cards de estadísticas
import { Suspense } from "react";
import AutoJobs from "./jobs/page";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <section className='mx-auto space-y-8'>
      {/* <StatsCards /> */}

      <Suspense fallback={<div>Loading auto jobs...</div>}>
        <AutoJobs />
      </Suspense>

      {/* <Suspense fallback={<div>Loading job profiles...</div>}>
          <JobProfiles />
        </Suspense>

        <Suspense fallback={<div>Loading job roles...</div>}>
          <JobRoles />
        </Suspense> */}
    </section>
  );
}
