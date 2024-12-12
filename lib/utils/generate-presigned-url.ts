import { env } from '@/env';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface PresignedUrlResponse {
  url?: string;
  message: string;
  status: number;
}

/**
 * Generates a presigned URL for a specified image in an S3 bucket.
 * The URL provides temporary access to the image.
 *
 * @param {string} imageSrcStr - A string that includes the bucket name and filename in the format 'bucket-name/filename-of-image'.
 * @returns {Promise<Object>} A promise that resolves to an object containing the presigned URL of the image
 *                            and a message, or an error message and status code if an error occurs.
 * @example
 * // Example usage:
 * getPresignedUrl('my-bucket/my-image-filename')
 *   .then(result => {
 *     if (result.url) {
 *       console.log('Presigned URL:', result.url);
 *     } else {
 *       console.log('Error message:', result.message);
 *     }
 *   })
 *   .catch(error => console.error('Error:', error));
 *
 * @description
 * This function expects the image string to be in the format "bucket-name/filename-of-image",
 * where "filename-of-image" is the key under which the file is stored in the S3 bucket.
 * The function uses a regex to extract the filename from the provided string. If the extraction is
 * successful, it generates a presigned URL that is valid for 1 hour (3600 seconds). If the extraction
 * fails, it returns an object with an error message and a 400 status code. If generating the presigned
 * URL fails, it returns an object with the error message and a 500 status code.
 */
const generatePresignedUrl = async (
  imageSrcStr: string
): Promise<PresignedUrlResponse> => {
  // Use the regex to perform the match
  const filenameRegex = /\/(.+)$/;
  const match = imageSrcStr.match(filenameRegex);

  // Extract the text after the slash
  const filename = match ? match[1] : null;

  if (!filename)
    return {
      message: 'Filename not found in the image source string',
      status: 400,
    };

  const s3Client = new S3Client({
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
    region: env.AWS_REGION,
  });

  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME_PROFILE_IMGS,
    Key: filename,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return {
      url,
      message: 'Presigned URL generated successfully',
      status: 200,
    };
  } catch (error) {
    console.error('Failed to generate presigned URL:', error);
    return { message: String(error), status: 500 };
  }
};

export default generatePresignedUrl;
