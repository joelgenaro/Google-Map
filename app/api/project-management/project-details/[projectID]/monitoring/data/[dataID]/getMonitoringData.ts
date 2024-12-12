import { getMonitoringDataByMonitoringDataId } from '@/database/services';
import { NextResponse } from 'next/server';

export async function GetMonitoringData(dataID: string) {
  try {
    const monitoringData = await getMonitoringDataByMonitoringDataId(dataID);

    return NextResponse.json({
      monitoringData,
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
