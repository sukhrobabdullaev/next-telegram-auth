import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface IUserDecoded {
  id: string;
  email: string;
  role: string;
}

export async function adminMiddleware(req: Request) {
  try {
    const session = req.headers.get("Authorization")?.split(" ")[1];

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - No token" },
        { status: 401 }
      );
    }

    const userDecoded: IUserDecoded = jwt.verify(
      session,
      process.env.JWT_SECRET as string
    ) as IUserDecoded;

    if (userDecoded.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "Authorized" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error checking authorization" },
      { status: 500 }
    );
  }
}
