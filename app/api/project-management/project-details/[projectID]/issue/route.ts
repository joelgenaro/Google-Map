import { CreateIssue } from "./createIssue";
import { GetAllIssue } from "./getAllIssues";


export async function POST(
  req: Request,
) {
  return CreateIssue(req);
}

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  return GetAllIssue(params.projectID);
}
