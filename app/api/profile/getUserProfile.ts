import { auth } from '@/auth';
import { getUserProfile as dbGetUserProfile } from '@/database/services';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export default async function getUserProfile() {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return NextResponse.json(
      { message: 'You are not logged in' },
      { status: 401 }
    );
  }
  try {
    const userProfile = await dbGetUserProfile(session.user.id);
    return NextResponse.json({ ...userProfile }, { status: 200 });
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
