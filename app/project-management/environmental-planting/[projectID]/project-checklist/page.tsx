import ProjectChecklist from "@/components/custom/ProjectManagement/projectChecklist";

export default function ProjectChecklistPage({
  params,
}: {
  params: { projectID: string };
}) {
  return (
    <ProjectChecklist params={params} />
  ) 
}