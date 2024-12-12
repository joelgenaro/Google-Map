'use client';
import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { activityColumns } from '@/components/custom/ProjectManagement/Details/Activities/Column';
import { LogActivityModal } from '@/components/custom/ProjectManagement/Details/Activities/LogActivityModal';
import { ScheduleActivityModal } from '@/components/custom/ProjectManagement/Details/Activities/ScheduleActivityModal';
import { IconButton } from '@/components/custom/ProjectManagement/Details/Monitoring/IconButton';
import { MonitoringDataTable } from '@/components/custom/ProjectManagement/Details/Monitoring/MonitoringDataTable';
import { fetchActivities } from '@/lib/api';
import { CalendarClockIcon, CalendarPlus2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AcitivitiesPage({
  params,
}: {
  params: { projectID: string };
}) {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);

  const {
    allActivities,
    fetchActivitiesLoading,
    setAllActivities,
    setFetchActivitiesLoading,
  } = useProjectManagementDetailsContext();

  useEffect(() => {
    fetchActivities(setAllActivities, params.projectID).finally(() =>
      setFetchActivitiesLoading(false)
    );
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="flex gap-6">
        <IconButton
          variant="default"
          size="auto"
          Icon={CalendarClockIcon}
          onClick={() => setScheduleModalOpen(true)}
          className="flex-row-reverse gap-2 rounded px-4 py-2"
        >
          Schedule Activity
        </IconButton>
        <IconButton
          variant="default"
          size="auto"
          Icon={CalendarPlus2Icon}
          onClick={() => setLogModalOpen(true)}
          className="flex-row-reverse gap-2 rounded px-4 py-2"
        >
          Log Activity
        </IconButton>
      </div>
      <MonitoringDataTable
        columns={activityColumns}
        data={allActivities}
        isloading={fetchActivitiesLoading}
      />
      <ScheduleActivityModal
        open={scheduleModalOpen}
        setOpen={setScheduleModalOpen}
        projectID={params.projectID}
      />
      <LogActivityModal
        open={logModalOpen}
        setOpen={setLogModalOpen}
        projectID={params.projectID}
      />
    </div>
  );
}
