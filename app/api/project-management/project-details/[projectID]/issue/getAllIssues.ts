import { getIssuesByProjectId } from '@/database/services';
import { NextResponse } from 'next/server';

export async function GetAllIssue(
  projectID: string
) {
  try {
    const getIssues = await getIssuesByProjectId(projectID);
    if (!getIssues) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Issues not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        getIssues,
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