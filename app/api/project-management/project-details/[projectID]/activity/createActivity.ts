import { insertActivity } from '@/database/services';
import { insertActivitySchema } from '@/lib/project-management-detail-schemas';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function CreateActivity(req: Request) {
  try {
    const {
      projectId,
      activity,
      status,
      type,
      date,
      fromDate,
      toDate,
      description,
      attachedFile,
    } = insertActivitySchema.parse(await req.json());

    const activityData = await insertActivity({
      projectId,
      activity,
      status,
      type,
      date: date ? new Date(date) : null,
      fromDate: fromDate ? new Date(fromDate) : null,
      toDate: toDate ? new Date(toDate) : null,
      description,
      attachedFile,
      createdAt: new Date(),
    });

    return NextResponse.json({
      activityData,
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
