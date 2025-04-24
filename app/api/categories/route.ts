import { NextResponse } from "next/server";
import Category from "@/models/category";
import { adminMiddleware } from "@/middleware/auth";
import { connectToDatabase } from "@/lib/mongodb";

// GET all categories
export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().populate("books", "title").sort({
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
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;

    const body = await req.json();

    // Generate slug from name if not provided
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/\s+/g, "-");
    }

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    // Check if category with same name/slug already exists
    const existingCategory = await Category.findOne({
      $or: [{ name: body.name }, { slug: body.slug }],
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category with this name or slug already exists" },
        { status: 400 }
      );
    }

    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error("Error creating category:", error);
    // Return more specific error message
    const errorMessage =
      error.code === 11000
        ? "Category with this name or slug already exists"
        : "Error creating category";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
