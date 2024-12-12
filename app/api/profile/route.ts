import getUserProfile from './getUserProfile';
import postProfile from './postProfile';
import putUserProfile from './putUserProfile';

export async function POST(req: Request) {
  return postProfile(req);
}

export async function GET() {
  return getUserProfile();
}

export async function PUT(req: Request) {
  return putUserProfile(req);
}
