import { auth } from '@/auth';
import { InsertUserProfile } from '@/database/services';
import { userProfileSchema } from '@/lib/profile-schema';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export default async function postProfile(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Not authenticated',
        },
        { status: 401 }
      );
    }
    const { user, profile } = userProfileSchema.parse(await req.json());
    const profileData = await InsertUserProfile({
      ...profile,
      userId: session.user?.id || '',
    });
    return NextResponse.json({
      profileData,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
