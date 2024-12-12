import createNewPlatformUpdate from './createNewPlatformUpdate';
import getAllPlatformUpdates from './getAllPlatformUpdates';

export async function POST(req: Request) {
  return createNewPlatformUpdate(req);
}

export async function GET() {
  return getAllPlatformUpdates();
}

export async function PUT(req: Request) {}
