import { auth } from '@/auth';
import CreateButton from '@/components/custom/SeedsNearMe/Common/CreateButton';
import DataTable from '@/components/custom/SeedsNearMe/DataTable';
import dataTableDefinition from '@/components/custom/SeedsNearMe/DataTableDefinition';
import { getAllSeedsRequest as dbGetAllSeedsRequest } from '@/database/services';
import { SeedsRequestWithProjectData } from '@/database/types';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

const getAllSeedsRequest = async (session: Session | null) => {
  if (!session || !session?.user || !session.user?.id) {
    return NextResponse.json(
      { message: 'You are not logged in' },
      { status: 401 }
    );
  }
  try {
    const seedsRequest = await dbGetAllSeedsRequest(session.user.id);
    return NextResponse.json(seedsRequest, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || 'Internal Server Error' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

const SeedsNearMePage = async () => {
  const session = await auth();
  const getAllSeedsRequestRes = await getAllSeedsRequest(session);
  const allSeedsRequest =
    (await getAllSeedsRequestRes.json()) as SeedsRequestWithProjectData[];

  return (
    <div className="w-full flex-1 px-4 lg:px-0">
      <div className="flex flex-1 items-center justify-end">
        <CreateButton />
      </div>
      <DataTable columns={dataTableDefinition} data={allSeedsRequest} />
    </div>
  );
};

export default SeedsNearMePage;
