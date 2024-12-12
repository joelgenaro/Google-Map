import { auth } from '@/auth';
import { env } from '@/env';
import handleError from '@/lib/utils/generic-api-exception-handler';
import { NextResponse } from 'next/server';

async function fetchSeedsSpecies(body: any) {
  const naturEndpointUrl = env.NATUR_ENDPOINT_URL;

  if (!naturEndpointUrl) {
    throw new Error(
      'Natur Endpoint URL is not defined in environment variables'
    );
  }

  const url = `${naturEndpointUrl}/seeds/list-species`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    const errorObj = error as Error;
    console.error('Error fetching seeds species list:', errorObj.message);
    throw errorObj.message;
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'You are not logged in' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await req.json();

    // Fetch the seeds species using the parsed body
    const data = await fetchSeedsSpecies(body);

    // Return the fetched data as a response
    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}
