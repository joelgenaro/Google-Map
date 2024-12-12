import { updateSeedsRequest } from '@/database/services';
import { SeedsRequest } from '@/database/types';
import { NextRequest, NextResponse } from 'next/server';

export async function patchSeedsRequest(id: string, req: NextRequest) {
  try {
    if (!id) {
      return NextResponse.json(
        { error: 'Seed request ID is required' },
        { status: 400 }
      );
    }

    const updatedData: Partial<SeedsRequest> = await req.json();

    const updatedId = await updateSeedsRequest(id, updatedData);

    if (updatedId) {
      return NextResponse.json({ id: updatedId }, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Seed request not found' },
      { status: 404 }
    );
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
