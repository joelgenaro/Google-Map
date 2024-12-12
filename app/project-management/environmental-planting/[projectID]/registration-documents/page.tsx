import RegistrationDocument from "@/components/custom/ProjectManagement/registrationDocument";

export default function RegistrationDocumentPage({
  params,
}: {
  params: { projectID: string };
}) {
  return (
    <RegistrationDocument params={params} />
  ) 
}