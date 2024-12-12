import { projectManagement } from '../models/projectManagement';
import { ProjectManagement } from '../types';
import { seedTable } from './seedTable';

const data: ProjectManagement[] = [
  {
    id: '435a2e0e-e6aa-4400-ac47-22da96810973',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    projectName: 'Project 1',
    landholderName: 'Landholder 1',
    address: 'Address 1',
    letterOfDeclarationUrl: "I don't have this file",
    auditScheduleUrl: "I don't have this file",
    letterToParticipateUrl: "I don't have this file",
    specificationsUrls: ["I don't have this file"],
    landManagementPlanUrl: "I don't have this file",
    fireManagementPlanUrl: "I don't have this file",
    permanencePlanUrl: "I don't have this file",
    fullCAMFilesUrl: "I don't have this file",
    carbonEstimationAreaBaselineDataUrl: "I don't have this file",
    carbonAdditionalFilesUrls: "I don't have this file",
    carbonAdditionalFilesDescription: 'Additional files for carbon estimation',
    monitoringPlotsUrl: "I don't have this file",
    monitoringDataUrl: "I don't have this file",
    monitoringAdditionalFilesUrls: "I don't have this file",
    monitoringAdditionalFilesDescription: 'Additional files for monitoring',
  },
];

export const seedProjectManagement = async () => {
  await seedTable(projectManagement, data, projectManagement.id);
};