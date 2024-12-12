import {
  GetLandAssessmentCarbonExclusionArea,
  InsertLandAssessmentCarbonExclusionArea,
  UpdateLandAssessmentCarbonExclusionArea,
} from '@/database/services';
import { env } from '@/env';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  region: env.AWS_REGION,
});

async function uploadToS3(file: File, key: string) {
  const arrayBuffer = await file.arrayBuffer();
  const uploadCommand = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME_GEOJSON,
    Key: key,
    Body: Buffer.from(arrayBuffer),
    ContentType: 'application/geo+json',
  });

  await s3Client.send(uploadCommand);
}

const triggerLandAssessmentApi = async (uid: string) => {
  const naturEndpointUrl = env.NATUR_ENDPOINT_URL;

  const url = `${naturEndpointUrl}/land-assessment?uid=${uid}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to process: ${response.statusText}`);
    }

    const data = (await response.json()) as string;

    return data;
  } catch (error) {
    console.error('Error processing land assessment:', error);
    throw error;
  }
};

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  try {
    const exclusion = GetLandAssessmentCarbonExclusionArea(
      params.projectID as string
    );

    if (!exclusion) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Exclusion Areas not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        exclusion,
        status: 200,
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Internal Server Error',
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
    const reqData = await req.formData();
    const userId = reqData.get('userId') as string;
    const data = reqData.get('data');
    const firstStepData: File | null = reqData.get(
      'firstStepData'
    ) as File | null;
    const secondStepData: File | null = reqData.get(
      'secondStepData'
    ) as File | null;
    const thirdStepData: File | null = reqData.get(
      'thirdStepData'
    ) as File | null;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    // Upload data to S3
    await Promise.all([
      firstStepData &&
        uploadToS3(
          firstStepData,
          `${params.projectID}/property_boundary.geojson`
        ),
      secondStepData &&
        uploadToS3(secondStepData, `${params.projectID}/project_area.geojson`),
      thirdStepData &&
        uploadToS3(
          thirdStepData,
          `${params.projectID}/exclusion_zones.geojson`
        ),
    ]);

    const exclusion = await InsertLandAssessmentCarbonExclusionArea({
      userId,
      data: JSON.parse(data?.toString() ?? '{}'),
      id: params.projectID,
    });

    await triggerLandAssessmentApi(params.projectID);

    if (!exclusion) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Project not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        exclusion,
        status: 200,
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Internal Server Error',
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
    const reqData = await req.formData();
    const userId = reqData.get('userId') as string;
    const data = reqData.get('data');
    const firstStepData: File | null = reqData.get(
      'firstStepData'
    ) as File | null;
    const secondStepData: File | null = reqData.get(
      'secondStepData'
    ) as File | null;
    const thirdStepData: File | null = reqData.get(
      'thirdStepData'
    ) as File | null;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    // Upload data to S3
    await Promise.all([
      firstStepData &&
        uploadToS3(
          firstStepData,
          `${params.projectID}/property_boundary.geojson`
        ),
      secondStepData &&
        uploadToS3(secondStepData, `${params.projectID}/project_area.geojson`),
      thirdStepData &&
        uploadToS3(
          thirdStepData,
          `${params.projectID}/exclusion_zones.geojson`
        ),
    ]);

    await triggerLandAssessmentApi(params.projectID);

    const exclusion = await UpdateLandAssessmentCarbonExclusionArea(
      params.projectID,
      {
        userId,
        data,
        id: params.projectID,
      }
    );

    if (!exclusion) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Project not found',
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        exclusion,
        status: 200,
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
