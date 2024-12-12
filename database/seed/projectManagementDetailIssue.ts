import { projectManagementDetailIssue } from '../schema';
import { ProjectManagementDetailIssue } from '../types';
import { seedTable } from './seedTable';

const data: ProjectManagementDetailIssue[] = [
  {
    id: 'f3a2f5b4-c8ae-4b0a-8b7f-1f2b1d1a1e8c',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    issue: 'Drought',
    status: 'Immediate action required',
    action: 'Raise issue',
    date: new Date('2024-05-12 12:43:01.033'),
    description: 'This is a description for the issue',
    createdAt: new Date('2024-05-12 12:43:01.033'),
    updatedAt: new Date('2024-05-12 12:43:01.033'),
  },
  {
    id: '7b2f44dd-9d3f-4956-a4f5-abc9f7a01234',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    issue: 'Fence hole',
    status: 'Action required',
    action: 'Raise issue',
    date: new Date('2024-06-10 12:43:01.033'),
    description: 'This is a description for the issue',
    createdAt: new Date('2024-06-10 12:43:01.033'),
    updatedAt: new Date('2024-06-10 12:43:01.033'),
  },
  {
    id: 'e9a1b5c2-5e2d-4a4e-8ed2-5f6d7e8a5678',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    issue: 'Potato shortage',
    status: 'Resolved',
    action: 'Raise issue',
    date: new Date(),
    description: 'This is a description for the issue',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const seedProjectManagementDetailIssue = async () => {
  await seedTable(projectManagementDetailIssue, data, projectManagementDetailIssue.id);
};