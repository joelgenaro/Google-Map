import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

const handleError = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { message: 'Validation failed', errors: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
};

export default handleError;
