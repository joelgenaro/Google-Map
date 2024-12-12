import { auth } from '@/auth';
import { InsertUserProfile, InsertUserRecord } from '@/database/services';
import { isAdmin } from '@/lib/helper';
import { userProfileSchema } from '@/lib/profile-schema';
import { createUserSchema } from '@/lib/user-schema';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export default async function createNewUser(req: Request) {
  try {
    const session = await auth();
    if (!session || !session?.user || !session.user?.id) {
      return NextResponse.json({ message: 'You are not logged in' }, { status: 401 });
    }

    if (!isAdmin(session)) {
      return NextResponse.json({ message: 'You are not an admin' }, { status: 403 });
    }

    const body = await req.json();

    // Extract user and profile data from the request body
    const userData = {
      name: body.name,
      email: body.email,
      password: body.password,
      passwordConfirm: body.passwordConfirm,
    };

    const profileData = {
      profileType: body.profileType,
      userType: body.userType,
      experienceLevel: body.experienceLevel,
      registerReason: body.registrationReason,
    };

    // Validate user data
    const userResult = createUserSchema.safeParse(userData);
    if (!userResult.success) {
      return NextResponse.json({ message: 'Validation failed', errors: userResult.error.errors }, { status: 400 });
    }

    // Validate profile data
    const profileResult = userProfileSchema.safeParse({ user: { email: userData.email }, profile: profileData });
    if (!profileResult.success) {
      return NextResponse.json({ message: 'Validation failed', errors: profileResult.error.errors }, { status: 400 });
    }

    const { name, email, password, role, profileType, userType, experienceLevel, registrationReason:registerReason } = body;

    const hashed_password = await hash(password, 12);

    const user = await InsertUserRecord({
      name,
      email: email.toLowerCase(),
      password: hashed_password,
      role,
    });
  
    if (user.id) {
      await InsertUserProfile({
        profileType,
        userType,
        experienceLevel,
        registerReason,
        userId: user.id
      });
    }
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}