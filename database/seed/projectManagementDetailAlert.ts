import { projectManagementDetailAlert } from '../schema';
import { ProjectManagementDetailAlert } from '../types';
import { seedTable } from './seedTable';

const data: ProjectManagementDetailAlert[] = [
  {
    id: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    alert: 'Drought Warning',
    date: new Date('2024-05-12 12:43:01.033'),
    raiseIssue: 'Raise issue',
    dangerLevel: 'High',
    status: 'Viewed',
    type: 'Carbon',
    createdAt: new Date('2024-05-12 12:43:01.033'),
    updatedAt: new Date('2024-05-12 12:43:01.033'),
  },
  {
    id: '3e713ebb-57bd-4c38-b4a2-783a947da23e',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    alert: 'Drought likely',
    date: new Date('2024-06-10 12:43:01.033'),
    raiseIssue: 'Raise issue',
    dangerLevel: 'Low',
    status: 'Archived',
    type: 'Weather',
    createdAt: new Date('2024-06-10 12:43:01.033'),
    updatedAt: new Date('2024-06-10 12:43:01.033'),
  },
  {
    id: '3e713ebb-57bd-4c38-b4a2-783a947da22e',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    alert: 'Fire Warning',
    date: new Date(),
    raiseIssue: 'Raise issue',
    dangerLevel: 'High',
    status: 'New',
    type: 'Infrastructure',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const seedProjectManagementDetailAlert = async () => {
  await seedTable(projectManagementDetailAlert, data, projectManagementDetailAlert.id);
};