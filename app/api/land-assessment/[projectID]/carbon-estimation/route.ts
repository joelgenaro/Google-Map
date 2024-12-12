import { GetLandAssessmentCarbonEstimationArea } from "@/database/services";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  try {
    const carbon = await GetLandAssessmentCarbonEstimationArea(params.projectID as string);

    if (!carbon) {
      return NextResponse.json(
        {
          status: "error",
          message: "Project not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
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
