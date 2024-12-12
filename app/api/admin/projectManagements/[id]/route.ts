import getProjectManagement from "./getProjectManagement";

export async function POST(req: Request) {}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return getProjectManagement(params.id);
}

export async function PUT(req: Request) {}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
}
