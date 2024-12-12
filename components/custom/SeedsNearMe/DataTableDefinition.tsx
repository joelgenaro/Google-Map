'use client';

import { SeedSpeciesData } from '@/components/hooks/useSeedsSpeciesData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SeedsRequestWithProjectData } from '@/database/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { FeatureCollection } from 'geojson';
import { ArrowUpDown, CircleCheck, CircleX } from 'lucide-react';
import SeedsSpeciesSheet from './SeedsSpeciesSheet';

const dataTableDefinition: ColumnDef<SeedsRequestWithProjectData>[] = [
  // {
  //   accessorKey: 'id',
  //   header: () => <div className="text-center">Request Id</div>,
  //   cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
  // },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Requested Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.getValue('createdAt')),
        'dd-MMM-yyyy hh:mm a'
      );
      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'projectName',
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Affiliated Project
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('projectName')}</div>
    ),
  },
  {
    accessorKey: 'requiredDate',
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Required Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.getValue('requiredDate')),
        'dd-MMM-yyyy'
      );
      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'seedTreatment',
    header: () => <div className="text-center">Seed Treatment</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue('seedTreatment') ? (
          <CircleCheck className="fill-green-500 text-white" size={36} />
        ) : (
          <CircleX className="fill-red-500 text-white" size={36} />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'seedViability',
    header: () => <div className="text-center">Seed Viability</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue('seedViability') ? (
          <CircleCheck className="fill-green-500 text-white" size={36} />
        ) : (
          <CircleX className="fill-red-500 text-white" size={36} />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'seedProvenance',
    header: () => <div className="text-center">Seed Provenance</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue('seedProvenance') ? (
          <CircleCheck className="fill-green-500 text-white" size={36} />
        ) : (
          <CircleX className="fill-red-500 text-white" size={36} />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'seedsSpecies',
    header: () => <div className="text-center">Seeds Species</div>,
    cell: ({ row }) => {
      try {
        const seedsSpeciesData = row.getValue(
          'seedsSpecies'
        ) as SeedSpeciesData[];
        const geoJsonData = (row.original.projectData ||
          row.original.geoJsonData) as FeatureCollection;
        return (
          <SeedsSpeciesSheet
            seedsSpecies={seedsSpeciesData}
            geoJsonData={geoJsonData}
          />
        );
      } catch (error) {
        return <div className="text-center">Invalid JSON</div>;
      }
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div className="flex items-center justify-center">
          <Badge
            className="text-center"
            variant={
              status === 'REQUESTED'
                ? 'default'
                : status === 'CANCELLED'
                  ? 'destructive'
                  : 'secondary'
            }
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const router = useRouter();
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             disabled={row.getValue('status') !== 'REQUESTED'}
  //             onClick={() =>
  //               router.push(`/seeds-near-me/update?id=${row.getValue('id')}`)
  //             }
  //           >
  //             Edit request
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>Placeholder action</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export default dataTableDefinition;
