'use client';

import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { ProjectManagementAlert } from '@/components/custom/ProjectManagement/Details/projectManagementAlert';
import { ProjectManagementHeader } from '@/components/custom/ProjectManagement/Details/projectManagementHeader';
import Sidebar from '@/components/custom/layout/sidebar';
import { ProjectManagement } from '@/database/types';
import { use, useEffect, useState } from 'react';
import { getAllAlerts } from './Alerts/Column';

export default function ProjectManagementLayoutWithState({
  children,
  params,
  projectManagement,
}: {
  children: React.ReactNode;
  params: { projectID: string };
  projectManagement: ProjectManagement;
}) {
  const [currentTitle, setCurrentTitle] = useState('Project Status');
  const { setProjectManagementData, allAlerts, setAllAlerts, setFetchAlertsLoading } =
    useProjectManagementDetailsContext();

  useEffect(() => {
    if (projectManagement) {
      setProjectManagementData(projectManagement);
    }
  }, [projectManagement]);

  useEffect(() => {
    getAllAlerts(params.projectID, setAllAlerts).finally(() =>
      setFetchAlertsLoading(false)
    );
  }, []);

  const newAlerts = allAlerts
    .filter((alert) => alert.status === 'New')
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return 0;
      }
    });

  return (
    <div className="flex h-full">
      <Sidebar
        projectID={params.projectID}
        onItemClicked={setCurrentTitle}
        hasAlert={!!(newAlerts.length > 0)}
        badgeCount={newAlerts.length}
      />
      <div className="flex flex-1 flex-col p-4">
        {newAlerts.length > 0 && (
          <ProjectManagementAlert
            content={`Alert: ${newAlerts[0].alert}`}
            alertID={newAlerts[0].id}
            projectID={params.projectID}
          />
        )}

        <ProjectManagementHeader
          title={currentTitle}
          projectTitle={projectManagement.projectName}
          location={projectManagement.address}
          propertySize="1000ha"
          projectType={[
            'Soil Carbon',
            'Environmental Planting',
            'Human-Induced Reforestation',
          ]}
        />
        {children}
      </div>
    </div>
  );
}
