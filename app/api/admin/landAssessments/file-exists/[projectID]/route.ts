import CheckReport from './checkReport';
import DeleteReport from './deleteReport';

export async function POST(req: Request) {}

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  return await CheckReport({ params });
}

export async function PUT(req: Request) {}

export async function DELETE(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  return await DeleteReport({ projectID: params.projectID });
}
