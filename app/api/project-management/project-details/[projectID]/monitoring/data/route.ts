import { CreateMonitoringData } from "./createMonitoringData";
import { GetAllMonitoringData } from "./getAllMonitoringData";

export async function POST(
  req: Request,
) {
  return CreateMonitoringData(req);
}

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  return GetAllMonitoringData(params.projectID);
}
