import { getUserJobRoles } from "@/libs/supabase-data";
import TableActions from "@/components/roles/table";

export default async function TableRolesServerComponent() {
  // Obtener los roles de trabajo del usuario
  const jobs = await getUserJobRoles();

  return <TableActions jobs={jobs} />;
}
