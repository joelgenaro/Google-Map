import { CreateActivity } from "./createActivity";
import { GetAllActivities } from "./getAllActivities";


export async function POST(
  req: Request,
) {
  return CreateActivity(req);
}

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  return GetAllActivities(params.projectID);
}
