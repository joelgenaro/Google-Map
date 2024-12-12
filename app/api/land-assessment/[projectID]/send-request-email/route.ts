import { NextRequest } from "next/server";
import { SendRequestEmail } from "./sendRequestEmail";

export async function POST(
  req: NextRequest,
  { params }: { params: { projectID: string } }
) {
  return SendRequestEmail(req, params.projectID);
}
