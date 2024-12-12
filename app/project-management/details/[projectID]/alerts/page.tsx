"use client"
import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { AlertDataTable } from '@/components/custom/ProjectManagement/Details/Alerts/AlertDataTable';
import { alertColumns } from '@/components/custom/ProjectManagement/Details/Alerts/Column';

export default function AlertsPage({
  params,
}: {
  params: { projectID: string };
}) {
  const { allAlerts: contextAllAlerts } = useProjectManagementDetailsContext();

  return (
    <div className="w-full space-y-8">
      <AlertDataTable columns={alertColumns} data={contextAllAlerts} />
    </div>
  );
}
