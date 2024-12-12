import { TypeOf, array, number, object, string, tuple, union } from "zod";

const pointSchema = object({
  type: string(),
  coordinates: tuple([number(), number()]),
});

const lineStringSchema = object({
  type: string(),
  coordinates: array(tuple([number(), number()])).nonempty(),
});

const polygonSchema = object({
  type: string(),
  coordinates: array(array(tuple([number(), number()]))).nonempty(),
});

const multiPolygonSchema = object({
  type: string(),
  coordinates: array(
    array(
      array(tuple([number(), number()])).nonempty()
    ).nonempty()
  ).nonempty(),
});

const geometrySchema = union([pointSchema, lineStringSchema, polygonSchema, multiPolygonSchema]);

const featureSchema = object({
  id: string().optional(),
  type: string(),
  geometry: geometrySchema,
});

const dataSchema = object({
  type: string(),
  features: array(featureSchema).nonempty(
    "Please draw or upload the project area"
  ),
});

export const landAssessmentNewProjectSchema = object({
  projectName: string({ required_error: "Project name is required" }).min(
    1,
    "Project name is required"
  ),
  userId: string().uuid().min(1, "Please login first"),
  data: dataSchema,
});

export const landAssessmentCarbonEstimationAreaSchema = object({
  userId: string().uuid().min(1, "Please login first"),
  carbonMethod: array(string()),
  data: dataSchema,
});

export const landAssessmentCarbonExclusionAreaSchema = object({
  userId: string().uuid().min(1, "Please login first"),
  data: dataSchema,
});

export type AssessmentProfileInput = TypeOf<typeof landAssessmentNewProjectSchema>;
