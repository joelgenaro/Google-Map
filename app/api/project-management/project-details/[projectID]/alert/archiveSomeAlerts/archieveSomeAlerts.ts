import { archiveSomeAlerts as dbArchiveSomeAlerts } from '@/database/services';
import { NextResponse } from 'next/server';

export async function ArchiveSomeAlerts(
  req: Request,
  projectID: string
) {
  try {
    
    const requestBody = await req.json();
    const { alertIDs } = requestBody;
    const alertLength = await dbArchiveSomeAlerts(projectID, alertIDs);

    if (alertLength === 0) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Alerts not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        alertLength,
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