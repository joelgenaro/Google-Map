import { getAlertById, updateAlert } from '@/database/services';
import { NextResponse } from 'next/server';

export async function GetAlert(
  alertID: string
) {
  try {
    const getAlert = await getAlertById(alertID);
    if (!getAlert) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Alert not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        getAlert,
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