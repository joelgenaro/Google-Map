'use client';

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import {
  plantColumns,
  plotColumns,
} from '@/components/custom/ProjectManagement/Details/Monitoring/Columns';
import { MonitoringDataModal } from '@/components/custom/ProjectManagement/Details/Monitoring/MonitoringDataModal';
import { MonitoringDataTable } from '@/components/custom/ProjectManagement/Details/Monitoring/MonitoringDataTable';
import { TableControls } from '@/components/custom/ProjectManagement/Details/Monitoring/TableControls';
import { fetchMonitoringDataList } from '@/lib/api';
import { DataType, TableColumn, TableData } from '@/lib/types/table-data.type';
import { exportTableToCSV } from '@/lib/utils/export-csv';
import { Table } from '@tanstack/react-table';
import toast from 'react-hot-toast';

export default function MonitoringDataPage({
  params,
}: {
  params: { projectID: string };
}) {
  const {
    selectedMonitoringData,
    fetchMonitoringDataListLoading,
    fetchMonitoringDataLoading,
    setMonitoringDataList,
    setFetchMonitoringDataListLoading,
  } = useProjectManagementDetailsContext();
  const [currentColumn, setCurrentColumn] = useState<DataType>('plot');
  const [open, setOpen] = useState(false);
  const [operation, setOperation] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMonitoringDataList(setMonitoringDataList, params.projectID);
      } catch (error) {
        toast.error('Failed to fetch monitoring data list');
        console.error('Failed to fetch monitoring data list', error);
      } finally {
        setFetchMonitoringDataListLoading(false);
      }
    };
    fetchData();
  }, [
    params.projectID,
    setMonitoringDataList,
    setFetchMonitoringDataListLoading,
  ]);

  const currentData = useMemo(() => {
    if (!selectedMonitoringData) return [];
    return currentColumn === 'plot'
      ? selectedMonitoringData.plots
      : selectedMonitoringData.plants;
  }, [selectedMonitoringData, currentColumn]);

  const columns = useMemo(() => {
    const cols = currentColumn === 'plot' ? plotColumns : plantColumns;
    return cols as TableColumn[];
  }, [currentColumn]);

  const currentTableRef = useRef<Table<TableData>>();
  const handleTableRef = (newValue: Table<TableData>) => {
    currentTableRef.current = newValue;
  };

  const handleColumnChange = (column: DataType) => {
    setCurrentColumn(column);
  };

  const handleNewData = useCallback(() => {
    setOpen(true);
    setOperation('Add');
  }, []);

  const handleEditData = useCallback(() => {
    if (!selectedMonitoringData) {
      toast.error('Please select a monitoring data to edit');
    } else {
      setOpen(true);
      setOperation('Edit');
    }
  }, [selectedMonitoringData]);

  const handleDownload = useCallback(() => {
    if (!selectedMonitoringData) {
      toast.error('Please select a monitoring data to download');
    } else {
      exportTableToCSV(currentTableRef.current as Table<TableData>, {
        filename:
          selectedMonitoringData?.datasetName + '-' + currentColumn ||
          'monitoring-data',
        type: currentColumn,
      });
    }

  }, [currentColumn, selectedMonitoringData]);

  return (
    <div className="w-full">
      <TableControls
        onColumnChange={handleColumnChange}
        onNewData={handleNewData}
        onEditData={handleEditData}
        onDownload={handleDownload}
        isLoading={fetchMonitoringDataListLoading}
        projectID={params.projectID}
      />
      <MonitoringDataTable
        columns={columns}
        data={currentData}
        isloading={fetchMonitoringDataLoading}
        handleTableRef={handleTableRef}
      />
      <MonitoringDataModal
        open={open}
        setOpen={setOpen}
        operation={operation}
        projectID={params.projectID}
      />
    </div>
  );
}
