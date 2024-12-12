import { auth } from '@/auth';
import CreateOrUpdate from '@/components/custom/SeedsNearMe/CreateOrUpdate';
import { getProjectsWithoutSeedsRequests as dbGetProjectsWithoutSeedsRequests } from '@/database/services';
import { LandAssessmentNewProject } from '@/database/types';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const getProjectsWithoutSeedsRequests = async (
  session: Session | null
) => {
  if (!session || !session?.user || !session.user?.id) {
    return NextResponse.json(
      { message: 'You are not logged in' },
      { status: 401 }
    );
  }
  try {
    const projectsWithoutSeedsRequests =
      await dbGetProjectsWithoutSeedsRequests(session.user.id);
    return NextResponse.json(projectsWithoutSeedsRequests, { status: 200 });
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

const SeedsNearMeCreatePage = async () => {
  const session = await auth();
  const getProjectsRes = await getProjectsWithoutSeedsRequests(session);
  const projectsListData =
    (await getProjectsRes.json()) as LandAssessmentNewProject[];

  return (
    <CreateOrUpdate
      session={session}
      actionType="CREATE"
      projectsListData={projectsListData}
    />
  );
};

export default SeedsNearMeCreatePage;
