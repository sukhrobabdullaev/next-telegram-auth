import { IBook } from "@/models/book";
import { getSession } from "./auth";

export const getBooks = async (): Promise<IBook[]> => {
  const session = await getSession();
  const response = await fetch("/api/books", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};

export const createBook = async (formData: FormData): Promise<IBook> => {
  const session = await getSession();
  const response = await fetch("/api/books", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session}`,
    },
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create book");
  }
  return response.json();
};

export const deleteBook = async (id: string): Promise<void> => {
  const session = await getSession();
  const response = await fetch(`/api/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete book");
  }
};
