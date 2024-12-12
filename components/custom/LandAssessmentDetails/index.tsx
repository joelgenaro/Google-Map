'use client';

import { TriangleAlert } from 'lucide-react';

import useCountdown from '@/components/hooks/useCountdown';
import { useLandAssessmentDetails } from '@/components/hooks/useLandAssessmentDetails';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LandAssessmentProjectFull } from '@/database/types';
import { useCallback, useState } from 'react';
import ClimateGraphs from './ClimateGraphs';
import ClimateRisks from './ClimateRisks';
import ProjectActionsCard from './ProjectActionsCard';
import ProjectDetailsCard from './ProjectDetailsCard';
import ProjectPreviewMap from './ProjectPreviewMap';
import SkeletonLoader from './SkeletonLoader';
import { GeojsonFilesPromises } from '@/lib/types/email.type';
import { useSession } from 'next-auth/react';
import { env } from '@/env';
import { downloadURI } from '@/lib/utils/download-uri';

interface LandAssessmentDetailsProps {
  projectData: LandAssessmentProjectFull;
}

const LandAssessmentDetails = ({ projectData }: LandAssessmentDetailsProps) => {
  const {
    isLoading,
    isUsingMockData,
    projectDetails,
    climateGraphData,
    climateRiskData,
  } = useLandAssessmentDetails({ projectData });
  const [isRequesting, setIsRequesting] = useState(false);
  const { data: session } = useSession();

  const handleCountdownEnd = useCallback(() => {
    window.location.reload();
  }, []);

  const countdownSeconds = useCountdown(
    30,
    isUsingMockData,
    handleCountdownEnd
  );

  const handleEdit = () => {
    console.log('Edit action triggered');
  };

  const handleDelete = () => {
    console.log('Delete action triggered');
  };

  const handleRegister = useCallback(async () => {
    console.log('Add New action triggered');
    if (!session?.user?.email) return;
    const projectUUID = projectData.id;

    setIsRequesting(true);

    try {
      const checkResponse = await fetch(
        `/api/land-assessment/${projectUUID}/check-report`
      );
      const { available, url } = await checkResponse.json();

      if (available) {
        downloadURI(url, `${projectUUID}-report.pdf`);
      } else {
        try {
          await fetch(
            `/api/land-assessment/${projectUUID}/send-request-email`,
            {
              method: 'POST',
            }
          );
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }
      }
    } catch (error) {
      console.error('Failed to fetch geojson files:', error);
    } finally {
      setIsRequesting(false);
    }
  }, [session?.user?.email, projectData.id]);

  return (
    <>
      {isLoading && <SkeletonLoader />}
      {isUsingMockData && (
        <Alert className="mb-4" variant="default">
          <AlertDescription className="flex items-center">
            <div className="mr-2 h-6 w-6">
              <TriangleAlert />
            </div>
            <span className="text-lg font-semibold">
              Currently using mock data, background process is still in
              progress, it usually takes about 10 seconds to complete, this page
              will refresh in {countdownSeconds} seconds
            </span>
          </AlertDescription>
        </Alert>
      )}
      {!isLoading && projectDetails && (
        <div className="flex flex-col gap-4">
          <div className="flex min-h-60 flex-col items-start justify-center gap-4 lg:flex-row">
            <ProjectActionsCard
              onRegister={handleRegister}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isRequesting}
            />
            <ProjectDetailsCard {...projectDetails} />
          </div>
          <div className="flex h-full w-full flex-col gap-4 md:flex-row">
            <div className="flex min-h-[470px] w-full flex-1 md:w-7/12">
              <ProjectPreviewMap projectData={projectData} />
            </div>
            <div className="flex w-full flex-col gap-4 md:w-5/12">
              <div className="flex min-h-80 w-full">
                <ClimateGraphs climateGraphData={climateGraphData} />
              </div>
              <div className="flex min-h-60 w-full">
                <ClimateRisks climateRiskData={climateRiskData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandAssessmentDetails;
