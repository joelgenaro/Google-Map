import Specification from "@/components/custom/ProjectManagement/specification";

export default function SpecificationPage({
  params,
}: {
  params: { projectID: string };
}) {
  return (
    <Specification params={params} />
  ) 
}