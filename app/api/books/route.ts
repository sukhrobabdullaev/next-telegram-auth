import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/book";
import Category from "@/models/category";
import { adminMiddleware } from "@/middleware/auth";
import { parseForm } from "@/lib/formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

// GET all books with category population
export async function GET() {
  try {
    await connectToDatabase();
    const books = await Book.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 });
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error in GET /api/books:", error);
    return NextResponse.json(
      { error: "Error fetching books" },
      { status: 500 }
    );
  }
}

// POST new book with file upload
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const isAdmin = await adminMiddleware(req as any);
    if (isAdmin.status !== 200) return isAdmin;

    const { fields, files } = await parseForm(req as any);

    // Validate required fields
    if (
      !fields.title?.[0] ||
      !fields.description?.[0] ||
      !fields.price?.[0] ||
      !fields.category?.[0]
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate category exists
    const category = await Category.findById(fields.category[0]);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Handle file upload
    const coverImages = files.coverImage;
    if (!coverImages || coverImages.length === 0) {
      return NextResponse.json(
        { error: "Cover image is required" },
        { status: 400 }
      );
    }

    const coverImage = coverImages[0];

    // Process form fields (convert arrays to single values)
    const bookData = {
      title: fields.title[0],
      description: fields.description[0],
      price: parseFloat(fields.price[0]),
      category: fields.category[0],
      stock: parseInt(fields.stock?.[0] ?? "0", 10),
      coverImage: `/uploads/${path.basename(coverImage.filepath)}`,
    };

    // Create the book
    const book = await Book.create(bookData);
    console.log(book);
    // Update the category's books array
    await Category.findByIdAndUpdate(fields.category[0], {
      $push: { books: book._id },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating book" }, { status: 500 });
  }
}
