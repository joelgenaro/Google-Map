'use client';
import { UserProfile } from '@/database/types';
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';

import { Table } from 'antd';

export default function Products() {
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={['user', 'id']} title="Id" />
        <Table.Column dataIndex={['user', 'name']} title="Name" />
        <Table.Column dataIndex={['user', 'email']} title="Email" />
        <Table.Column dataIndex={['user', 'role']} title="Role" />
        <Table.Column
          dataIndex={['profile', 'profileType']}
          title="Profile Type"
        />
        <Table.Column dataIndex={['profile', 'userType']} title="User Type" />
        <Table.Column
          dataIndex={['profile', 'experienceLevel']}
          title="Experience Level"
        />
        <Table.Column
          dataIndex={['profile', 'registerReason']}
          title="Registration Reason"
        />
        <Table.Column<UserProfile>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <div className='flex gap-2'>
              <ShowButton hideText size="small" recordItemId={record.user.id} />
              <EditButton hideText size="small" recordItemId={record.user.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.user.id}
              />
            </div>
          )}
        />
      </Table>
    </List>
  );
}
