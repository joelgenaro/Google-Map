import { S3Client, HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from "@/env";

// Initialize S3 client
const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(req: NextRequest, { params }: { params: { projectID: string } }) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: 'You are not logged in' }, { status: 401 });
    }

    const bucketName = env.AWS_BUCKET_NAME_GEOJSON;
    const reportKey = `${params.projectID}/report.pdf`;

    // Check if report.pdf exists in the S3 bucket
    const headObjectCommand = new HeadObjectCommand({ Bucket: bucketName, Key: reportKey });
    await s3Client.send(headObjectCommand);

    // Generate a signed URL for secure access if the file exists
    const getObjectCommand = new GetObjectCommand({ Bucket: bucketName, Key: reportKey, ResponseContentDisposition: `attachment; filename=${reportKey}` });
    const url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });

    return NextResponse.json({ available: true, url }, { status: 200 });
  } catch (error: unknown) {
    const e = error as Error;
    if (e.name === 'NotFound') {
      // File not found, proceed with sending an email
      return NextResponse.json({ available: false }, { status: 404 });
    } else {
      // Handle other errors
      console.error('Error checking report availability:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
}