import { getCVAction, getUserJobProfiles } from "@/libs/data";
import TableProfiles from "./table";

export default async function JobProfiles() {
  // Obtener los perfiles de trabajo con los detalles
  const profilesWithDetails = await getUserJobProfiles();

  const cvFile = await getCVAction();

  return (
    <TableProfiles
      cv={cvFile}
      profiles={profilesWithDetails}
      initialPageSize={5}
    />
  );
}
