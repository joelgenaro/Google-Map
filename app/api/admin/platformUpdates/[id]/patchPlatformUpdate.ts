import { auth } from '@/auth';
import { updatePlatformUpdate } from '@/database/services';
import { isAdmin } from '@/lib/helper';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export default async function patchPlatformUpdate(
  req: Request,
  recordId: string
) {
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

  const { message, startDate, endDate, enabled, createdAt } = await req.json();
  const platformData = {
    id: recordId,
    message,
    startDate: new Date(startDate).toISOString().slice(0, 10),
    endDate: new Date(endDate),
    enabled,
    createdAt,
    updatedAt: new Date(),
    updatedBy: session.user.name,
  };
  try {
    updatePlatformUpdate(platformData);

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
