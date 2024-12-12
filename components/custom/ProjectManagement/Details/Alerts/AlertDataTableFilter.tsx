import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { useArchiveAlert } from '@/components/hooks/projectManagementAlert/useArchiveAlert';
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ProjectManagementDetailAlert } from '@/database/types';
import { AlertColumnHeaders } from '@/lib/constants';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { getAllAlerts } from './Column';
import { ColumnFiltersState, Table } from '@tanstack/react-table';

interface AlertDataTableFilterProps<TData> {
  table: Table<TData>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setDangerLevel: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

export function AlertDataTableFilter<TData>({
  table,
  setColumnFilters,
  setDangerLevel,
  setStatus,
  setType,
}: AlertDataTableFilterProps<TData>) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState('');

  const { allAlerts, setAllAlerts } = useProjectManagementDetailsContext();

  const setFilterValueForSelectedColumns = useCallback(
    (value: string) => {
      setFilterValue(value);
      if (selectedColumns.length === 0) {
        table.setGlobalFilter(value);
      } else {
        const newFilters = selectedColumns.map((columnId) => {
          return { id: columnId, value: value };
        });
        setColumnFilters(newFilters);
      }
    },
    [selectedColumns, table]
  );

  const { handleArchive, handleArchiveAll } = useArchiveAlert(
    getAllAlerts,
    setAllAlerts,
    table
  );

  return (
    <div className="flex flex-wrap gap-4 py-4">
      <div className="flex items-center justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link">Archive</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete the selected alerts. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const selectedRows = table
                    .getSelectedRowModel()
                    .rows.map(
                      (row) => row.original
                    ) as ProjectManagementDetailAlert[];
                  handleArchive(selectedRows);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Separator
          orientation="vertical"
          className="h-1/2 bg-airseed-dark-blue"
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link">Archive All</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete all alerts. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleArchiveAll(allAlerts)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="relative flex items-center gap-4">
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="absolute -top-3 left-5 cursor-pointer">
                <SlidersHorizontalIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {AlertColumnHeaders.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column}
                  checked={selectedColumns.includes(column)}
                  onCheckedChange={(checked: boolean) => {
                    if (checked) {
                      setSelectedColumns((prev) => [...prev, column]);
                    } else {
                      setSelectedColumns((prev) =>
                        prev.filter((col) => col !== column)
                      );
                    }
                  }}
                >
                  {column}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Input
          placeholder="Filter "
          value={filterValue}
          onChange={(event) =>
            setFilterValueForSelectedColumns(event.target.value)
          }
          className="min-w-36 max-w-120 pl-8"
        />
      </div>
      <div className="flex items-center gap-4">
        <Label className="text-nowrap">Danger level:</Label>
        <div className="min-w-36 max-w-120">
          <Select
            defaultValue="All"
            onValueChange={(value) => setDangerLevel(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Label className="text-nowrap">Status:</Label>
        <div className="min-w-36 max-w-120">
          <Select
            defaultValue="New"
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Viewed">Viewed</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Label className="text-nowrap">Type:</Label>
        <div className="min-w-36 max-w-120">
          <Select defaultValue="All" onValueChange={(value) => setType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Carbon">Carbon</SelectItem>
                <SelectItem value="Weather">Weather</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Documentation">Documentation</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
