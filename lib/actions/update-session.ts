"use server";

import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "@/lib/jwt";

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  if (!parsed) {
    return;
  }
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: new Date(Date.now() + 86400 * 1000),
  });
  return res;
}
