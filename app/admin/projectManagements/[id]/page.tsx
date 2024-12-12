'use client';
import { Show } from '@refinedev/antd';
import { Typography } from 'antd';
import { useShow } from '@refinedev/core';
import { ProjectManagement } from '@/database/types';
import RecordViewer from '@/components/custom/admin/recordViewer';

const { Title, Text } = Typography;

export default function ShowProjectManagement() {
  const { queryResult } = useShow<ProjectManagement>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={1}>Project Management Details</Title>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Project Name</Title>
      <Text>{record?.projectName}</Text>
      <Title level={5}>Landholder Name</Title>
      <Text>{record?.landholderName}</Text>
      <RecordViewer
        title="Letter Of Declaration"
        recordUrl={record?.letterOfDeclarationUrl}
      />
      <RecordViewer
        title="Audit Schedule"
        recordUrl={record?.auditScheduleUrl}
      />
      <RecordViewer
        title="Letter To Participate"
        recordUrl={record?.letterToParticipateUrl}
      />
      <RecordViewer
        title="Specifications"
        recordUrl={record?.specificationsUrls?.[0]}
      />
      <RecordViewer
        title="Land Management Plan"
        recordUrl={record?.landManagementPlanUrl}
      />
      <RecordViewer
        title="Fire Management Plan"
        recordUrl={record?.fireManagementPlanUrl}
      />
      <RecordViewer
        title="Permanence Plan"
        recordUrl={record?.permanencePlanUrl}
      />
      <RecordViewer
        title="Full CAM Files"
        recordUrl={record?.fullCAMFilesUrl}
      />
      <RecordViewer
        title="Carbon Estimation Area Baseline"
        recordUrl={record?.carbonEstimationAreaBaselineDataUrl}
      />
      <RecordViewer
        title="Carbon Additional Files"
        recordUrl={record?.carbonAdditionalFilesUrls}
      />
      <Title level={5}>Carbon Additional Files Description</Title>
      <Text>{record?.carbonAdditionalFilesDescription}</Text>
      <RecordViewer
        title="Monitoring Data"
        recordUrl={record?.monitoringDataUrl}
      />
      <RecordViewer
        title="Monitoring Plots"
        recordUrl={record?.monitoringPlotsUrl}
      />
      <RecordViewer
        title="Monitoring Additional Files"
        recordUrl={record?.monitoringAdditionalFilesUrls}
      />
      <Title level={5}>Monitoring Additional Files Description</Title>
      <Text>{record?.monitoringAdditionalFilesDescription}</Text>
    </Show>
  );
}
