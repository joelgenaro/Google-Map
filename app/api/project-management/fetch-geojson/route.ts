import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { env } from '@/env';
import { parse } from 'url';
import { NextRequest, NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(req: NextRequest) {
  if (!req.url) {
    return NextResponse.json({ error: 'Invalid request URL' }, { status: 400 });
  }

  const { query } = parse(req.url, true);

  let { fileName } = query;
  const bucketName = env.AWS_BUCKET_NAME_PROJECT_MANAGEMENT;

  if (typeof fileName !== 'string') {
    return NextResponse.json(
      { error: 'Invalid query parameters' },
      { status: 400 }
    );
  }

  if (fileName.startsWith(bucketName)) {
    fileName = fileName.slice(bucketName.length + 1);
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });

  try {
    const response = await s3Client.send(command);

    if (!response.Body) {
      return NextResponse.json(
        { error: 'No body in response' },
        { status: 500 }
      );
    }

    const stream = response.Body as Readable;
    let data = '';
    for await (const chunk of stream) {
      data += chunk.toString();
    }

    // Parse the file content as JSON
    const geoJson = JSON.parse(data);

    return NextResponse.json(geoJson, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
