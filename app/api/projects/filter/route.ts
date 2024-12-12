import { FilterValues } from '@/lib/types/filter-bar.type';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  console.log('>>>>>>>>>> Triggered POST /api/projects/filter <<<<<<<<<<');
  const requestBody = (await req.json()) as FilterValues;
  console.log('>>>>>>>>>> Request body >>>>>>>>>>', requestBody);
  return NextResponse.json({
    message: 'Received request fo filtering projects',
  });
};
