import { GetMonitoringData } from "./getMonitoringData";
import { UpdateMonitoringData } from "./updateMonitoringData";

export async function GET(
  req: Request,
  { params }: { params: { dataID: string } }
) {
  return GetMonitoringData(params.dataID);
}

export async function PATCH(
  req: Request,
  { params }: { params: { dataID: string } }
) {
  return UpdateMonitoringData(req, params.dataID);
}