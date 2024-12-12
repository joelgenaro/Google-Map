import { archiveAlert } from '@/database/services';
import { NextResponse } from 'next/server';

export async function ArchiveAlert(
  alertID: string
) {
  try {
    const alert = await archiveAlert(alertID);

    if (!alert) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Alert not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        alert,
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