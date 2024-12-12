import { auth } from '@/auth';
import { GetProjectManagement as dbGetProjectManagement } from '@/database/services';
import { isAdmin } from '@/lib/helper';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export default async function getProjectManagement(recordId: string) {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return NextResponse.json(
      { message: 'You are not logged in' },
      { status: 401 }
    );
  }

  if (!isAdmin(session)) {
    return NextResponse.json(
      { message: 'You are not an admin' },
      { status: 403 }
    );
  }

  try {
    const projectManagement = await dbGetProjectManagement(recordId);
    if (!projectManagement) {
      return NextResponse.json(
        {
          status: "error",
          message: "Project not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({ ...projectManagement }, { status: 200 });
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
