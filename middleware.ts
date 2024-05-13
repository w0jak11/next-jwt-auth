import { NextRequest } from "next/server";
import { updateSession } from "./lib/actions/update-session";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
