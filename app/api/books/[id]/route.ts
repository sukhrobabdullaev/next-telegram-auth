import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/book";
import { adminMiddleware } from "@/middleware/auth";
import Category from "@/models/category";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectToDatabase();
    const book = await Book.findById(id).populate("category", "name slug");
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    return NextResponse.json({ error: "Error fetching book" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectToDatabase();
    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;

    const body = await req.json();

    const { title, description, price, category, stock, coverImage } = body;

    const updateData: Record<string, any> = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = parseFloat(price);
    if (category) updateData.category = category;
    if (stock) updateData.stock = parseInt(stock);
    if (coverImage) updateData.coverImage = coverImage;

    const book = await Book.findByIdAndUpdate(id, updateData, { new: true });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    return NextResponse.json({ error: "Error updating book" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectToDatabase();
    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;

    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    await Category.findByIdAndUpdate(
      book.category,
      { $pull: { books: book._id } },
      { session }
    );

    await Book.findByIdAndDelete(id, { session });

    await session.commitTransaction();
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    console.error(`Error deleting book with id ${id}:`, error);
    return NextResponse.json({ error: "Error deleting book" }, { status: 500 });
  } finally {
    session.endSession();
  }
}
