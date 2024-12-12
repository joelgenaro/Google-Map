import { auth } from '@/auth';
import PlatformUpdatesBanner from '@/components/custom/PlatformUpdatesBanner';
import { HubCard } from '@/components/custom/hubCard';
import { NewsPaper, Video } from '@/components/icons';
import { getAllPlatformUpdate as dbGetAllPlatformUpdate } from '@/database/services';
import { PlatformUpdate } from '@/database/types';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { columns } from './_table/columns';
import { peroperties } from './_table/data';
import { DataTable } from './_table/data-table';

async function getAllPlatformUpdate(session: Session | null) {
  if (!session || !session?.user || !session.user?.id) {
    return NextResponse.json(
      { message: 'You are not logged in' },
      { status: 401 }
    );
  }
  try {
    const platformUpdates = await dbGetAllPlatformUpdate();
    return NextResponse.json(platformUpdates, { status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export default async function Home() {
  const session = await auth();
  const data = peroperties;
  const getAllPlatformUpdateRes = await getAllPlatformUpdate(session);
  const platformUpdates =
    (await getAllPlatformUpdateRes.json()) as PlatformUpdate[];

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="w-full px-3 pt-28 lg:pt-32 2xl:mx-auto 2xl:max-w-screen-2xl">
      <PlatformUpdatesBanner platformUpdates={platformUpdates} />
      <div className="grid max-h-[calc(100vh-7rem)] grid-cols-12 gap-6 md:pb-16 lg:max-h-[calc(100vh-8rem)]">
        <HubCard
          className="col-span-12 max-h-52 md:order-2 md:col-span-4"
          Icon={NewsPaper}
          Description="Carbon Sequestered"
        />
        <HubCard
          className="col-span-12 max-h-52 md:order-2 md:col-span-4"
          Icon={NewsPaper}
          Description="Carbon Updates RSS Feed"
        />
        <HubCard
          className="col-span-12 max-h-52 md:order-2 md:col-span-4"
          Icon={Video}
          Description="Carbon Sequestered"
        />
        <div className="order-1 col-span-12 row-span-8 h-120 max-h-120 md:col-span-8 md:h-full">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
