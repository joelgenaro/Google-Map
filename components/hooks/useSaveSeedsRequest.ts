import { env } from '@/env';
import { SeedRequestEmailContext } from '@/lib/types/email.type';
import { format } from 'date-fns';
import { FeatureCollection } from 'geojson';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ActionType } from '../custom/SeedsNearMe/Common/Constants';
import { SeedSpeciesData } from './useSeedsSpeciesData';

export interface SeedsRequestInput {
  // Data below are used for the database model
  id: string | null;
  createdBy: string;
  updatedBy: string | null;
  updatedAt: Date | null;
  projectId: string | null;
  requiredDate: Date | undefined;
  seedTreatment: boolean;
  seedViability: boolean;
  seedProvenance: boolean;
  seedsSpecies: SeedSpeciesData[];
  geoJsonData: FeatureCollection | null;
  // Data below are used for the hook only, not for the database model
  email: string;
  projectName: string;
}

interface ErrorResponse {
  message: string;
  errors?: { message: string }[];
}

export const useSaveSeedsRequest = () => {
  const [submitting, setSubmitting] = useState(false);

  const saveSeedsRequest = async (
    data: SeedsRequestInput,
    action: ActionType
  ) => {
    setSubmitting(true);

    // Prepare the request data to be sent to the server
    const { id, email, projectName, ...requestData } = {
      ...data,
      requiredDate: data.requiredDate
        ? format(data.requiredDate, 'yyyy-MM-dd')
        : format(new Date(), 'yyyy-MM-dd'),
      seedsSpecies: data.seedsSpecies.filter(
        (seed) => seed.selected && seed.quantity > 0
      ),
      status: 'REQUESTED',
    };

    const requestOptions: RequestInit = {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    };

    const handleErrors = (errorData: ErrorResponse) => {
      if (errorData.errors && errorData.errors.length > 0) {
        errorData.errors.forEach((error) => {
          toast.error(error.message);
        });
      } else {
        toast.error(errorData.message);
      }
    };

    try {
      const actionMsg = action === 'CREATE' ? 'created' : 'updated';
      const url =
        action === 'CREATE' ? '/api/seeds-near-me' : `/api/seeds-near-me/${id}`;
      const method = action === 'CREATE' ? 'POST' : 'PUT';

      const res = await fetch(url, { ...requestOptions, method });

      const resJson = await res.json();

      if (!res.ok) {
        handleErrors(resJson);
        return;
      }

      if (resJson.id && action === 'CREATE') {
        // If creating/updating is successful, send an email
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: email,
              subject: `[AirSeed Technologies] Seed Request Created: ${resJson.id}`,
              template: {
                name: 'seed-request',
                context: {
                  requestId: resJson.id,
                  requestedBy: requestData.createdBy,
                  projectName,
                  dateRequested: format(new Date(), 'EEE MMM dd, yyyy'),
                  seedsRequiredDate: format(
                    requestData.requiredDate,
                    'EEE MMM dd, yyyy'
                  ),
                  seedTreatment: requestData.seedTreatment ? 'Yes' : 'No',
                  seedViability: requestData.seedViability ? 'Yes' : 'No',
                  seedProvenance: requestData.seedProvenance ? 'Yes' : 'No',
                  seedsSpecies: requestData.seedsSpecies.slice(0, 10),
                  appUrl: env.NEXT_PUBLIC_NATUR_APP_ECS_URL,
                  hasFootNote: requestData.seedsSpecies.length > 10,
                } as SeedRequestEmailContext,
              },
            }),
          });
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }
      }

      toast.success(`Seed request ${actionMsg} successfully!`);
      return resJson;
    } catch (error: unknown) {
      toast.error((error as Error).message || `Failed to process seed request`);
    } finally {
      setSubmitting(false);
    }
  };

  return { saveSeedsRequest, submitting };
};
