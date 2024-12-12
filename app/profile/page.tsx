import Image from 'next/image';
import { UpdateProfileForm } from './update-profile-form';

import { auth } from '@/auth';
import {
  getUserProfile as dbGetUserProfile,
} from '@/database/services';
import getPresignedUrl from '@/lib/utils/generate-presigned-url';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { UserProfile } from '@/database/types';

async function getUserProfile(session: Session | null) {
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

export default async function ProfilePage() {
  const session = await auth();
  const getUserProfileRes = await getUserProfile(session);
  const userProfile = (await getUserProfileRes.json()) as UserProfile;
  let profileImgUrl = '/images/default.png';

  if (userProfile.user.image) {
    const presignedUrlRes = await getPresignedUrl(userProfile.user.image);
    profileImgUrl = presignedUrlRes.url ?? profileImgUrl;
  }

  return (
    <div className="flex w-full justify-center items-start gap-8 overflow-auto">
      <div>
        <Image
          src={profileImgUrl}
          alt={`Profile photo of ${userProfile?.user.name || 'user'}`}
          width={90}
          height={90}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <p className="mb-3">ID: {userProfile.user.id}</p>
          <p className="mb-3">Name: {userProfile.user.name}</p>
          <p className="mb-3">Email: {userProfile.user.email}</p>
          <p className="mb-3">User Type: {userProfile.profile.userType}</p>
          <p className="mb-3">
            Profile Type: {userProfile.profile.profileType}
          </p>
          <p className="mb-3">
            Experience Level: {userProfile.profile.experienceLevel}
          </p>
          <p className="mb-3">
            What brought me to Natur: {userProfile.profile.registerReason}
          </p>
        </div>
        <div className="self-end mt-6">
          <UpdateProfileForm
            userProfile={userProfile}
            profileImgUrl={profileImgUrl}
          />
        </div>
      </div>
    </div>
  );
}
