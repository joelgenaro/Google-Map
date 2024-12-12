import { deleteSeedsRequest } from '@/database/services';
import { NextResponse } from 'next/server';

export async function removeSeedsRequest(id: string) {
  try {
    if (!id) {
      return NextResponse.json(
        { error: 'Seed request ID is required' },
        { status: 400 }
      );
    }

    const deletedId = await deleteSeedsRequest(id);

    if (deletedId) {
      return NextResponse.json({ id: deletedId }, { status: 200 });
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
