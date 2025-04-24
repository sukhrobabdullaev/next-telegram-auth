import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function generateToken(
  adminId: string,
  name: string,
  email: string,
  role: "admin" | "user"
) {
  console.log("generateToken", adminId, name, email, role);
  return jwt.sign({ adminId, name, email, role }, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
