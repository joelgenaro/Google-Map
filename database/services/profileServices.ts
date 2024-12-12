import { eq } from "drizzle-orm";
import { db } from "..";
import { profiles, users } from "../schema";
import { Profile, UserProfile } from "../types";

export const InsertUserProfile = async (data: Profile): Promise<Profile> => {
  const profile = await db
    .insert(profiles)
    .values({ ...data })
    .returning();
  return profile[0];
};

export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  const result = await db
    .select()
    .from(users)
    .innerJoin(profiles, eq(users.id, profiles.userId))
    .where(eq(users.id, userId));
  if (result.length > 0) {
    const { user, profile } = result[0];
    const userProfile: UserProfile = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role
      },
      profile: {
        profileType: profile.profileType,
        userType: profile.userType,
        experienceLevel: profile.experienceLevel,
        registerReason: profile.registerReason,
      },
    };
    return userProfile;
  }
  return null;
};

export const getAllUserProfiles = async (): Promise<UserProfile[] | null> => {
  const result = await db
    .select()
    .from(users)
    .innerJoin(profiles, eq(users.id, profiles.userId));
  if (result.length > 0) {
    const userProfiles: UserProfile[] = result.map((profile) => {
      return {
        user: {
          id: profile.user.id,
          name: profile.user.name,
          email: profile.user.email,
          image: profile.user.image,
          role: profile.user.role,
        },
        profile: {
          profileType: profile.profile.profileType,
          userType: profile.profile.userType,
          experienceLevel: profile.profile.experienceLevel,
          registerReason: profile.profile.registerReason,
        },
      };
    });
    return userProfiles;
  }
  return null;
};

export const updateUserProfile = async (
  userId: string,
  data: UserProfile
): Promise<string | null> => {
  const updatedUserId: { updatedId: string }[] = await db
    .update(users)
    .set({ ...data.user })
    .where(eq(users.id, userId))
    .returning({ updatedId: users.id });
  const updatedUserProfileId: { updatedId: string }[] = await db
    .update(profiles)
    .set({ userId: data.user.id, ...data.profile })
    .where(eq(profiles.userId, userId))
    .returning({ updatedId: profiles.userId });
  if (updatedUserId.length > 0 && updatedUserProfileId.length > 0) {
    return updatedUserId[0].updatedId;
  }
  return null;
};