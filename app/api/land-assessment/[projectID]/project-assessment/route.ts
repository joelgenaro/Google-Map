import { GetLandAssessmentCarbonEstimationArea, GetLandAssessmentNewProject } from "@/database/services";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  try {
    const [project, carbon] = await Promise.all([
      GetLandAssessmentNewProject(params.projectID as string),
      GetLandAssessmentCarbonEstimationArea(params.projectID as string),
    ]);

    if (!project || !carbon) {
      return NextResponse.json(
        {
          status: "error",
          message: "Project or Carbon Estimation Area not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        project,
        carbon,
        status: 200,
      });
    }
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          status: "error",
          message: error.message || "Internal Server Error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Unknown error",
      },
      { status: 500 }
    );
  }
}