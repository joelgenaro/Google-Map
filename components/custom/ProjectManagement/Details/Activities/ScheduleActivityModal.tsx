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
import { reportActionType, statusType } from '@/lib/constants';
import { SummaryCard } from '../ProjectStatus/summaryCard';
import { Textarea } from '@/components/ui/textarea';
import DatePickerWithRange from '../../../../ui/date-range-picker';
import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { Controller, useForm } from 'react-hook-form';
import { ProjectManagementDetailActivity } from '@/database/types';
import { fetchActivities } from '@/lib/api';

interface ScheduleActivityModalProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  projectID: string;
}

export function ScheduleActivityModal({
  open = false,
  setOpen,
  projectID,
}: ScheduleActivityModalProps) {
  const { setAllActivities } = useProjectManagementDetailsContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      activity: '',
      status: '',
      fromToDate: '',
      type: 'Schedule',
      description: '',
    },
  });

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
      reset();
    }
  };

  const handleScheduleActivity = async (
    data: ProjectManagementDetailActivity
  ) => {
    try {
      const response = await fetch(
        `/api/project-management/project-details/${projectID}/activity`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      await response.json();
      fetchActivities(setAllActivities, projectID);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: any) => {
    const dates = data.fromToDate.split(' - ');
    const fromDate = dates[0];
    const toDate = dates[1];

    handleScheduleActivity({
      projectId: projectID,
      activity: data.activity,
      status: data.status,
      fromDate: fromDate,
      toDate: toDate,
      type: data.type,
      description: data.description,
    });

    handleClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="h-auto max-w-120 rounded-2xl border-0 p-0 sm:rounded-2xl md:max-w-2xl lg:max-w-3xl">
        <AlertDialogTitle hidden>Schedule Activity</AlertDialogTitle>
        <AlertDialogDescription hidden>Schedule Activity</AlertDialogDescription>
        <SummaryCard title="Schedule Activity">
          <form
            className="flex flex-col space-y-2 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full flex-col gap-2 md:flex-row md:gap-8">
              <div className="flex max-w-[300px] flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Activity: <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="activity"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full text-left">
                        <SelectValue placeholder="Activity type" />
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
                {errors.activity && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
              <div className="flex max-w-[300px] flex-1 flex-col items-start gap-2">
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
                          {statusType.map((item) => (
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
              <div className="flex max-w-[300px] flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Schedule window (From, To):{' '}
                  <span className="text-red-600">*</span>
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
                render={({ field }) => (
                  <Textarea
                    rows={10}
                    placeholder="Type your message here."
                    {...field}
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
