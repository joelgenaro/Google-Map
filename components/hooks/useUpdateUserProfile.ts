import { UserProfileInput } from '@/lib/profile-schema';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useUpdateUserProfile = () => {
  const [submitting, setSubmitting] = useState(false);

  const updateProfile = async (values: UserProfileInput) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(values),
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
        } else {
          toast.error(errorData.message);
        }
        return;
      }
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  return { updateProfile, submitting, setSubmitting };
};
