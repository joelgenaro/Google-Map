import { createSeedsRequest } from '@/database/services';
import { SeedsRequest } from '@/database/types';
import { NextRequest, NextResponse } from 'next/server';

export async function postSeedsRequest(req: NextRequest) {
  try {
    const requestData: Omit<SeedsRequest, 'id'> = await req.json();
    const newSeedsRequest = await createSeedsRequest(requestData);

    return NextResponse.json({ id: newSeedsRequest }, { status: 201 });
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
