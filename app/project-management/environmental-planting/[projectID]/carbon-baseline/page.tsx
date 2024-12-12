import CarbonBaseline from "@/components/custom/ProjectManagement/carbonBaseline";

export default function CarbonBaselinePage({
  params,
}: {
  params: { projectID: string };
}) {
  return (
    <CarbonBaseline params={params} />
  ) 
}