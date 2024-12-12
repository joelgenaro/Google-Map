import { InferInsertModel } from 'drizzle-orm';
import { seedsRequest } from '../models/seedsRequest';
import {
  platformUpdate,
  profiles,
  projectManagement,
  users,
  landAssessmentCarbonEstimationArea,
  landAssessmentCarbonExclusionArea,
  landAssessmentNewProject,
  projectManagementDetailIssue,
  projectManagementDetailAlert,
  projectManagementDetailActivity,
  projectManagementMonitoringReport,
  projectManagementMonitoringData,
  projectManagementMonitoringPlot,
  projectManagementMonitoringPlant,
} from '../schema';

export type User = typeof users.$inferInsert;

export type Profile = typeof profiles.$inferInsert;

export type PlatformUpdate = InferInsertModel<typeof platformUpdate>;

export type SeedsRequest = InferInsertModel<typeof seedsRequest>;

export type SeedsRequestWithProjectData = SeedsRequest & {
  projectName: LandAssessmentNewProject['projectName'] | null;
  projectData: LandAssessmentNewProject['data'] | null;
};

export type LandAssessmentNewProject =
  typeof landAssessmentNewProject.$inferInsert;

export type LandAssessmentProjectFull = LandAssessmentNewProject & {
  estimate: LandAssessmentCarbonEstimationArea[];
  exclusion: LandAssessmentCarbonExclusionArea[];
};

export type ProfileNoId = Omit<typeof profiles.$inferInsert, 'userId'>;

export type UserProfile = { user: User; profile: ProfileNoId };

export type LandAssessmentCarbonEstimationArea =
  typeof landAssessmentCarbonEstimationArea.$inferInsert;

export type LandAssessmentCarbonExclusionArea =
  typeof landAssessmentCarbonExclusionArea.$inferInsert;

export interface LandAssessmentProjects {
  project: LandAssessmentNewProject[] | null;
  estimate: LandAssessmentCarbonEstimationArea[] | null;
  exclusion: LandAssessmentCarbonExclusionArea[] | null;
}

export interface LandAssessmentAllProjects {
  id: string;
  projectName: string;
  carbonMethod: Array<string> | null;
  initialData: JSON;
  estimateData: JSON;
  exclusionData: JSON;
}

export type ProjectManagement = typeof projectManagement.$inferInsert;
export type ProjectManagementDetailAlert =
  typeof projectManagementDetailAlert.$inferInsert;
export type ProjectManagementDetailIssue = typeof projectManagementDetailIssue.$inferInsert;
export type ProjectManagementDetailActivity = typeof projectManagementDetailActivity.$inferInsert;
export type ProjectManagementMonitoringReport = typeof projectManagementMonitoringReport.$inferInsert;

export type InsertProjectManagementMonitoringPlot = typeof projectManagementMonitoringPlot.$inferInsert;
export type SelectProjectManagementMonitoringPlot = typeof projectManagementMonitoringPlot.$inferSelect;
export type InsertProjectManagementMonitoringPlant = typeof projectManagementMonitoringPlant.$inferInsert;
export type SelectProjectManagementMonitoringPlant = typeof projectManagementMonitoringPlant.$inferSelect;
export type ProjectManagementMonitoringPlot = {
  plotID: string | null;
  longitude: string | null;
  latitude: string | null;
  canopyCover: number | null;
  leafLitter: number | null;
  bairSoil: number | null;
  rock: number | null;
  vegetation: number | null;
  herbivory: boolean | null;
  disease: boolean | null;
  plotNotes: string | null;
}

export type ProjectManagementMonitoringPlant = {
  plantID: string | null;
  plotID: string | null;
  species: string | null;
  height: number | null;
  canopyDiameter: number | null;
  plantNotes: string | null;
}

export type InsertProjectManagementMonitoringData = typeof projectManagementMonitoringData.$inferInsert;
export type SelectProjectManagementMonitoringData = typeof projectManagementMonitoringData.$inferSelect;

export type InsertMonitoringDataWithPlotsAndPlants = {
  projectId: string;
  datasetName: string;
  dataCollectionDate: Date;
  monitoringTiming: string;
  plots: ProjectManagementMonitoringPlot[];
  plants: ProjectManagementMonitoringPlant[];
};

export type SelectMonitoringDataWithPlotsAndPlants = {
  projectId: string;
  id: string;
  datasetName: string;
  dataCollectionDate: Date;
  monitoringTiming: string;
  plots: SelectProjectManagementMonitoringPlot[];
  plants: SelectProjectManagementMonitoringPlant[];
};