import { auth } from '@/auth';
import generatePresignedUrl from '@/lib/utils/generate-presigned-url';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session || !session?.user || !session.user?.id) {
    return NextResponse.json(
      { message: 'You are not logged in' },
      { status: 401 }
    );
  }

  const imageSrcStr = req.nextUrl.searchParams.get('imageSrcStr');

  if (!imageSrcStr) {
    return NextResponse.json(
      { message: 'Image source string is required' },
      { status: 400 }
    );
  }

  // Call the getPresignedUrl function and await its result
  const { url, message, status } = await generatePresignedUrl(imageSrcStr);

  // Check if the url was generated successfully
  if (url) {
    return NextResponse.json({ url, message, status }, { status });
  } else {
    // If the URL wasn't generated, respond with the error message and status
    return NextResponse.json({ message, status }, { status });
  }
}
