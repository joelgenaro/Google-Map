import { env } from '@/env';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function DeleteReport({
  projectID,
}: {
  projectID: string;
}) {
  const bucketName = env.AWS_BUCKET_NAME_GEOJSON;
  const reportKey = `${projectID}/report.pdf`;

  try {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: reportKey,
    });
    await s3Client.send(deleteObjectCommand);

    return NextResponse.json({ isSuccess: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { isSuccess: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
