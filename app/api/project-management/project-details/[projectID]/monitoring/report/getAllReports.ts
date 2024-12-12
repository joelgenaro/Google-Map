import { getReportsByProjectId } from '@/database/services';
import { NextResponse } from 'next/server';

export async function GetAllReports(
  projectID: string
) {
  try {
    const reports = await getReportsByProjectId(projectID);
    if (!reports) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Reports not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        reports,
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