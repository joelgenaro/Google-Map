import {
  getProjectManagementMonitoringDataByProjectId,
} from '@/database/services';
import { NextResponse } from 'next/server';

export async function GetAllMonitoringData(projectID: string) {
  try {
    const monitoringDataList =
      await getProjectManagementMonitoringDataByProjectId(projectID);

    return NextResponse.json({
      monitoringDataList,
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
