import { GetAlert } from './getAlert';
import { UpdateAlert } from './updateAlert';

export async function PATCH(
  req: Request,
  { params }: { params: { alertID: string } }
) {
  return UpdateAlert(req, params.alertID);
}

export async function GET(
  req: Request
) {
  const {params} = await req.json();
  return GetAlert(params.alertID);
}