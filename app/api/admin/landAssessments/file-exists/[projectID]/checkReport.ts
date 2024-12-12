import { auth } from '@/auth';
import { env } from '@/env';
import { isAdmin } from '@/lib/helper';
import {
  GetObjectCommand,
  HeadObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function CheckReport({
  params,
}: {
  params: { projectID: string };
}) {
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
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: 'You are not logged in' },
        { status: 401 }
      );
    }

    const bucketName = env.AWS_BUCKET_NAME_GEOJSON;
    const reportKey = `${params.projectID}/report.pdf`;

    // Check if report.pdf exists in the S3 bucket
    const headObjectCommand = new HeadObjectCommand({
      Bucket: bucketName,
      Key: reportKey,
    });
    await s3Client.send(headObjectCommand);

    // Generate a signed URL for secure access if the file exists
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: reportKey,
    });
    const url = await getSignedUrl(s3Client, getObjectCommand, {
      expiresIn: 3600,
    });

    return NextResponse.json({ exists: true, url }, { status: 200 });
  } catch (error: unknown) {
    const e = error as Error;
    if (e.name === 'NotFound') {
      // File not found, proceed with sending an email
      return NextResponse.json({ exists: false }, { status: 404 });
    } else {
      // Handle other errors
      console.error('Error checking report availability:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
}