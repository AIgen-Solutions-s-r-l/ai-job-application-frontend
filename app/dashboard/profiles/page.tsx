import { getCVAction, getUserProfileAction } from "@/libs/data";
import TableProfiles from "@/components/profiles/table";
import { CVType } from "@/libs/definitions";

export default async function JobProfiles() {
  const profilesWithDetails = await getUserProfileAction();

  const cvFile: CVType = await getCVAction();

  return <TableProfiles cv={cvFile} profiles={profilesWithDetails} />;
}