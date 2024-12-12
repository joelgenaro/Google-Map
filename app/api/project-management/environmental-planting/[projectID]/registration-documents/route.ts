import { UpdateProjectManagement } from '@/database/services';
import { projectManagementUpdateSchema } from '@/lib/project-management-schema';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function PUT(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  try {
    const requestBody = await req.json();
    const { letterOfDeclarationUrl, auditScheduleUrl, letterToParticipateUrl } =
      projectManagementUpdateSchema.parse(requestBody);
    const projectManagement = await UpdateProjectManagement(
      params.projectID as string,
      { letterOfDeclarationUrl, auditScheduleUrl, letterToParticipateUrl }
    );

    if (!projectManagement) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Project not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        projectManagement,
        status: 200,
      });
    }
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          status: 'error',
          message: error.message || 'Internal Server Error',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        message: 'Unknown error',
      },
      { status: 500 }
    );
  }
}
