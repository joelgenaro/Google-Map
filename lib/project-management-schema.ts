import { object, string } from "zod";


export const projectManagementSchema = object({
  projectName: string({ required_error: "Project name is required" }).min(
    1,
    "Project name is required"
  ),
  userId: string().uuid().min(1, "Please login first"),
  landholderName: string({ required_error: "Landholder name is required" }).min(
    1,
    "Landholder name is required"
  ),
  address: string({ required_error: "Address is required" }).min(
    1,
    "Address is required"
  ),
  letterOfDeclarationUrl: string().optional(),
  auditScheduleUrl: string().optional(),
  letterToParticipateUrl: string().optional(),
  specificationsUrls: string().array().optional(),
  landManagementPlanUrl: string().optional(),
  fireManagementPlanUrl: string().optional(),
  permanencePlanUrl: string().optional(),
  fullCAMFilesUrl: string().optional(),
  carbonEstimationAreaBaselineDataUrl: string().optional(),
  carbonAdditionalFilesUrls: string().optional(),
  carbonAdditionalFilesDescription: string().optional(),
  monitoringPlotsUrl: string().optional(),
  monitoringDataUrl: string().optional(),
  monitoringAdditionalFilesUrls: string().optional(),
  monitoringAdditionalFilesDescription: string().optional(),
});

export const projectManagementUpdateSchema = object({
  projectName: string().optional(),
  landholderName: string().optional(),
  address: string().optional(),
  letterOfDeclarationUrl: string().optional(),
  auditScheduleUrl: string().optional(),
  letterToParticipateUrl: string().optional(),
  specificationsUrls: string().array().optional(),
  landManagementPlanUrl: string().optional(),
  fireManagementPlanUrl: string().optional(),
  permanencePlanUrl: string().optional(),
  fullCAMFilesUrl: string().optional(),
  carbonEstimationAreaBaselineDataUrl: string().optional(),
  carbonAdditionalFilesUrls: string().optional(),
  carbonAdditionalFilesDescription: string().optional(),
  monitoringPlotsUrl: string().optional(),
  monitoringDataUrl: string().optional(),
  monitoringAdditionalFilesUrls: string().optional(),
  monitoringAdditionalFilesDescription: string().optional(),
});
