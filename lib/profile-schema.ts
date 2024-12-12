import { TypeOf, number, object, string, enum as zodEnum } from 'zod';
import {
  fieldRequiredErrMsg,
  profileType,
  registerReason,
  userType,
} from './constants';

const requiredString = (fieldName: string) =>
  string({ required_error: fieldRequiredErrMsg(fieldName) }).min(
    1,
    fieldRequiredErrMsg(fieldName)
  );

const requiredNumber = (fieldName: string) =>
  number({ required_error: fieldRequiredErrMsg(fieldName) }).min(
    1,
    fieldRequiredErrMsg(fieldName)
  );

// const requiredEmail = (fieldName: string, fieldType = 'email') =>
//   string({ required_error: fieldRequiredErrMsg(fieldName) }).email(
//     fieldMustBeValidErrMsg(fieldName, fieldType)
//   );

// const requiredUrl = (fieldName: string, fieldType = 'URL') =>
//   string({ required_error: fieldRequiredErrMsg(fieldName) }).url(
//     fieldMustBeValidErrMsg(fieldName, fieldType)
//   );

// Enums
// Convert the array to a tuple
const profileTypeTuple = profileType as [string, ...string[]];
const profileTypeEnum = zodEnum(profileTypeTuple, {
  required_error: fieldRequiredErrMsg('User Type'),
});

const userTypeTuple = userType as [string, ...string[]];
const userTypeEnum = zodEnum(userTypeTuple, {
  required_error: fieldRequiredErrMsg('User Type'),
});

const registerReasonTuple = registerReason as [string, ...string[]];
const registerReasonEnum = zodEnum(registerReasonTuple, {
  required_error: fieldRequiredErrMsg('Reason'),
});

export const userProfileSchema = object({
  user: object({
    image: string().optional().nullable(),
    email: requiredString('Email'),
  }),
  profile: object({
    profileType: profileTypeEnum,
    userType: userTypeEnum,
    experienceLevel: requiredNumber('Experience Level'),
    registerReason: registerReasonEnum,
  }),
});

export type UserProfileInput = TypeOf<typeof userProfileSchema>;
