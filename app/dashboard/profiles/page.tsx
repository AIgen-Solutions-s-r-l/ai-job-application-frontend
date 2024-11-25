import { getCVAction, getUserJobProfiles } from "@/libs/data";
import TableProfiles from "@/components/profiles/table";
import { CVType } from "@/libs/definitions";

export default async function JobProfiles() {
  // Obtener los perfiles de trabajo con los detalles
  const profilesWithDetails = await getUserJobProfiles();

  const cvFile: CVType = await getCVAction();

  return <TableProfiles cv={cvFile} profiles={profilesWithDetails} />;
}