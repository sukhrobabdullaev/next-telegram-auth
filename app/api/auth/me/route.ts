import { connectToDatabase } from "@/lib/mogoose";
import { NextResponse } from "next/server";
import Admin from "@/models/admin";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  await connectToDatabase();

  const session = request.headers.get("Authorization")?.split(" ")[1];

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(session, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

    const admin = await Admin.findOne({ email: decoded.email }).select(
      "-password"
    );
    if (!admin) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(admin);
    return NextResponse.json({
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
