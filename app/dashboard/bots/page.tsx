import { getUserBots, getUserProfileAction, getUserJobRoles } from "@/libs/supabase-data";
import BotStatistics from "@/components/bots/statistics";
import BotTable from "@/components/bots/table"; // Componente que muestra los bots
import { getPlans } from "@/libs/pricing/data";

export default async function BotsPage() {
  // Obtener los bots gestionados por el usuario
  const bots = await getUserBots();

  // Fetch de job profiles y job roles
  const jobProfiles = await getUserProfileAction(); // Función para obtener job profiles
  const jobRoles = await getUserJobRoles(); // Función para obtener job roles
  const userPlans = await getPlans();

  return (
    <div>
      {/* Estadísticas de los bots */}
      <BotStatistics bots={bots} />

      {/* Tabla de bots */}
      <BotTable
        bots={bots}
        jobProfiles={jobProfiles}
        jobRoles={jobRoles}
        userPlans={userPlans}
      />
    </div>
  );
}
