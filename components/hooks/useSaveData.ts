import { useCallback, useState } from 'react';
import { ZodError } from 'zod';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export function useSaveData(schema: any, method: 'POST' | 'PUT') {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const handleSave = useCallback(
    async (route: string, formData: any) => {
      setSubmitting(true);

      try {
        schema.parse(formData);

        // If the validation is successful, save the data
        const res = await fetch(route, {
          method,
          body: JSON.stringify(formData),
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

            return { ok: false, data: null };
          }

          toast.error(errorData.message);
          return { ok: false, data: null };
        }

        return { ok: true, data: await res.json() };
      } catch (error) {
        console.error('An error occurred:', error);
        // If the validation fails, handle the error
        const zodError = error as ZodError;
        console.log(zodError.errors);
      } finally {
        setSubmitting(false);
      }
    },
    [session]
  );

  return { handleSave, submitting };
}
