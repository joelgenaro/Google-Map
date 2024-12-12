'use client';

import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ProjectManagementDetailAlert } from '@/database/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, Trash2Icon } from 'lucide-react';
import Link from 'next/link';

export const alertColumns: ColumnDef<ProjectManagementDetailAlert>[] = [
  {
    id: 'select',
    accessorKey: 'id',
    header: ({ table }) => (
      <Checkbox
        className="h-4 w-4"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="h-4 w-4"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'alert',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Alert
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { allAlerts } = useProjectManagementDetailsContext();

      return (
        <Link href={`/project-management/details/${row.original.projectId}/alerts/${row.original.id}`} className="cursor-pointer text-blue-500 hover:underline">
          {row.getValue('alert')}
        </Link>
      );
    },
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
    accessorKey: 'raiseIssue',
    header: 'Raise Issue',
    cell: ({ row }) => (
      <div className="cursor-pointer text-blue-500 hover:underline">
        {row.getValue('raiseIssue')}
      </div>
    ),
  },
  {
    accessorKey: 'archive',
    header: 'Archive',
    cell: ({ row }) => {
      const { allAlerts, setAllAlerts } = useProjectManagementDetailsContext();
      const archivedId = row.original.id as string;

      const archiveAlert = async (id: string) => {
        try {
          const response = await fetch(
            `/api/project-management/project-details/${row.original.projectId as string}/alert/${id}/archive`,
            {
              method: 'PATCH',
            }
          );
          const data = await response.json();
          await getAllAlerts(row.original.projectId as string, setAllAlerts);
          if (!!row.getIsSelected()) {
            row.toggleSelected();
          }
          return data;
        } catch (error: unknown) {
          console.error(error);
        }
      };

      if (
        allAlerts
          .filter((alert) => alert.status === 'Archived')
          .map((alert) => alert.id)
          .includes(archivedId)
      ) {
        return null;
      }

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2Icon className="cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete the alert. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => archiveAlert(archivedId)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

export const getAllAlerts = async (projectId: string, setAllAlerts: any) => {
  try {
    const response = await fetch(
      `/api/project-management/project-details/${projectId}/alert`
    );
    const data = await response.json();
    setAllAlerts(data.getAlerts as ProjectManagementDetailAlert[]);
  } catch (error: unknown) {
    console.error(error);
  }
};
