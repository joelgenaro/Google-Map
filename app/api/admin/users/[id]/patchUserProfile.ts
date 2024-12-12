import { auth } from '@/auth';
import { updateUserProfile } from '@/database/services';
import { UserProfile } from '@/database/types';
import { isAdmin } from '@/lib/helper';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export default async function patchUserProfile(req: Request, recordId: string) {
  try {
    const session = await auth();
    if (!session || !session?.user || !session.user?.id) {
      return NextResponse.json(
        { message: 'You are not logged in' },
        { status: 401 }
      );
    }

    if (!isAdmin(session)) {
      return NextResponse.json(
        { message: 'You are not an admin' },
        { status: 403 }
      );
    }

    const { user, profile } = await req.json();
    const userProfile: UserProfile = {
      user,
      profile
    }
    await updateUserProfile(recordId, userProfile);

    return NextResponse.json(userProfile, { status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
