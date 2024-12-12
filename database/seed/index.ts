import { seedLandAssessmentCarbonEstimationArea } from './landAssessmentCarbonEstimationArea';
import { seedLandAssessmentCarbonExclusionArea } from './landAssessmentCarbonExclusionArea';
import { seedLandAssessmentNewProject } from './landAssessmentNewProject';
import { seedPlatformUpdate } from './platformUpdate';
import { seedProfile } from './profile';
import { seedProjectManagement } from './projectManagement';
import { seedProjectManagementDetailActivity } from './projectManagementDetailActivity';
import { seedProjectManagementDetailAlert } from './projectManagementDetailAlert';
import { seedProjectManagementDetailIssue } from './projectManagementDetailIssue';
import { seedProjectManagementMonitoringData } from './projectManagementMonitoringData';
import { seedProjectManagementMonitoringReport } from './projectManagementMonitoringReport';
import { seedSeedsRequest } from './seedsRequest';
import { seedUser } from './user';

/**
 * This function is used to seed the database with data
 * Order of invocation is important, as some entities depend on others
 * For example, the profile entity depends on the user entity
 * Therefore, the user entity must be seeded before the profile entity
 **/
export const seedAllTables = async () => {
  // The user must exist before the profile can be created
  await seedUser();
  await seedProfile();

  // Entities that depend on other entities must be seeded after the entities they depend on
  await seedLandAssessmentNewProject();
  // These entities depend on the project entity and user entity
  await seedLandAssessmentCarbonEstimationArea();
  await seedLandAssessmentCarbonExclusionArea();
  // Seeds request depends on the project entity
  await seedSeedsRequest();

  // Entities that do not depend on other entities can be seeded in any order
  await seedPlatformUpdate();

  await seedProjectManagement();
  await seedProjectManagementDetailAlert();
  await seedProjectManagementDetailIssue();
  await seedProjectManagementDetailActivity();
  await seedProjectManagementMonitoringReport();
  await seedProjectManagementMonitoringData();
};
