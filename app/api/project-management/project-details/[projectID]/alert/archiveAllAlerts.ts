import { archiveAllAlerts } from '@/database/services';
import { NextResponse } from 'next/server';

export async function ArchiveAllAlerts(
  projectID: string
) {
  try {
    const alerts = await archiveAllAlerts(projectID);

    if (alerts === 0) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Alerts not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        alerts,
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