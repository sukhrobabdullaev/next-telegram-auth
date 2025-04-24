import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/category";
import { adminMiddleware } from "@/middleware/auth";

// GET single category
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching category" },
      { status: 500 }
    );
  }
}

// UPDATE category
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  
  try {
    await connectToDatabase();
    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;

    const body = await req.json();
    const category = await Category.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    );
  }
}
