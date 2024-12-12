import ErrorPage from '@/app/ErrorPage';
import { auth } from '@/auth';
import LandAssessmentDetails from '@/components/custom/LandAssessmentDetails';
import { getLandAssessmentProject as dbGetLandAssessmentProject } from '@/database/services';
import { LandAssessmentProjectFull } from '@/database/types';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

const getLandAssessmentProject = async (
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
    const landAssessmentProject = await dbGetLandAssessmentProject(id);
    return NextResponse.json(landAssessmentProject, { status: 200 });
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

const LandAssessmentDetailPage = async ({
  params,
}: {
  params: { projectID: string };
}) => {
  const id = params.projectID;
  const session = await auth();
  const getLandAssessmentProjRes = await getLandAssessmentProject(session, id);
  const landAssessmentProject =
    getLandAssessmentProjRes.status === 200
      ? ((await getLandAssessmentProjRes.json()) as LandAssessmentProjectFull)
      : null;

  return !landAssessmentProject ? (
    <ErrorPage
      statusCode={400}
      message="Project Not Found"
      messageSubtitle="The Project ID provided is invalid"
    />
  ) : (
    <div className="w-full flex-1 px-4 lg:px-0">
      <LandAssessmentDetails projectData={landAssessmentProject} />
    </div>
  );
};

export default LandAssessmentDetailPage;
