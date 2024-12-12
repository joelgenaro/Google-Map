import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { IconButton } from './IconButton';
import { DownloadCloudIcon, PencilIcon, UploadCloudIcon } from 'lucide-react';
import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { fetchMonitoringData } from '@/lib/api';
import { formatDateWithMonthAndYear } from '@/lib/helper';

interface TableControlsProps {
  onColumnChange: (columnValue: ColumnOption) => void;
  onNewData: () => void;
  onEditData: () => void;
  onDownload: () => void;
  isLoading: boolean;
  projectID: string;
}

type ColumnOption = 'plot' | 'plant';

export const TableControls: React.FC<TableControlsProps> = ({
  onColumnChange,
  onNewData,
  onEditData,
  onDownload,
  isLoading,
  projectID,
}) => {
  const [columnValue, setColumnValue] = useState<ColumnOption>('plot');
  const {
    selectedMonitoringData,
    MonitoringDataList,
    setFetchMonitoringDataLoading,
    setSelectedMonitoringData,
  } = useProjectManagementDetailsContext();

  const columnOptions: Record<ColumnOption, string> = {
    plot: 'Plot',
    plant: 'Plant',
  };

  const handleMonitoringDataChange = (value: string) => {
    fetchMonitoringData(
      setSelectedMonitoringData,
      setFetchMonitoringDataLoading,
      projectID,
      value
    );
  };

  const getSelectDisplayText = () => {
    if (!isLoading && MonitoringDataList) {
      return selectedMonitoringData
        ? `${selectedMonitoringData.monitoringTiming} (${formatDateWithMonthAndYear(new Date(selectedMonitoringData.dataCollectionDate))})`
        : 'Select Monitoring Data';
    }
    return 'No Monitoring Data';
  };

  return (
    <div className="flex items-center justify-between gap-8 py-4">
      <div className="flex gap-2">
        <IconButton
          variant="outline"
          size="auto"
          Icon={UploadCloudIcon}
          onClick={onNewData}
        >
          New Data
        </IconButton>
        <IconButton
          variant="outline"
          size="auto"
          Icon={PencilIcon}
          onClick={onEditData}
        >
          Edit Data
        </IconButton>
        <IconButton
          variant="outline"
          size="auto"
          Icon={DownloadCloudIcon}
          onClick={onDownload}
        >
          Download
        </IconButton>
      </div>
      <div className="flex flex-1 items-center gap-2">
        <Label className="text-nowrap">Monitoring period:</Label>
        <Select onValueChange={handleMonitoringDataChange}>
          <SelectTrigger>
            <SelectValue placeholder={getSelectDisplayText()} />
          </SelectTrigger>
          {!isLoading && MonitoringDataList && (
            <SelectContent>
              {MonitoringDataList?.map((data) => (
                <SelectItem key={data.id} value={data.id}>
                  {data.monitoringTiming +
                    ` (${formatDateWithMonthAndYear(data.dataCollectionDate)})`}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      </div>
      <div className="flex flex-1 items-center gap-2">
        <Label>Data:</Label>
        <Select
          onValueChange={(value) => {
            setColumnValue(value as ColumnOption);
            onColumnChange(value as ColumnOption);
          }}
        >
          <SelectTrigger>{columnOptions[columnValue]}</SelectTrigger>
          <SelectContent>
            <SelectItem value="plot">Plot</SelectItem>
            <SelectItem value="plant">Plant</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
