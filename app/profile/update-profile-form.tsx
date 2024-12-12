'use client';

import { useUpdateUserProfile } from '@/components/hooks/useUpdateUserProfile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ImageUploader } from '@/components/ui/image-uploader';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserProfile } from '@/database/types';
import { profileType, registerReason, userType } from '@/lib/constants';
import { UserProfileInput, userProfileSchema } from '@/lib/profile-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface UpdateProfileFormProps {
  userProfile: UserProfile;
  profileImgUrl: string | null;
}

export const UpdateProfileForm = ({
  userProfile,
  profileImgUrl,
}: UpdateProfileFormProps) => {
  const { updateProfile, submitting, setSubmitting } = useUpdateUserProfile();
  const [profilePicImg, setProfilePicImg] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserProfileInput>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: userProfile || {},
  });

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
    }
  }, [userProfile, reset]);

  const handleProfilePicImgSelected = (file: File) => {
    setProfilePicImg(file);
  };

  const handleFileUpload = async (file: File): Promise<Response> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userProfile?.user?.id || '');
    return fetch('/api/profile/image/upload', {
      method: 'POST',
      body: formData,
    });
  };

  const onSubmit = async (formValues: UserProfileInput) => {
    setSubmitting(true);
    let uploadResult = null;
    if (profilePicImg) {
      setUploadingImage(true);
      try {
        // Await the handleFileUpload to resolve
        const uploadResponse = await handleFileUpload(profilePicImg);
        // Assuming handleFileUpload returns the fetch Response object,
        // We need to await the resolution of the .json() promise to get the actual response body
        uploadResult = await uploadResponse.json();
      } catch (error) {
        console.error('Error during the file upload or profile update:', error);
        toast.error(`Error during the file upload or profile update: ${error}`);
      } finally {
        setUploadingImage(false);
      }
    }
    // Include the image filename in the profile update
    const updatedProfileInfo: UserProfileInput = {
      user: {
        ...formValues.user,
        // Only update the image if a new image was uploaded
        image:
          uploadResult && uploadResult.profileImgFilename
            ? uploadResult.profileImgFilename
            : formValues.user.image,
      },
      profile: { ...formValues.profile },
    };
    await updateProfile(updatedProfileInfo);
    // // If everything went well, close the dialog or indicate success
    setTimeout(() => window.location.reload(), 750);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn">Update Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Your Profile</DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          <ImageUploader
            onFileSelect={handleProfilePicImgSelected}
            uploading={uploadingImage}
            initialPreviewUrl={profileImgUrl || ''}
          />
          {errors.user?.image && (
            <p className="text-sm text-red-600">{errors.user?.image.message}</p>
          )}
          <div className="flex justify-between items-center gap-4">
            <Label className="text-airseed-dark-blue font-semibold">
              Are you an individual or business?
            </Label>
            <Controller
              control={control}
              defaultValue={userProfile?.profile.profileType || ''}
              disabled={submitting}
              name="profile.profileType"
              render={({ field }) => (
                <Select
                  value={field.value || ''}
                  onValueChange={field.onChange}
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
          <div className="flex justify-between items-center gap-4">
            <Label className="text-airseed-dark-blue font-semibold">
              User Type
            </Label>
            <Controller
              control={control}
              defaultValue={userProfile?.profile.userType || ''}
              disabled={submitting}
              name="profile.userType"
              render={({ field }) => (
                <Select
                  defaultValue={field.value}
                  value={field.value || ''}
                  onValueChange={field.onChange}
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
            <Label className="text-airseed-dark-blue font-semibold">
              How much experience do you have with the carbon market?
            </Label>
            <div className="flex justify-between items-center">
              <Label className="text-airseed-dark-blue font-semibold">
                New
              </Label>
              <Controller
                control={control}
                disabled={submitting}
                name="profile.experienceLevel"
                render={({ field }) => (
                  <div className="flex gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((level, index, array) => (
                      <Fragment key={level}>
                        <button
                          type="button"
                          className={`h-6 w-6 rounded-full text-white text-sm ${
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
              <Label className="text-airseed-dark-blue font-semibold">
                Experienced
              </Label>
            </div>
          </div>
          {errors.profile?.experienceLevel && (
            <p className="text-sm text-red-600">
              {errors.profile.experienceLevel.message}
            </p>
          )}
          <div className="flex justify-between items-center gap-4">
            <Label className="text-airseed-dark-blue font-semibold">
              What brought you to Natur?
            </Label>
            <Controller
              control={control}
              defaultValue={userProfile?.profile.registerReason || ''}
              disabled={submitting}
              name="profile.registerReason"
              render={({ field }) => (
                <Select
                  defaultValue={field.value}
                  value={field.value || ''}
                  onValueChange={field.onChange}
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
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Update'
            )}
          </Button>
        </form>
        <DialogClose asChild>
          <button className="close-btn">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
