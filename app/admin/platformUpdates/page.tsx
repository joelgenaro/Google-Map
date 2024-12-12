'use client';
import { PlatformUpdate } from '@/database/types';
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';

import { Table } from 'antd';

export default function Products() {
  const { tableProps } = useTable<PlatformUpdate>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={'createdBy'} title="Created By" />
        <Table.Column
          dataIndex={'createdAt'}
          title="Created At"
          render={(value) => <DateField value={value} />}
        />
        <Table.Column dataIndex={'message'} title="Message" />
        <Table.Column
          dataIndex={'startDate'}
          title="Start Date"
          render={(value) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={'endDate'}
          title="End Date"
          render={(value) => <DateField value={value} />}
        />
        <Table.Column<PlatformUpdate>
          title="Enabled"
          dataIndex="enabled"
          key="enabled"
          render={(_, record) => <p>{record.enabled ? 'True' : ' False'}</p>}
        />
        <Table.Column<PlatformUpdate>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </>
          )}
        />
      </Table>
    </List>
  );
}
