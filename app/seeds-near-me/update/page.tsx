import { auth } from '@/auth';
import CreateOrUpdate from '@/components/custom/SeedsNearMe/CreateOrUpdate';
import { getSeedRequestById as dbGetSeedRequestById } from '@/database/services';
import { LandAssessmentNewProject, SeedsRequestWithProjectData } from '@/database/types';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getProjectsWithoutSeedsRequests } from '../create/page';

const getSeedRequestById = async (
  session: Session | null,
  id: string | null
) => {
  if (!session || !session?.user || !session.user?.id) {
    return NextResponse.json(
      { message: 'You are not logged in' },
      { status: 401 }
    );
  }

  if (!id) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  try {
    const seedsRequest = await dbGetSeedRequestById(id);
    return NextResponse.json(seedsRequest, { status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
};

const SeedsNearMeUpdatePage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const id = searchParams.id;
  const session = await auth();
  const getSeedsRequestRes = await getSeedRequestById(session, id);
  const seedsRequestData =
    (await getSeedsRequestRes.json()) as SeedsRequestWithProjectData;
  const getProjectsRes = await getProjectsWithoutSeedsRequests(session);
  const projectsListData =
    (await getProjectsRes.json()) as LandAssessmentNewProject[];

  // TODO: Remove if needed to include ability to update seed request
  return (
    <div className="flex items-center justify-center">
      <span className="text-2xl">
        Update functionality is not available yet
      </span>
    </div>
  );

  return (
    seedsRequestData && (
      <CreateOrUpdate
        session={session}
        actionType="UPDATE"
        seedsRequestData={seedsRequestData}
        projectsListData={projectsListData}
      />
    )
  );
};

export default SeedsNearMeUpdatePage;
