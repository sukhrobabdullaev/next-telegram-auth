"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { createBook } from "@/actions/book"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ICategory } from "@/models/category"

export default function AddBookPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) throw new Error("Failed to fetch categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast.error("Failed to fetch categories")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit clicked"); // Add this
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    console.log("formData:", formData);
    try {
      await createBook(formData);
      toast.success("Book created successfully");
      router.push("/dashboard/books");
    } catch (error: any) {
      toast.error(error.message || "Failed to create book");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/books">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Add New Book</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Book Details</CardTitle>
              <CardDescription>Enter the details of the book you want to add to your inventory.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Enter book title" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" placeholder="19.99" type="number" step="0.01" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input id="stock" name="stock" placeholder="10" type="number" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Book Image & Description</CardTitle>
              <CardDescription>Upload an image and provide a detailed description of the book.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Book Cover Image</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 h-40">
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Book cover preview"
                        className="w-full h-full object-contain"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => {
                          setImagePreview(null)
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Drag and drop or click to upload</p>
                      <Input
                        id="image"
                        name="coverImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />

                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        Select Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter a detailed description of the book..." rows={6} required />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/books")}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Book"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
