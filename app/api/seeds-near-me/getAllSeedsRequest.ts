import { getAllSeedsRequest as dbGetAllSeedsRequest } from '@/database/services';
import { NextRequest, NextResponse } from 'next/server';

export async function getAllSeedsRequest(req: NextRequest) {
  try {
    // Extract the userId from the request query parameters
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch all active seed requests
    const seedsRequests = await dbGetAllSeedsRequest(userId);

    return NextResponse.json(seedsRequests, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
