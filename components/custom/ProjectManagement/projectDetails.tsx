'use client';

import NavigationButtons from '@/components/custom/ProjectManagement/general/navigationButtons';
import { useSaveData } from '@/components/hooks/useSaveData';
import { Input } from '@/components/ui/input';
import { projectManagementSchema } from '@/lib/project-management-schema';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Control, useForm } from 'react-hook-form';

interface FormData {
  projectName: string;
  landholderName: string;
  address: string;
}

interface SearchBoxInputProps {
  control: Control<FormData>;
  name: "projectName" | "landholderName" | "address";
}

const DynamicSearchBoxInput = dynamic<SearchBoxInputProps>(
  () => import('@/components/custom/searchBoxInput').then(mod => ({ default: mod.SearchBoxInput })),
  { ssr: false }
);

export default function ProjectDetailsPage() {
  const [action, setAction] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const { data: session } = useSession();
  const { handleSave, submitting } = useSaveData(
    projectManagementSchema,
    'POST'
  );

  const onSubmitSaveAndExit = async () => {
    const data = getValues();
    const formData = {
      userId: session?.user?.id,
      ...data,
    };

    // Save data to database
    const result = await handleSave(
      '/api/project-management/environmental-planting/project-details',
      formData
    );
    if (result && result.ok && result.data) {
      router.push(`/`);
    }
  };

  const onSubmitSaveAndContinue = async () => {
    const data = getValues();
    const formData = {
      userId: session?.user?.id,
      ...data,
    };
    // Save data to database
    const result = await handleSave(
      '/api/project-management/environmental-planting/project-details',
      formData
    );
    if (result && result.ok && result.data) {
      router.push(
        `/project-management/environmental-planting/${result.data.projectID}/registration-documents`
      );
    }
  };

  const onSubmit = useCallback(async () => {
    if (action === 'exit') {
      await onSubmitSaveAndExit();
    } else {
      await onSubmitSaveAndContinue();
    }
  }, [action, onSubmitSaveAndExit, onSubmitSaveAndContinue]);

  return (
    <form
      className="flex h-[calc(100vh-7rem)] w-full flex-col px-12 pb-8 lg:h-[calc(100vh-8rem)]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="mt-8 text-3xl sm:text-2xl">Project details</h2>
      <div className="flex flex-1 flex-col gap-4 px-8 py-16">
        <div>
          <Input
            {...register('projectName', { required: true })}
            className="max-w-120"
            placeholder="Project name"
          />
          {errors.projectName && (
            <span className="text-sm text-destructive mt-2 block">
              This field is required
            </span>
          )}
        </div>
        <div>
          <Input
            {...register('landholderName', { required: true })}
            className="max-w-120"
            placeholder="Landholder name"
          />
          {errors.landholderName && (
            <span className="text-sm text-destructive mt-2 block">
              This field is required
            </span>
          )}
        </div>
        <div>
          <DynamicSearchBoxInput control={control} name="address"  />
          {errors.address && (
            <span className="text-sm text-destructive mt-2 block">
              This field is required
            </span>
          )}
        </div>
      </div>
      <NavigationButtons submitting={submitting}  onSubmitSaveAndContinue={() => setAction('continue')} onSubmitSaveAndExit={() => setAction('exit')} />
    </form>
  );
}
