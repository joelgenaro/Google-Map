import { CreateReport } from "./createReport";
import { GetAllReports } from "./getAllReports";

export async function POST(
  req: Request,
) {
  return CreateReport(req);
}

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  return GetAllReports(params.projectID);
}
