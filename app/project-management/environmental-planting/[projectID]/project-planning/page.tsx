import ProjectPlanning from "@/components/custom/ProjectManagement/projectPlanning";

export default function ProjectPlanningPage({
  params,
}: {
  params: { projectID: string };
}) {
  return (
    <ProjectPlanning params={params} />
  ) 
}