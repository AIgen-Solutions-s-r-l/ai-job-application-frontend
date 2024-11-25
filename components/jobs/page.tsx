import { getUserAutoJobs } from "@/libs/data"; // Función para obtener los trabajos del bot
import AutoJobsTable from "./table"; // Tabla que muestra los trabajos gestionados por el bot

export default async function AutoJobs() {
  // Obtener los trabajos gestionados por el bot con los detalles
  const autoJobs = await getUserAutoJobs();

  return <AutoJobsTable jobs={autoJobs} initialPageSize={5} />;
}
