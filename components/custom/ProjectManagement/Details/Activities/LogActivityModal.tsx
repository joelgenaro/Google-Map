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
import DatePickerWithPresets from '@/components/ui/datepicker';
import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { Controller, useForm } from 'react-hook-form';
import { ProjectManagementDetailActivity } from '@/database/types';
import { fetchActivities } from '@/lib/api';

interface LogActivityModalProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  projectID: string;
}

export function LogActivityModal({
  open = false,
  setOpen,
  projectID,
}: LogActivityModalProps) {
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
      date: '',
      type: 'Log',
      description: '',
    },
  });

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
      reset();
    }
  };

  const handleLogActivity = async (data: ProjectManagementDetailActivity) => {
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
    handleLogActivity({
      projectId: projectID,
      activity: data.activity,
      status: data.status,
      date: data.date,
      type: data.type,
      description: data.description,
    });
    handleClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="h-auto max-w-120 rounded-2xl border-0 p-0 sm:rounded-2xl md:max-w-2xl lg:max-w-3xl">
        <AlertDialogTitle hidden>Log Activity</AlertDialogTitle>
        <AlertDialogDescription hidden>Log Activity</AlertDialogDescription>
        <SummaryCard title="Log Activity">
          <form
            className="flex flex-col space-y-2 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full flex-col gap-2 md:flex-row md:gap-8">
              <div className="flex max-w-[280px] flex-1 flex-col items-start gap-2">
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
                {errors.status && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
              <div className="flex max-w-[280px] flex-1 flex-col items-start gap-2">
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
                {errors.activity && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
              <div className="flex w-full flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Observation date: <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePickerWithPresets onSelectDate={field.onChange} />
                  )}
                />
                {errors.date && (
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
                Log
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </SummaryCard>
      </AlertDialogContent>
    </AlertDialog>
  );
}
