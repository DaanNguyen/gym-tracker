import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const secret: string = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured in .env!");
  }
  return secret;
})();

/**
 * Generates a JWT token for a given user ID.
 */
export function generateToken(userId: string): string {
  return jwt.sign(
    { userId }, 
    secret, 
    { expiresIn: "1h" }
  );
}

/**
 * Verifies a JWT token and returns the payload.
 * @throws jwt.JsonWebTokenError | Error if token is invalid.
 */
export function verifyToken(token: string): CustomJwtPayload {
  const payload = jwt.verify(token, secret);
  if (typeof payload === "string" || !payload.userId) {
    throw new jwt.JsonWebTokenError("Invalid token");
  }
  return payload as CustomJwtPayload;
}