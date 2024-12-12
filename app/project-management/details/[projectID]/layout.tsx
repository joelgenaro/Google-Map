import { ProjectManagementDetailProvider } from '@/components/context/ProjectManagementDetailContext';
import ProjectManagementLayoutWithState from '@/components/custom/ProjectManagement/Details/projectManagementLayoutWithState';
import { GetProjectManagement } from '@/database/services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airseed - Project Management Details',
  description: 'Airseed Project Management Details',
};

export default async function ProjectManagementLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectID: string };
}) {
  const projectManagement = await GetProjectManagement(params.projectID);
  return (
    <ProjectManagementDetailProvider>
      <ProjectManagementLayoutWithState
        params={params}
        projectManagement={projectManagement}
      >
        {children}
      </ProjectManagementLayoutWithState>
    </ProjectManagementDetailProvider>
  );
}
