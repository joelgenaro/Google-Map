'use client';

import { ProjectManagementDetailActivity } from '@/database/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  CircleCheckIcon,
  HourglassIcon,
  TriangleAlertIcon,
} from 'lucide-react';

export const activityColumns: ColumnDef<ProjectManagementDetailActivity>[] = [
  {
    accessorKey: 'activity',
    header: 'Activity',
    cell: ({ row }) => (
      <div className="text-blue-500 cursor-pointer hover:underline">
        {row.getValue('activity')}
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
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const type = row.original.type as string;
      let formattedDate = '';

      if (type === "Log") {
        formattedDate = format(
          new Date(row.original.date as Date),
          'dd/MM/yyyy'
        );
      } else {
        const fromDate = format(
          new Date(row.original.fromDate as Date),
          'dd/MM/yyyy'
        );
        const toDate = format(
          new Date(row.original.toDate as Date),
          'dd/MM/yyyy'
        );
        formattedDate = `${fromDate} - ${toDate}`;
      }
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
