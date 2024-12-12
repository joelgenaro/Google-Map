import { GetProjectManagement } from "@/database/services";
import MonitoringMap from "./monitoringMap";

export default async function MonitoringMapPage({
  params,
}: {
  params: { projectID: string };
}) {
  const projectManagementData = await GetProjectManagement(params.projectID);
  return (
    <MonitoringMap projectManagementData={projectManagementData} />
  );
}
