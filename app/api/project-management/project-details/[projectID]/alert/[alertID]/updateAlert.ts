import { updateAlert } from '@/database/services';
import { NextResponse } from 'next/server';

export async function UpdateAlert(
  req: Request,
  alertID: string
) {
  try {
    const requestBody = await req.json();

    const updatedAlert = await updateAlert(alertID, requestBody);
    if (!updatedAlert) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Alert not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        updatedAlert,
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