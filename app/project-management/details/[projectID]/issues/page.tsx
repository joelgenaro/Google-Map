'use client';

import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { issueColumns } from '@/components/custom/ProjectManagement/Details/Issues/Column';
import { LogIssueModal } from '@/components/custom/ProjectManagement/Details/Issues/LogIssueModal';
import { IconButton } from '@/components/custom/ProjectManagement/Details/Monitoring/IconButton';
import { MonitoringDataTable } from '@/components/custom/ProjectManagement/Details/Monitoring/MonitoringDataTable';
import { fetchIssues } from '@/lib/api';
import { FolderPlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function IssuesPage({
  params,
}: {
  params: { projectID: string };
}) {
  const [logModalOpen, setLogModalOpen] = useState(false);
  const { allIssues, fetchIssuesLoading, setAllIssues, setFetchIssuesLoading } =
    useProjectManagementDetailsContext();

  useEffect(() => {
    fetchIssues(setAllIssues, params.projectID).finally(() =>
      setFetchIssuesLoading(false)
    );
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="flex gap-6">
        <IconButton
          variant="default"
          size="auto"
          Icon={FolderPlusIcon}
          onClick={() => setLogModalOpen(true)}
          className="flex-row-reverse gap-2 rounded px-4 py-2"
        >
          Log Issue
        </IconButton>
      </div>
      <MonitoringDataTable
        columns={issueColumns}
        data={allIssues}
        isloading={fetchIssuesLoading}
      />
      <LogIssueModal
        open={logModalOpen}
        setOpen={setLogModalOpen}
        projectID={params.projectID}
      />
    </div>
  );
}
