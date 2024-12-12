import { NextRequest } from 'next/server';
import { getSeedRequestById } from './getSeedRequestById';
import { patchSeedsRequest } from './patchSeedsRequest';
import { removeSeedsRequest } from './removeSeedsRequest';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  return getSeedRequestById(id);
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  return patchSeedsRequest(id, request);
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  return removeSeedsRequest(id);
}
