import { updateMonitoringData } from '@/database/services';
import { NextResponse } from 'next/server';

export async function UpdateMonitoringData(req: Request, dataID: string) {
  try {
    const monitoringData = await req.json();

    await updateMonitoringData(dataID, monitoringData);

    return NextResponse.json({
      status: 200,
    });
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
