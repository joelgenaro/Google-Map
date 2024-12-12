import { profiles } from '../schema';
import { Profile } from '../types';
import { seedTable } from './seedTable';

const data: Profile[] = [
  {
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    profileType: 'Individual',
    userType: 'Land Managers',
    registerReason: 'To manage multiple projects',
    experienceLevel: 5,
  },
  {
    userId: 'bb5b1d1c-42fe-4a26-82dd-248f014c05c2',
    profileType: 'Individual',
    userType: 'Land Managers',
    registerReason: 'To manage multiple projects',
    experienceLevel: 3,
  },
];

export const seedProfile = async () => {
  await seedTable(profiles, data, profiles.userId);
};
