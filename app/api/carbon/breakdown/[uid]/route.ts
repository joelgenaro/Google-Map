import { auth } from '@/auth';
import { env } from '@/env';
import { RawProjectAreaBreakdown } from '@/lib/mock/project-area-breakdown';
import handleError from '@/lib/utils/generic-api-exception-handler';
import { NextResponse } from 'next/server';

async function fetchCarbonBreakdown(
  uid: string
): Promise<RawProjectAreaBreakdown> {
  const naturEndpointUrl = env.NATUR_ENDPOINT_URL;

  if (!naturEndpointUrl) {
    throw new Error(
      'Natur Endpoint URL is not defined in environment variables'
    );
  }

  const url = `${naturEndpointUrl}/carbon/breakdown/${uid}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = (await response.json()) as RawProjectAreaBreakdown;

    if (!data || Object.keys(data).length === 0) {
      throw new Error('Failed to fetch carbon breakdown data');
    }

    return data;
  } catch (error) {
    const errorObj = error as Error;
    console.error('Error fetching carbon breakdown:', errorObj.message);
    throw errorObj.message;
  }
}

export async function GET(
  req: Request,
  { params }: { params: { uid: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'You are not logged in' },
        { status: 401 }
      );
    }

    // Extract the UID from the URL parameters
    const { uid } = params;

    const data = await fetchCarbonBreakdown(uid);

    // Return the fetched data as a response
    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}
