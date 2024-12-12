import { getAlertsByProjectId } from '@/database/services';
import { NextResponse } from 'next/server';

export async function GetAllAlerts(
  projectID: string
) {
  try {
    const getAlerts = await getAlertsByProjectId(projectID);
    if (!getAlerts) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Alerts not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        getAlerts,
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