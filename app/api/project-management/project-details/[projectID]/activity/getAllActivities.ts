import { getActivitiesByProjectId } from '@/database/services';
import { NextResponse } from 'next/server';

export async function GetAllActivities(
  projectID: string
) {
  try {
    const activities = await getActivitiesByProjectId(projectID);
    if (!activities) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Activities not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        activities,
        status: 200,
      });
    }
  } catch (error: unknown) {
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