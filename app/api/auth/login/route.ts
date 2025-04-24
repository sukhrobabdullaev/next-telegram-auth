import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mogoose";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/auth";

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();
  const { email, password } = body;

  const admin = await Admin.findOne({ email });
  
  if (!admin) {
    return NextResponse.json({ message: "Invalid email" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const token = generateToken(
    admin._id.toString(),
    admin.name,
    admin.email,
    admin.role as "admin" | "user"
  );
  return NextResponse.json({ token });
}
