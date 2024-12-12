'use client';

import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { getAllAlerts } from '@/components/custom/ProjectManagement/Details/Alerts/Column';
import { useCallback, useEffect } from 'react';

export default function AlertDetailPage({
  params,
}: {
  params: { projectID: string; alertID: string };
}) {
  const { setAllAlerts } = useProjectManagementDetailsContext();
  const updateAlertState = useCallback(async () => {
    await fetch(
      `/api/project-management/project-details/${params.projectID}/alert/${params.alertID}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status: 'Viewed' }),
      }
    );
    getAllAlerts(params.projectID, setAllAlerts);
  }, [params.projectID, params.alertID]);

  useEffect(() => {
    updateAlertState();
  }, []);
  return (
    <div className="w-full">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Alert Detail Page Coming Soon
      </h1>
    </div>
  );
}
