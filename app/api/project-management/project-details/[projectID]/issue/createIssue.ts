import { insertIssue } from '@/database/services';
import { insertIssueSchema } from '@/lib/project-management-detail-schemas';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function CreateIssue(req: Request) {
  try {
    const {
      projectId,
      issue,
      status,
      action,
      date,
      description,
      attachedFile,
    } = insertIssueSchema.parse(await req.json());

    const issueData = await insertIssue({
      projectId,
      issue,
      status,
      action,
      date: new Date(date),
      description,
      attachedFile,
      createdAt: new Date(),
    });

    return NextResponse.json({
      issueData,
    });
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
