'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { profileType, registerReason, userType } from '@/lib/constants';
import { UserProfileInput, userProfileSchema } from '@/lib/profile-schema';
import { areAllPropsBlank } from '@/lib/utils/are-all-props-blank';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useUserProfile from '../hooks/useUserProfile';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function ProfileDialog() {
  const { data, status } = useSession();
  const [open, setOpen] = useState(false);
  const { userProfile, isLoading, error } = useUserProfile();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserProfileInput>({
    resolver: zodResolver(userProfileSchema),
  });

  useEffect(() => {
    // Only attempt to set the dialog state when not loading and there are no errors
    if (!isLoading && !error) {
      // Open the dialog only if the user is authenticated and no userProfile exists
      if (
        status === 'authenticated' &&
        areAllPropsBlank(userProfile?.profile)
      ) {
        setValue('user.email', data?.user?.email || '');
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [status, userProfile, isLoading, error]);

  const onSubmit = async (data: UserProfileInput) => {
    // Save the data to the database
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();

        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          errorData.errors.forEach((error: any) => {
            toast.error(error.message);
          });

          return;
        }

        toast.error(errorData.message);
        return;
      }

      const response = await res.json();

      toast.success('Profile Saved Successfully');

      if (status === 'authenticated') {
        setOpen(!(Object.keys(response?.profileData ?? {}).length > 0));
      }
    } catch (error) {
      console.error('An error occurred while saving the profile:', error);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="h-auto max-w-xl px-16 py-24">
        <form
          className="flex flex-col space-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between gap-4">
            <Label className="font-semibold text-airseed-dark-blue">
              Are you an individual or business?
            </Label>
            <Controller
              control={control}
              name="profile.profileType"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value: string) => field.onChange(value)}
                >
                  <SelectTrigger className="w-44 text-left">
                    <SelectValue placeholder="Please Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {profileType.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.profile?.profileType && (
            <p className="text-sm text-red-600">
              {errors.profile?.profileType.message}
            </p>
          )}
          <div className="flex items-center justify-between gap-4">
            <Label className="font-semibold text-airseed-dark-blue">
              User Type
            </Label>
            <Controller
              control={control}
              name="profile.userType"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value: string) => field.onChange(value)}
                >
                  <SelectTrigger className="w-44 text-left">
                    <SelectValue placeholder="Please Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userType.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.profile?.userType && (
            <p className="text-sm text-red-600">
              {errors.profile?.userType.message}
            </p>
          )}
          <div className="flex flex-col">
            <Label className="font-semibold text-airseed-dark-blue">
              How much experience do you have with the carbon market?
            </Label>
            <div className="flex items-center justify-between">
              <Label className="font-semibold text-airseed-dark-blue">
                New
              </Label>
              <Controller
                control={control}
                name="profile.experienceLevel"
                render={({ field }) => (
                  <div className="flex gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((level, index, array) => (
                      <Fragment key={level}>
                        <button
                          type="button"
                          className={`h-6 w-6 rounded-full text-sm text-white ${
                            field.value === level
                              ? 'bg-blue-500'
                              : 'bg-gray-500'
                          }`}
                          onClick={() => field.onChange(level)}
                        >
                          {level}
                        </button>
                        {index < array.length - 1 && (
                          <span className="mx-1">-</span>
                        )}
                      </Fragment>
                    ))}
                  </div>
                )}
              />
              <Label className="font-semibold text-airseed-dark-blue">
                Experienced
              </Label>
            </div>
          </div>
          {errors.profile?.experienceLevel && (
            <p className="text-sm text-red-600">
              {errors.profile?.experienceLevel.message}
            </p>
          )}
          <div className="flex items-center justify-between gap-4">
            <Label className="font-semibold text-airseed-dark-blue">
              What brought you to Natur?
            </Label>
            <Controller
              control={control}
              name="profile.registerReason"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value: string) => field.onChange(value)}
                >
                  <SelectTrigger className="w-44 text-left">
                    <SelectValue placeholder="Please Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {registerReason.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.profile?.registerReason && (
            <p className="text-sm text-red-600">
              {errors.profile?.registerReason.message}
            </p>
          )}
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel type="submit">Continue</AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
