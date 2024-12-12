import { GetAllAlerts } from './getAllAlerts';
import { ArchiveAllAlerts } from './archiveAllAlerts';

export async function PATCH(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  return ArchiveAllAlerts(params.projectID);
}

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  return GetAllAlerts(params.projectID);
}
