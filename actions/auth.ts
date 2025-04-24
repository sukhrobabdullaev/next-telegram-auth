"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResult = {
  success: boolean;
  error?: string;
};

type UserProfile = {
  name: string;
  email: string;
  role: string;
};

export async function login(
  credentials: LoginCredentials
): Promise<LoginResult> {
  try {
    // Replace with your actual authentication logic
    const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      cache: "no-store",
    });

    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Invalid credentials",
      };
    }

    // Set a secure HTTP-only cookie instead of localStorage
    const cookiesInstance = await cookies();
    cookiesInstance.set({
      name: "admin-session",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      // Set appropriate expiration
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Authentication failed. Please try again.",
    };
  }
}

export async function logout() {
  const cookiesInstance = await cookies();
  cookiesInstance.delete("admin-session");
  redirect("/login");
}

export async function getSession() {
  const cookiesInstance = await cookies();
  const session = cookiesInstance.get("admin-session");
  return session?.value;
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const session = await getSession();
  if (!session) {
    return null;
  }

  try {
    // In a real app, you would fetch the user profile from your API
    // using the session token for authentication
    const response = await fetch(`${process.env.API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

// Profile update schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  bio: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export async function updateProfile(data: ProfileFormValues) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  try {
    const validatedData = profileSchema.parse(data);

    // In a real app, you would update the user profile via your API
    const response = await fetch(
      `${process.env.API_URL || "http://localhost:3000"}/api/users/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Failed to update profile",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string
) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  try {
    // In a real app, you would update the password via your API
    const response = await fetch(
      `${process.env.API_URL || "http://localhost:3000"}/api/users/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Failed to update password",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
