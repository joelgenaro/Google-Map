import { NextRequest } from 'next/server';
import { getAllSeedsRequest } from './getAllSeedsRequest';
import { postSeedsRequest } from './postSeedsRequest';

export async function POST(req: NextRequest) {
  return postSeedsRequest(req);
}

export async function GET(req: NextRequest) {
  return getAllSeedsRequest(req);
}
