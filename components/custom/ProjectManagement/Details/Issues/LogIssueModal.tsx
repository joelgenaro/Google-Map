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
import { logIssueType, statusType } from '@/lib/constants';
import { SummaryCard } from '../ProjectStatus/summaryCard';
import { Textarea } from '@/components/ui/textarea';
import DatePickerWithPresets from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { ProjectManagementDetailIssue } from '@/database/types';
import { useProjectManagementDetailsContext } from '@/components/context/ProjectManagementDetailContext';
import { fetchIssues } from '@/lib/api';

interface LogActivityModalProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  projectID: string;
}

export function LogIssueModal({
  open = false,
  setOpen,
  projectID,
}: LogActivityModalProps) {
  const { setAllIssues } = useProjectManagementDetailsContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      issue: '',
      status: '',
      observationDate: '',
      action: '',
      description: '',
    },
  });

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
      reset();
    }
  };

  const handleLogIssue = async (data: ProjectManagementDetailIssue) => {
    try {
      const response = await fetch(
        `/api/project-management/project-details/${projectID}/issue`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      await response.json();
      fetchIssues(setAllIssues, projectID);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: any) => {
    handleLogIssue({
      projectId: projectID,
      issue: data.issue,
      status: data.status,
      date: data.observationDate,
      action: data.action,
      description: data.description,
    });
    handleClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="h-auto max-w-3xl rounded-2xl border-0 p-0 sm:rounded-2xl">
        <AlertDialogTitle hidden>Log Issue</AlertDialogTitle>
        <AlertDialogDescription hidden>Log Issue</AlertDialogDescription>
        <SummaryCard title="Log Issue">
          <form
            className="flex flex-col space-y-6 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full gap-8">
              <div className="flex flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Issue: <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="issue"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full text-left">
                        <SelectValue placeholder="Issue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {logIssueType.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.issue && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
              <div className="flex flex-1 flex-col items-start gap-2">
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
              <div className="flex flex-1 flex-col items-start gap-2">
                <Label className="text-airseed-dark-blue">
                  Observation date: <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="observationDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePickerWithPresets onSelectDate={field.onChange} />
                  )}
                />
                {errors.observationDate && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-airseed-dark-blue">Action:</Label>
              <Controller
                name="action"
                control={control}
                render={({ field }) => (
                  <Input
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="Action"
                    {...field}
                  />
                )}
              />
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
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </SummaryCard>
      </AlertDialogContent>
    </AlertDialog>
  );
}
