import { getUserAutoJobs } from "@/libs/data"; // Función para obtener los trabajos del bot
import AutoJobsTable from "@/components/jobs/table"; // Tabla que muestra los trabajos gestionados por el bot

export default async function AutoJobs() {
  const autoJobs = await getUserAutoJobs();

  return <AutoJobsTable jobs={autoJobs} />;
}
