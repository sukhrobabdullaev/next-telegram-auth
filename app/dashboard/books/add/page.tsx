"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { createBook } from "@/actions/book"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ICategory } from "@/models/category"
import { UploadButton } from "@/lib/uploadthing";

export default function AddBookPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
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
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const body = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      author: formData.get('author') as string,
      publisher: formData.get('publisher') as string,
      publicationDate: formData.get('publicationDate') as string,
      ISBN: formData.get('ISBN') as string,
      price: formData.get('price') as string,
      category: formData.get('category') as string,
      stock: formData.get('stock') as string,
      images: [coverImageUrl, ...additionalImages].filter(Boolean) as string[],
    };

    try {
      await createBook(body);
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
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" placeholder="Enter author name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input id="publisher" name="publisher" placeholder="Enter publisher name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicationDate">Publication Date</Label>
                <Input id="publicationDate" name="publicationDate" type="date" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ISBN">ISBN</Label>
                <Input id="ISBN" name="ISBN" placeholder="Enter ISBN" required />
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
              <CardTitle>Book Images & Description</CardTitle>
              <CardDescription>Upload images and provide a detailed description of the book.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Book Cover Image</Label>
                {coverImageUrl || imagePreview ? (
                  <div className="relative w-full h-40">
                    <img src={coverImageUrl || imagePreview || ''} alt="Preview" className="w-full h-full object-contain" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute bottom-2 right-2"
                      onClick={() => {
                        setCoverImageUrl(null);
                        setImagePreview(null);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setCoverImageUrl(res[0].ufsUrl);
                        toast.success("Cover image uploaded successfully");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Additional Images</Label>
                <div className="grid grid-cols-2 gap-2">
                  {additionalImages.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`Additional image ${index + 1}`} className="w-full h-32 object-cover rounded" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() => {
                          setAdditionalImages(prev => prev.filter((_, i) => i !== index));
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setAdditionalImages(prev => [...prev, res[0].url]);
                      toast.success("Additional image uploaded successfully");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload failed: ${error.message}`);
                  }}
                />
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
