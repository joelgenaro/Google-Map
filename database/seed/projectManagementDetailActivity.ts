import { projectManagementDetailActivity } from '../schema';
import { ProjectManagementDetailActivity } from '../types';
import { seedTable } from './seedTable';

const data: ProjectManagementDetailActivity[] = [
  {
    id: '3f8b0c0a-2363-4def-a833-5fcb172c55a3',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    activity: 'Drought',
    status: 'Immediate action required',
    type: 'Log',
    date: new Date('2024-05-12 12:43:01.033'),
    description: 'This is a description for the activity',
    createdAt: new Date('2024-05-12 12:43:01.033'),
    updatedAt: new Date('2024-05-12 12:43:01.033'),
  },
  {
    id: 'a6d9e2e3-3d6c-4b3e-84a0-6e4d61428d50',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    activity: 'Fence hole',
    status: 'Action required',
    type: 'Schedule',
    fromDate: new Date('2024-06-10 12:43:01.033'),
    toDate: new Date('2024-06-12 12:43:01.033'),
    description: 'This is a description for the activity',
    createdAt: new Date('2024-06-10 12:43:01.033'),
    updatedAt: new Date('2024-06-10 12:43:01.033'),
  },
  {
    id: '7c2f0eb3-c586-4d7b-9b55-5e3342ec433d',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    activity: 'Potato shortage',
    status: 'Resolved',
    type: 'Log',
    date: new Date(),
    description: 'This is a description for the activity',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const seedProjectManagementDetailActivity = async () => {
  await seedTable(projectManagementDetailActivity, data, projectManagementDetailActivity.id);
};