import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/book";
import { adminMiddleware } from "@/middleware/auth";
import { parseForm } from "@/lib/formidable";
import path from "path";
import Category from "@/models/category";
import mongoose from "mongoose";

export const config = {
  api: {
    bodyParser: false,
  },
};

// GET single book with category population
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const book = await Book.findById(id).populate("category", "name slug");
    console.log("zfound book", book);
    if (!book) {
      console.log(`Book with id ${id} not found`);
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    return NextResponse.json({ error: "Error fetching book" }, { status: 500 });
  }
}

// UPDATE book with optional file upload
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  
  try {
    await connectToDatabase();
    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;

    const { fields, files } = await parseForm(req as any);

    // Process form fields (convert arrays to single values)
    const updateData: Record<string, any> = {};

    if (fields.title) updateData.title = fields.title[0];
    if (fields.description) updateData.description = fields.description[0];
    if (fields.price) updateData.price = parseFloat(fields.price[0]);
    if (fields.category) updateData.category = fields.category[0];
    if (fields.stock) updateData.stock = parseInt(fields.stock[0], 10);

    // Handle file upload if provided
    if (files.coverImage && files.coverImage.length > 0) {
      const coverImage = files.coverImage[0];
      updateData.coverImage = `/uploads/${path.basename(coverImage.filepath)}`;
    }

    const book = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!book) {
      console.log(`Book with id ${id} not found`);
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    return NextResponse.json({ error: "Error updating book" }, { status: 500 });
  }
}

// DELETE book
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectToDatabase();
    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;
    console.log("deleting book", id);
    // Find the book first to get its category
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Remove book from category's books array
    await Category.findByIdAndUpdate(
      book.category,
      { $pull: { books: book._id } },
      { session }
    );

    // Delete the book
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
