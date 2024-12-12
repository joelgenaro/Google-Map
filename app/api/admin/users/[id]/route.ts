import deleteUserProfile from './deleteUserProfile';
import getUserProfile from './getUserProfile';
import patchUserProfile from './patchUserProfile';

export async function POST(req: Request) {}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return getUserProfile(params.id);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  return patchUserProfile(req, params.id);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return deleteUserProfile(params.id);
}
