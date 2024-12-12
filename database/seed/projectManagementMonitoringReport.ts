import { projectManagementMonitoringReport } from '../schema';
import { ProjectManagementMonitoringReport } from '../types';
import { seedTable } from './seedTable';

const data: ProjectManagementMonitoringReport[] = [
  {
    id: '4e2a8de8-6fe2-4c0a-8b9d-9e4a9c5a2d14',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    projectName: 'Swamp',
    status: 'Available',
    method: 'EP',
    fromDate: new Date('2022-05-12 12:43:01.033'),
    toDate: new Date('2023-06-14 12:43:01.033'),
    report: 'Annual Progress Review',
    createdAt: new Date('2024-05-12 12:43:01.033'),
    updatedAt: new Date('2024-05-12 12:43:01.033'),
    description: 'Annual Progress Review',
  },
  {
    id: '5f3c9d2b-ef2a-44e7-b643-8e5f3b5e5a6c',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    projectName: 'Swamp',
    status: 'In-Progress',
    method: 'EP',
    fromDate: new Date('2023-06-10 12:43:01.033'),
    toDate: new Date('2024-06-12 12:43:01.033'),
    report: 'ACCU claim',
    createdAt: new Date('2024-06-10 12:43:01.033'),
    updatedAt: new Date('2024-06-10 12:43:01.033'),
    description: 'ACCU claim',
  },
  {
    id: '7c2f0eb3-c586-4d7b-9b55-5ea842ec433d',
    projectId: '435a2e0e-e6aa-4400-ac47-22da96810973',
    projectName: 'Snake Pit',
    status: 'Available',
    method: 'HIR',
    fromDate: new Date('2022-06-20 12:43:01.033'),
    toDate: new Date('2023-06-23 12:43:01.033'),
    report: 'Annual Progress Review',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: 'Annual Progress Review',
  },
];

export const seedProjectManagementMonitoringReport = async () => {
  await seedTable(projectManagementMonitoringReport, data, projectManagementMonitoringReport.id);
};