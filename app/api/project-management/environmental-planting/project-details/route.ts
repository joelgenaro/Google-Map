import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { InsertProjectManagement } from "@/database/services";
import { projectManagementSchema } from "@/lib/project-management-schema";

export async function POST(req: Request) {
  try {
    const { userId, projectName, landholderName, address } = projectManagementSchema.parse(
      await req.json()
    );

    const project = await InsertProjectManagement({
      userId,
      projectName,
      landholderName,
      address
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