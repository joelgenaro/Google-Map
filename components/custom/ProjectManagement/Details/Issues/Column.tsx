'use client';

import { ProjectManagementDetailIssue } from '@/database/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  CircleCheckIcon,
  HourglassIcon,
  TriangleAlertIcon,
} from 'lucide-react';

export const issueColumns: ColumnDef<ProjectManagementDetailIssue>[] = [
  {
    accessorKey: 'issue',
    header: 'Issue',
    cell: ({ row }) => (
      <div className="text-blue-500 cursor-pointer hover:underline">
        {row.getValue('issue')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div className="flex gap-2 items-center">
          {status === 'Immediate action required' ? (
            <TriangleAlertIcon className="text-red-500" />
          ) : status === 'Action required' ? (
            <HourglassIcon className="text-yellow-500" />
          ) : status === 'Resolved' ? (
            <CircleCheckIcon className="text-green-500" />
          ) : null}
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="text-blue-500 cursor-pointer hover:underline">
        {row.getValue('action')}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.getValue('date')),
        'dd/MM/yyyy'
      );
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Descripiton',
    cell: ({ row }) => (
      <div className="text-blue-500 cursor-pointer hover:underline">
        {row.getValue('description')}
      </div>
    ),
  },
];
