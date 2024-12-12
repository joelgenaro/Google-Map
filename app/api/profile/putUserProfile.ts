import { auth } from '@/auth';
import {
  updateUserProfile as dbUpdateUserProfile
} from '@/database/services';
import { userProfileSchema } from '@/lib/profile-schema';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export default async function putUserProfile(req: Request) {
  try {
    const session = await auth();
    if (!session || !session?.user || !session.user?.id) {
      return new NextResponse(
        JSON.stringify({ status: 'fail', message: 'You are not logged in' }),
        { status: 401 }
      );
    }
    const userProfileData = userProfileSchema.parse(await req.json());
    const updatedUserId = await dbUpdateUserProfile(
      session.user.id,
      userProfileData
    );
    return NextResponse.json(updatedUserId);
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
