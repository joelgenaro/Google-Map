import { auth } from '@/auth';
import { GetLandAssessmentAllProjects } from '@/database/services';
import { formatToString, isAdmin } from '@/lib/helper';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export default async function getAllLandAssessments() {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return NextResponse.json(
      { message: 'You are not logged in' },
      { status: 401 }
    );
  }

  if (!isAdmin(session)) {
    return NextResponse.json(
      { message: 'You are not an admin' },
      { status: 403 }
    );
  }

  try {
    const { project, estimate, exclusion } = await GetLandAssessmentAllProjects();
    const projects = project?.map((projectItem, index) => {
      const estimateItem = estimate?.[index];
      const exclusionItem = exclusion?.[index];
  
      return {
        id: projectItem.id,
        userId: projectItem.userId,
        projectName: projectItem.projectName,
        carbonMethod: estimateItem?.carbonMethod || null,
        initialData: formatToString(projectItem.data),
        estimateData: formatToString(estimateItem?.data) || null,
        exclusionData: formatToString(exclusionItem?.data) || null,
      };
    });

    return NextResponse.json(projects, { status: 200 });
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
}
