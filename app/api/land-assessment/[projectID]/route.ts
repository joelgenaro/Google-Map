import {
  GetLandAssessmentNewProject,
  InsertLandAssessmentCarbonEstimationArea,
  UpdateLandAssessmentCarbonEstimationArea
} from "@/database/services";
import { landAssessmentCarbonEstimationAreaSchema } from "@/lib/assessment-project-schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  try {
    const project = await GetLandAssessmentNewProject(params.projectID as string);

    if (!project) {
      return NextResponse.json(
        {
          status: "error",
          message: "Project not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        project,
        status: 200,
      });
    }
  } catch (error: any) {
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

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  try {
    const { userId, carbonMethod, data } = landAssessmentCarbonEstimationAreaSchema.parse(
      await req.json()
    );

    const project = await InsertLandAssessmentCarbonEstimationArea({
      userId,
      carbonMethod,
      data,
      id: params.projectID,
    });

    if (!project) {
      return NextResponse.json(
        {
          status: "error",
          message: "Project not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        project,
        status: 200,
      });
    }
  } catch (error: any) {
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

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  try {
    const { userId, carbonMethod, data } = landAssessmentCarbonEstimationAreaSchema.parse(
      await req.json()
    );

    const project = await UpdateLandAssessmentCarbonEstimationArea(params.projectID, {
      userId,
      carbonMethod,
      data,
      id: params.projectID,
    });

    if (!project) {
      return NextResponse.json(
        {
          status: "error",
          message: "Project not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        project,
        status: 200,
      });
    }
  } catch (error: any) {
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

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
