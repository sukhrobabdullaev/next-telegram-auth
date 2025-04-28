import { IBook } from "@/models/book";
import { getSession } from "./auth";

interface PaginatedResponse {
  books: IBook[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getBooks = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse> => {
  const response = await fetch(`/api/books?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};

export const getBookById = async (id: string): Promise<IBook> => {
  const response = await fetch(`/api/books/${id}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }
  return response.json();
};

export const updateBook = async (id: string, data: any): Promise<IBook> => {
  const session = await getSession();
  const response = await fetch(`/api/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update book");
  }
  return response.json();
};

export const createBook = async (data: any): Promise<IBook> => {
  const session = await getSession();
  const response = await fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create book");
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
