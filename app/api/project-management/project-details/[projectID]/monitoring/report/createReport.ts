import { insertReport } from '@/database/services';
import { NextResponse } from 'next/server';

export async function CreateReport(req: Request) {
  try {
    const {
      projectId,
      projectName,
      status,
      method,
      fromDate,
      toDate,
      report,
      attachedFile,
      description,
    } = await req.json();

    const reportData = await insertReport({
      projectId,
      projectName,
      status,
      method,
      fromDate: fromDate ? new Date(fromDate) : null,
      toDate: toDate ? new Date(toDate) : null,
      report,
      description,
      attachedFile,
      createdAt: new Date(),
    });

    return NextResponse.json({
      reportData,
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
