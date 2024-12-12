'use client';
import { Show } from '@refinedev/antd';
import { Typography } from 'antd';
import { useShow } from '@refinedev/core';
import { PlatformUpdate } from '@/database/types';

const { Title, Text } = Typography;

export default function ShowPlatformUpdate() {
  const { queryResult } = useShow<PlatformUpdate>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Enabled</Title>
      <Text>{record?.enabled ? 'True' : 'False'}</Text>

      <Title level={5}>Message</Title>
      <Text>{record?.message}</Text>

      <Title level={5}>Start Date</Title>
      <p>{record?.startDate?.toLocaleString()}</p>

      <Title level={5}>End Date</Title>
      <p>{record?.endDate?.toLocaleString()}</p>

      <Title level={5}>Created Date</Title>
      <p>{record?.createdAt?.toLocaleString()}</p>

      <Title level={5}>Created By</Title>
      <p>{record?.createdBy?.toLocaleString()}</p>

      <Title level={5}>Updated Date</Title>
      <p>{record?.updatedAt?.toLocaleString()}</p>

      <Title level={5}>Updated By</Title>
      <p>{record?.updatedBy?.toLocaleString()}</p>
    </Show>
  );
}
