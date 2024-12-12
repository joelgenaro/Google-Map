import { ArchiveAlert } from './archiveAlert';

export async function PATCH(
  req: Request,
  { params }: { params: { alertID: string } }
) {
  return ArchiveAlert(params.alertID);
}
