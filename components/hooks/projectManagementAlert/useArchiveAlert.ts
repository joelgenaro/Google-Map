// useArchive.tsx
import { useCallback } from 'react';
import { ProjectManagementDetailAlert } from '@/database/types';

export const useArchiveAlert = (getAllAlerts: Function, setAllAlerts: Function, table: any) => {
  const handleArchive = useCallback(async (alerts: ProjectManagementDetailAlert[]) => {
    try {
      await fetch(
        `/api/project-management/project-details/${alerts[0].projectId}/alert/archiveSomeAlerts`,
        {
          method: 'PATCH',
          body: JSON.stringify({ alertIDs: alerts.map((alert) => alert.id) }),
        }
      );
      getAllAlerts(alerts[0].projectId, setAllAlerts);
      table.resetRowSelection(true);
    } catch (error) {
      console.error(error);
    }
  }, [getAllAlerts, setAllAlerts, table]);

  const handleArchiveAll = useCallback(async (allAlerts: ProjectManagementDetailAlert[]) => {
    try {
      await fetch(
        `/api/project-management/project-details/${allAlerts[0].projectId}/alert`,
        {
          method: 'PATCH',
        }
      );
      getAllAlerts(allAlerts[0].projectId, setAllAlerts);
      table.resetRowSelection(true);
    } catch (error) {
      console.error(error);
    }
  }, [getAllAlerts, setAllAlerts, table]);

  return { handleArchive, handleArchiveAll };
};