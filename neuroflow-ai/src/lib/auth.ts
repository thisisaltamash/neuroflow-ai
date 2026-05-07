import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const tokenName = "neuroflow_admin_token";

export async function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  if (email.toLowerCase() !== adminEmail.toLowerCase()) return false;

  // Allow either plaintext or hashed admin password in env.
  if (adminPassword.startsWith("$2a$") || adminPassword.startsWith("$2b$")) {
    return bcrypt.compare(password, adminPassword);
  }
  return password === adminPassword;
}

export function signAdminToken(payload: { email: string }) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing.");
  return jwt.sign(payload, secret, { expiresIn: "2d" });
}

export function verifyAdminToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing.");
  return jwt.verify(token, secret);
}

export async function getAdminSession() {
  const store = await cookies();
  const token = store.get(tokenName)?.value;
  if (!token) return null;
  try {
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

export const adminCookieName = tokenName;
