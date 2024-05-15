import { SignJWT, jwtVerify } from "jose";
import { JWTSession } from "@/lib/types";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<JWTSession | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as JWTSession;
  } catch {
    return null;
  }
}
