import { users } from '../schema';
import { User } from '../types';
import { seedTable } from './seedTable';

const data: User[] = [
  {
    id: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    name: 'Admin User',
    email: 'admin@user.com',
    // The actual password is 'test1234'
    password: '$2a$12$C4Rx13Mycp3CDIh3oDrzQuGhAo3/6IwRQBcVeebGoRDWFYvIWoSve',
    role: 'admin',
  },
  {
    id: 'bb5b1d1c-42fe-4a26-82dd-248f014c05c2',
    name: 'Test User',
    email: 'test@user.com',
    // The actual password is 'test1234'
    password: '$2a$12$C4Rx13Mycp3CDIh3oDrzQuGhAo3/6IwRQBcVeebGoRDWFYvIWoSve',
  },
];

export const seedUser = async () => {
  await seedTable(users, data, users.id);
};
