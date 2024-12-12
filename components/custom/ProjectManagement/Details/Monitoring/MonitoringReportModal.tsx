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
import {
  reportActionType,
  reportMethodType,
  reportStatusType,
} from '@/lib/constants';
import { SummaryCard } from '../ProjectStatus/summaryCard';
import { Textarea } from '@/components/ui/textarea';
import DatePickerWithRange from '../../../../ui/date-range-picker';
import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { Controller, useForm } from 'react-hook-form';
import { ProjectManagementMonitoringReport } from '@/database/types';
import { fetchProjectManagementReport } from '@/lib/api';
import { Input } from '@/components/ui/input';

interface MonitoringReportModalProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  projectID: string;
}

export function MonitoringReportModal({
  open = false,
  setOpen,
  projectID,
}: MonitoringReportModalProps) {
  const { setAllReports } = useProjectManagementDetailsContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fromToDate: '',
      projectName: '',
      method: '',
      report: '',
      status: '',
      description: '',
    },
  });

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
      reset();
    }
  };

  const handleRequestReport = async (
    data: ProjectManagementMonitoringReport
  ) => {
    try {
      const response = await fetch(
        `/api/project-management/project-details/${projectID}/monitoring/report`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      await response.json();
      fetchProjectManagementReport(setAllReports, projectID);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: any) => {
    const dates = data.fromToDate.split(' - ');
    const fromDate = dates[0];
    const toDate = dates[1];

    handleRequestReport({
      projectId: projectID,
      projectName: data.projectName,
      report: data.report,
      status: data.status,
      fromDate: fromDate,
      toDate: toDate,
      method: data.method,
    });

    handleClose();
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="h-auto max-w-96 rounded-2xl border-0 p-0 sm:max-w-120 sm:rounded-2xl md:max-w-2xl lg:max-w-3xl">
        <AlertDialogTitle hidden>Request Report</AlertDialogTitle>
        <AlertDialogDescription hidden>Request Report</AlertDialogDescription>
        <SummaryCard title="Request Report">
          <form
            className="flex flex-col space-y-4 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full flex-col flex-wrap gap-2 md:flex-row md:gap-4">
              <div className="flex min-w-48 max-w-[300px] flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Report: <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="report"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full text-left">
                        <SelectValue placeholder="Report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {reportActionType.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.report && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
              <div className="flex min-w-48 max-w-[300px] flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Project: <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="projectName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      placeholder="Project name"
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.projectName && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
              <div className="flex min-w-48 max-w-[300px] flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Method: <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="method"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full text-left">
                        <SelectValue placeholder="Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {reportMethodType.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.method && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
              <div className="flex min-w-48 max-w-[300px] flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Status: <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full text-left">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {reportStatusType.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
              <div className="flex min-w-48 max-w-[300px] flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Required by: <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="fromToDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePickerWithRange
                      defaultValue="Jan 10, 2024 - Feb 25, 2024"
                      onDateRangeChange={field.onChange}
                    />
                  )}
                />
                {errors.fromToDate && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-start gap-2">
              <Label className="text-airseed-dark-blue">Description</Label>
              <Controller
                name="description"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Textarea
                    rows={10}
                    placeholder="Type your message here."
                    onChange={field.onChange}
                  />
                )}
              />
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
                Schedule
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </SummaryCard>
      </AlertDialogContent>
    </AlertDialog>
  );
}
