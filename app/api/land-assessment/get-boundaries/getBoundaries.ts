import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { GetLandAssessmentBoundaries } from '@/database/services';
import { auth } from '@/auth';

export default async function GetBoundaries() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse(
        JSON.stringify({ status: 'fail', message: 'You are not logged in' }),
        { status: 401 }
      );
    }

    const result = await GetLandAssessmentBoundaries(session.user.id);

    if (!result) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Projects not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        result,
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
