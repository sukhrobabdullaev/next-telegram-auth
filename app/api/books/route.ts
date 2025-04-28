import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mogoose";
import Book from "@/models/book";
import Category from "@/models/category";
import { adminMiddleware } from "@/middleware/auth";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;

    const body = await req.json();

    const { title, description, author, publisher, publicationDate, images, ISBN, price, stock, category } = body;

    // Validate required fields
    if (!title || !description || !price || !category || !author || !publisher || !publicationDate || !images || !ISBN || !stock) {
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
      author,
      publisher,
      publicationDate,
      images,
      ISBN,
      price,
      stock,
      category,
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

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      Book.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category", "name slug"),
      Book.countDocuments(),
    ]);

    return NextResponse.json({
      books,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching books" },
      { status: 500 }
    );
  }
}
