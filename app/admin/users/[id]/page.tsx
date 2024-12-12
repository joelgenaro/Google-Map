'use client';
import { Show } from '@refinedev/antd';
import { Typography } from 'antd';
import { useShow } from '@refinedev/core';
import { UserProfile } from '@/database/types';

const { Title, Text } = Typography;

export default function ShowUser() {
  const { queryResult } = useShow<UserProfile>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={1}>User</Title>

      <Title level={5}>Id</Title>
      <Text>{record?.user.id}</Text>

      <Title level={5}>Name</Title>
      <Text>{record?.user.name}</Text>

      <Title level={5}>Email</Title>
      <Text>{record?.user.email}</Text>

      <Title level={5}>Role</Title>
      <Text>{record?.user.role}</Text>

      <Title level={1}>Profile</Title>

      <Title level={5}>Profile Type</Title>
      <Text>{record?.profile.profileType}</Text>

      <Title level={5}>User Type</Title>
      <Text>{record?.profile.userType}</Text>

      <Title level={5}>Experience Level</Title>
      <Text>{record?.profile.experienceLevel}</Text>

      <Title level={5}>Registration Reason</Title>
      <Text>{record?.profile.registerReason}</Text>
    </Show>
  );
}
