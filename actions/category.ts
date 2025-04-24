import { getSession } from "./auth";
import { ICategory } from "@/models/category";

export const getCategories = async (): Promise<ICategory[]> => {
  const response = await fetch(`/api/categories`);
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

export const getCategoryById = async (id: string): Promise<ICategory> => {
  const session = await getSession();
  const response = await fetch(`/api/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
};

export const updateCategory = async (id: string, formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const response = await fetch(`/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return response.json();
};

export const createCategory = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const response = await fetch(`/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
};

export const deleteCategory = async (id: string) => {
  const response = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }

  return response.json();
};
