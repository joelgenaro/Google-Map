import { NextRequest } from "next/server";
import checkEmail from "./checkEmail";

export async function POST(req: Request) {}

export async function GET(
  req: NextRequest,
) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('email');

  if (query === null || typeof query !== 'string') {
    return new Response('Email is required', { status: 400 });
  }
  
  return checkEmail(query);
}

export async function PUT(req: Request) {}
