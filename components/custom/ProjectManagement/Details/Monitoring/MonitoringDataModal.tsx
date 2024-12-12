'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { monitoringTiming } from '@/lib/constants';
import { SummaryCard } from '../ProjectStatus/summaryCard';
import { Input } from '@/components/ui/input';
import DatePickerWithPresets from '@/components/ui/datepicker';
import DownloadLink from './SampleFileDownloader';
import ReadableFileUploader from './ReadableFileUploader';
import { FileQuestion, NotepadText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Controller, useForm } from 'react-hook-form';
import {
  InsertMonitoringDataWithPlotsAndPlants,
  ProjectManagementMonitoringPlot,
  ProjectManagementMonitoringPlant,
} from '@/database/types';
import { fetchMonitoringData, fetchMonitoringDataList } from '@/lib/api';
import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { convertToTableFormat } from '@/lib/utils/convert-csv-to-datatable';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface MonitoringDataModalProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  operation?: string | null;
  projectID: string;
}

export function MonitoringDataModal({
  open = false,
  setOpen,
  operation,
  projectID,
}: MonitoringDataModalProps) {
  const [plants, setPlants] = useState<ProjectManagementMonitoringPlant[]>([]);
  const [plots, setPlots] = useState<ProjectManagementMonitoringPlot[]>([]);
  const {
    projectManagementData,
    selectedMonitoringData,
    setSelectedMonitoringData,
    setMonitoringDataList,
    setFetchMonitoringDataLoading
  } = useProjectManagementDetailsContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      datasetName: '',
      dataCollectionDate: new Date(),
      monitoringTiming: '',
    },
  });

  useEffect(() => {
    if (operation === 'Edit' && selectedMonitoringData) {
      setValue('datasetName', selectedMonitoringData.datasetName);
      setValue('dataCollectionDate', selectedMonitoringData.dataCollectionDate);
      setValue('monitoringTiming', selectedMonitoringData.monitoringTiming);
    } else {
      reset();
    }
  }, [selectedMonitoringData, setValue, operation]);

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
      if (operation === 'Add') {
        reset();
      }
    }
  };

  const handleMonitoringData = async (
    data: InsertMonitoringDataWithPlotsAndPlants
  ) => {
    try {
      const method = operation === 'Add' ? 'POST' : 'PATCH';
      const fetchUrl =
        operation === 'Add'
          ? `/api/project-management/project-details/${projectID}/monitoring/data`
          : `/api/project-management/project-details/${projectID}/monitoring/data/${selectedMonitoringData?.id}`;

      const response = await fetch(fetchUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      await response.json();
      fetchMonitoringDataList(setMonitoringDataList, projectID);
      if (selectedMonitoringData) {
        fetchMonitoringData(setSelectedMonitoringData, setFetchMonitoringDataLoading, projectID, selectedMonitoringData.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (formData: any) => {
    const { datasetName, dataCollectionDate, monitoringTiming } = formData;

    const monitoringData = {
      projectId: projectID,
      datasetName,
      dataCollectionDate,
      monitoringTiming,
      plots,
      plants,
    };

    if (operation === 'Add' && plants.length === 0 && plots.length === 0) {
      toast.error('Please upload a file');
      return;
    }

    handleMonitoringData(monitoringData);
    handleClose();
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="h-auto max-w-3xl rounded-2xl border-0 p-0 sm:rounded-2xl">
        <AlertDialogTitle hidden>Monitoring Data</AlertDialogTitle>
        <AlertDialogDescription hidden>Monitoring Data</AlertDialogDescription>
        <SummaryCard title={`${operation} monitoring data`}>
          <form
            className="flex flex-col space-y-2 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label className="text-base font-semibold text-airseed-dark-blue">
              {operation} new monitoring data for{' '}
              {projectManagementData?.projectName}:
            </Label>
            <div className="flex w-full gap-8">
              <div className="flex flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">Dataset name:</Label>
                <Controller
                  name="datasetName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter dataset name"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
                {errors.datasetName && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
              <div className="flex flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Data of data collection{' '}
                  <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="dataCollectionDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePickerWithPresets
                      onSelectDate={field.onChange}
                      selectedDate={field.value}
                    />
                  )}
                />
                {errors.dataCollectionDate && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-start gap-2 pr-4">
              <Label className="text-airseed-dark-blue">
                Monitoring timing:
              </Label>
              <Controller
                name="monitoringTiming"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-left">
                      <SelectValue placeholder="Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {monitoringTiming.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.monitoringTiming && (
                <p className="text-sm text-red-600">This field is required</p>
              )}
            </div>
            <Separator className="!my-4 bg-airseed-dark-blue" />
            <div className="flex justify-between gap-4">
              <div className="flex flex-1 flex-col gap-4">
                <DownloadLink
                  filename="plot_data_template.csv"
                  className="flex-1"
                />
                <ReadableFileUploader
                  onFileUpload={(data) => {
                    if (data) {
                      const { plants, plots } = convertToTableFormat(data);
                      setPlants(plants);
                      setPlots(plots);
                    } else {
                      setPlants([]);
                      setPlots([]);
                    }
                  }}
                  className="flex-1"
                />
              </div>
              <p className="content-center text-center">Or</p>
              <div className="flex w-full flex-1 flex-col justify-center">
                <div className="flex w-full items-center justify-between rounded-xl border-2 border-gray-200 bg-gray-200 p-4 text-sm transition-all hover:border-blue-500">
                  <div className="flex items-center gap-4">
                    <FileQuestion className="text-gray-700" />
                    <p>Infill monitoring data template</p>
                  </div>
                  <NotepadText className="text-gray-700" />
                </div>
              </div>
            </div>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel
                type="button"
                onClick={handleClose}
                className="min-w-24"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction type="submit" className="min-w-24">
                {operation}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </SummaryCard>
      </AlertDialogContent>
    </AlertDialog>
  );
}
