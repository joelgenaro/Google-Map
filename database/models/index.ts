import {
  landAssessmentCarbonEstimationArea,
  landAssessmentCarbonExclusionArea,
  landAssessmentNewProject,
} from './landAssessmentProjects';
import { platformUpdate } from './platformUpdate';
import { profiles } from './profiles';
import { projectManagement } from './projectManagement';
import { seedsRequest } from './seedsRequest';
import { users } from './users';
import { projectManagementDetailAlert } from './projectManagementDetailAlert';
import { projectManagementDetailIssue } from './projectManagementDetailIssue';
import { projectManagementDetailActivity } from './projectManagementDetailActivity';
import { projectManagementMonitoringReport } from './projectManagementMonitoringReport';
import { projectManagementMonitoringPlant } from './projectManagementMonitoringPlant';
import { projectManagementMonitoringPlot } from './projectManagementMonitoringPlot';
import { projectManagementMonitoringData } from './projectManagementMonitoringData';

type Models = {
  users: typeof users;
  profiles: typeof profiles;
  platformUpdate: typeof platformUpdate;
  seedsRequest: typeof seedsRequest;
  landAssessmentNewProject: typeof landAssessmentNewProject;
  landAssessmentCarbonEstimationArea: typeof landAssessmentCarbonEstimationArea;
  landAssessmentCarbonExclusionArea: typeof landAssessmentCarbonExclusionArea;
  projectManagement: typeof projectManagement;
  projectManagementDetailAlert: typeof projectManagementDetailAlert;
  projectManagementDetailIssue: typeof projectManagementDetailIssue;
  projectManagementDetailActivity: typeof projectManagementDetailActivity;
  projectManagementMonitoringReport: typeof projectManagementMonitoringReport;
  projectManagementMonitoringPlot: typeof projectManagementMonitoringPlot;
  projectManagementMonitoringPlant: typeof projectManagementMonitoringPlant;
  projectManagementMonitoringData: typeof projectManagementMonitoringData;
};

export const models: Models = {
  users,
  profiles,
  platformUpdate,
  seedsRequest,
  landAssessmentNewProject,
  landAssessmentCarbonEstimationArea,
  landAssessmentCarbonExclusionArea,
  projectManagement,
  projectManagementDetailAlert,
  projectManagementDetailIssue,
  projectManagementDetailActivity,
  projectManagementMonitoringReport,
  projectManagementMonitoringPlot,
  projectManagementMonitoringPlant,
  projectManagementMonitoringData,
};
