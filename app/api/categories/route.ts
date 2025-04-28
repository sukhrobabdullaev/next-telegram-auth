import { NextResponse } from "next/server";
import Category from "@/models/category";
import { adminMiddleware } from "@/middleware/auth";
import { connectToDatabase } from "@/lib/mogoose";

// GET all categories
export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({
      createdAt: -1,
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}

// POST new category
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, description } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    const category = new Category({
      name,
      description,
    });

    await category.save();
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    );
  }
}
