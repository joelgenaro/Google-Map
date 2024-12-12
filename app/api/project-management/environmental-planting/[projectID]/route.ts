import { GetProjectManagement } from '@/database/services';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  try {
    const project = await GetProjectManagement(params.projectID as string);

    if (!project) {
      return NextResponse.json(
        {
          status: "error",
          message: "Project not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        project,
        status: 200,
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}