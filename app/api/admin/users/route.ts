import createNewUser from './createNewUser';
import getAllUserProfiles from './getAllUserProfiles';

export async function POST(req: Request) {
  return createNewUser(req);
}

export async function GET() {
  return getAllUserProfiles();
}

export async function PUT(req: Request) {}