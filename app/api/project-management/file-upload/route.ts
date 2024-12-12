import { env } from '@/env';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  region: env.AWS_REGION,
});

export async function POST(req: Request) {
  try {
    const reqData = await req.formData();
    const projectId = reqData.get('projectId');
    const saveFileName = reqData.get('saveFileName');
    const file: File | null = reqData.get('file') as File | null;

    if (!projectId) {
      return NextResponse.json({ error: 'Invalid projectId' }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json(
        { error: 'Invalid added file' },
        { status: 400 }
      );
    }

    const fileName = `${projectId}/${saveFileName}`;
    const bucketName = env.AWS_BUCKET_NAME_PROJECT_MANAGEMENT;
    const arrayBuffer = await file.arrayBuffer();

    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type || 'application/octet-stream',
    });

    await s3Client.send(uploadCommand);
    const uploadedFileName = `${bucketName}/${fileName}`;
    return NextResponse.json({
      uploadedFileName,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}