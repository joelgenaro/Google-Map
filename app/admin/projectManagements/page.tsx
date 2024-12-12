'use client';
import { LandAssessmentAllProjects } from '@/database/types';
import {
  DeleteButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';

import { Table } from 'antd';

export default function Products() {
  const { tableProps } = useTable<LandAssessmentAllProjects>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={'id'} title="Project ID" />
        <Table.Column dataIndex={'projectName'} title="Project Name" />
        <Table.Column dataIndex={'landholderName'} title="Landholder Name" />
        <Table.Column dataIndex={'address'} title="Address" />
        <Table.Column<LandAssessmentAllProjects>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <div className="flex gap-2">
              <ShowButton size="small" recordItemId={record.id} />
              <DeleteButton size="small" recordItemId={record.id} />
            </div>
          )}
        />
      </Table>
    </List>
  );
}
