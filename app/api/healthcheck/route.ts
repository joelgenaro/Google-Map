import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Add any necessary checks here in order to determine if the application is healthy
    // For example, you could check database connectivity, external services, etc.
    // If everything is fine, return a 200 status
    return NextResponse.json(
      { status: 'ok', message: 'natur-app is running' },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Log the error for debugging purposes
    console.error('Health check failed:', error);
    // If something goes wrong, return a 500 status
    return NextResponse.json(
      { status: 'error', message: (error as Error).message },
      { status: 500 }
    );
  }
}
