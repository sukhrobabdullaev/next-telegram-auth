// /app/api/books/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/book";
import Category from "@/models/category";
import { adminMiddleware } from "@/middleware/auth";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;

    const body = await req.json();

    const { title, description, price, category, stock = 0, coverImage } = body;

    // Validate required fields
    if (!title || !description || !price || !category || !coverImage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Create the book
    const book = await Book.create({
      title,
      description,
      price,
      coverImage,
      category,
      stock,
    });

    // Add book to category
    await Category.findByIdAndUpdate(category, {
      $push: { books: book._id },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/books:", error);
    return NextResponse.json({ error: "Error creating book" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const books = await Book.find().populate("category", "name");
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/books:", error);
    return NextResponse.json(
      { error: "Error fetching books" },
      { status: 500 }
    );
  }
}

