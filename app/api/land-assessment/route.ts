import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { landAssessmentNewProjectSchema } from "@/lib/assessment-project-schema";
import {
  GetLandAssessmentProjects,
  InsertLandAssessmentNewProject,
} from "@/database/services";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse(
        JSON.stringify({ status: 'fail', message: 'You are not logged in' }),
        { status: 401 }
      );
    }
    
    const result = await GetLandAssessmentProjects(session.user.id);

    if (!result) {
      return NextResponse.json(
        {
          status: "error",
          message: "Projects not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        result,
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

export async function POST(req: Request) {
  try {
    const { userId, projectName, data } = landAssessmentNewProjectSchema.parse(
      await req.json()
    );

    const project = await InsertLandAssessmentNewProject({
      userId,
      projectName,
      data,
    });

    return NextResponse.json({
      projectID: project.id,
    });
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
