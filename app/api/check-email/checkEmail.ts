import { RetrieveUser } from '@/database/services';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export default async function checkEmail(email: string) {
  try {
    const user = await RetrieveUser(email);

    // If the user exists, return a response with exists: true
    if (user) {
      return NextResponse.json({ exists: true });
    }

    // If the user doesn't exist, return a response with exists: false
    return NextResponse.json({ exists: false });
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
