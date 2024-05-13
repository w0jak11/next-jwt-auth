"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { JWTSession } from "@/lib/types";

export async function getSession(): Promise<JWTSession | null> {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
