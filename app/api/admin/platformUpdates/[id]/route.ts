import deletePlatformUpdate from './deletePlatformUpdate';
import getPlatformUpdate from './getPlatformUpdate';
import patchPlatformUpdate from './patchPlatformUpdate';

export async function POST(req: Request) {}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return getPlatformUpdate(params.id);
}

export async function PUT(req: Request) {}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  return patchPlatformUpdate(req, params.id);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return deletePlatformUpdate(params.id);
}
