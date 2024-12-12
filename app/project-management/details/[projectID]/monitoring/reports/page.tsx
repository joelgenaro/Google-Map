'use client';

import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { reportColumns } from '@/components/custom/ProjectManagement/Details/Monitoring/Columns';
import { IconButton } from '@/components/custom/ProjectManagement/Details/Monitoring/IconButton';
import { MonitoringDataTable } from '@/components/custom/ProjectManagement/Details/Monitoring/MonitoringDataTable';
import { MonitoringReportModal } from '@/components/custom/ProjectManagement/Details/Monitoring/MonitoringReportModal';
import { fetchProjectManagementReport } from '@/lib/api';
import { FileWarning } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MonitoringReportPage({
  params,
}: {
  params: { projectID: string };
}) {
  const [open, setOpen] = useState(false);

  const {
    allReports,
    fetchReportsLoading,
    setAllReports,
    setFetchReportsLoading,
  } = useProjectManagementDetailsContext();

  useEffect(() => {
    fetchProjectManagementReport(setAllReports, params.projectID).finally(() =>
      setFetchReportsLoading(false)
    );
  }, []);

  return (
    <div className="w-full space-y-8">
      <IconButton
        variant="default"
        size="auto"
        Icon={FileWarning}
        onClick={() => setOpen(true)}
        className="flex-row-reverse gap-2 rounded px-4 py-2"
      >
        Request Report
      </IconButton>
      <MonitoringDataTable
        columns={reportColumns}
        data={allReports}
        isloading={fetchReportsLoading}
      />
      <MonitoringReportModal
        open={open}
        setOpen={setOpen}
        projectID={params.projectID}
      />
    </div>
  );
}
