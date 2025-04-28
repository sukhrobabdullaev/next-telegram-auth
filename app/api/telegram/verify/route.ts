// /app/api/verify-otp/route.ts
import { connectToDatabase } from "@/lib/mogoose";
import Otp from "@/models/otp";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const rawBody = await req.text();

    if (!rawBody) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      console.error("Invalid JSON received:", rawBody);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    if (!body.otp) {
      return NextResponse.json({ error: "OTP is required" }, { status: 400 });
    }

    const { otp } = body;
    console.log("Verifying OTP:", otp);

    const record = await Otp.findOne({ otp: otp });

    if (!record) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: record._id });
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    await Otp.deleteOne({ _id: record._id });

    const token = jwt.sign(
      {
        phoneNumber: record.phoneNumber,
        telegramData: record.telegramData,
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      success: true,
      phoneNumber: record.phoneNumber,
      telegramData: record.telegramData,
      token: token,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
