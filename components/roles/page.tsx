import { getUserJobRoles } from "@/libs/data";
import TableActions from "./table";

export default async function TableRolesServerComponent() {
  // Obtener los roles de trabajo del usuario
  const jobs = await getUserJobRoles();

  return <TableActions jobs={jobs} initialPageSize={5} />;
}
