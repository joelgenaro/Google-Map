'use client';

import { Badge } from '@/components/ui/badge';
import { ProjectManagementMonitoringPlant, ProjectManagementMonitoringPlot, ProjectManagementMonitoringReport } from '@/database/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const plotColumns: ColumnDef<ProjectManagementMonitoringPlot>[] = [
  {
    accessorKey: 'plotID',
    header: 'PlotID',
  },
  {
    accessorKey: 'canopyCover',
    header: 'Canopy Cover (%)',
  },
  {
    accessorKey: 'leafLitter',
    header: 'Leaf Litter (%)',
  },
  {
    accessorKey: 'bairSoil',
    header: 'Bair Soil (%)',
  },
  {
    accessorKey: 'rock',
    header: 'Rock (%)',
  },
  {
    accessorKey: 'vegetation',
    header: 'Vegetation (%)',
  },
  {
    accessorKey: 'herbivory',
    header: 'Herbivory (yes/no)',
    cell: ({ row }) => {
      const herbivory = row.getValue('herbivory') ? "Yes" : "No";
      return <div>{herbivory}</div>;
    }
  },
  {
    accessorKey: 'disease',
    header: 'Disease (yes/no)',
    cell: ({ row }) => {
      const disease = row.getValue('disease') ? "Yes" : "No";
      return <div>{disease}</div>;
    }
  },
  {
    accessorKey: "plotNotes",
    header: 'Notes',
  },
];

export const plantColumns: ColumnDef<ProjectManagementMonitoringPlant>[] = [
  {
    accessorKey: 'plotID',
    header: 'PlotID',
  },
  {
    accessorKey: 'plantID',
    header: 'PlantID',
  },
  {
    accessorKey: 'species',
    header: 'Species',
  },
  {
    accessorKey: 'height',
    header: 'Height (mm)',
  },
  {
    accessorKey: 'canopyDiameter',
    header: 'Canopy Diameter (mm)',
  },
  {
    accessorKey: "plantNotes",
    header: "Plant Notes",
  }
];

export const reportColumns: ColumnDef<ProjectManagementMonitoringReport>[] = [
  {
    accessorKey: 'year',
    header: 'Year',
    cell: ({ row }) => {
      const formattedFromDate = format(
        new Date(row.original.fromDate as Date),
        'yyyy'
      );
      const formattedToDate = format(
        new Date(row.original.toDate as Date),
        'yyyy'
      );
      return <div>{formattedFromDate} - {formattedToDate}</div>;
    },
  },
  {
    accessorKey: 'projectName',
    header: 'Project',
    cell: ({ row }) => {
      const project = row.getValue('projectName') as string;
      return <div>{project}</div>;
    },
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => {
      const method = row.getValue('method') as string;
      return <div>{method}</div>;
    }
  },
  {
    accessorKey: 'report',
    header: 'Report',
    cell: ({ row }) => {
      const report = row.getValue('report') as string;
      return <div>{report}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          className="text-center"
          variant={
            status === 'Available'
              ? 'default'
              : status === 'In-Progress'
                ? 'destructive'
                : 'secondary'
          }
        >
          {status}
        </Badge>
      );
    },
  },
];
