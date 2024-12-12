import { UserProfile } from '@/database/types';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  // Use useRef to keep track of the current user ID
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    const currentUserId = session?.user?.id;
    // Proceed with fetching only if the user ID has changed
    if (currentUserId && currentUserId !== userIdRef.current) {
      // Update the ref to the current user ID
      userIdRef.current = currentUserId;
      const fetchProfile = async () => {
        try {
          const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            toast.error(
              `HTTP error! status: ${response.statusText || response.status}`
            );
          }
          const data: UserProfile = await response.json();
          setUserProfile(data);
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : 'An unknown error occurred';
          setError(errorMessage);
          toast.error(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfile();
    }
  }, [session]);

  return { userProfile, isLoading, error };
};

export default useUserProfile;
