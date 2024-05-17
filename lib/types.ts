import { JWTPayload } from "jose";

export interface JWTSession extends JWTPayload {
  credentials: {
    login: string;
  };
}
