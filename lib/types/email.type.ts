export interface SeedSpecies {
  seedSpecies: string;
  quantity: number;
}

export interface SeedRequestEmailContext {
  requestId: string;
  requestedBy: string;
  projectName: string;
  dateRequested: string;
  seedsRequiredDate: string;
  seedTreatment: string;
  seedViability: string;
  seedProvenance: string;
  seedsSpecies: SeedSpecies[];
  appUrl: string;
  hasFootNote: boolean;
}

export type GeojsonFilesPromises = { name: string; url: string }[];

export interface LandAssessmentReportEmailContext {
  projectUUID: string;
  userEmail: string;
  geojsonFiles: GeojsonFilesPromises;
}

export interface AnotherEmailTemplateContext {
  someField: string;
  anotherField: number;
}

export type EmailTemplateName = 'seed-request' | 'land-assessment-request-report' | 'another-email-template';

export type EmailTemplateContext = {
  'seed-request': SeedRequestEmailContext;
  'land-assessment-request-report': LandAssessmentReportEmailContext;
  'another-email-template': AnotherEmailTemplateContext;
};

export interface EmailTemplate<T extends EmailTemplateName> {
  name: T;
  context: EmailTemplateContext[T];
}
