import Monitoring from "@/components/custom/ProjectManagement/monitoring";

export default function MonitoringPage({
  params,
}: {
  params: { projectID: string };
}) {
  return (
    <Monitoring params={params} />
  ) 
}