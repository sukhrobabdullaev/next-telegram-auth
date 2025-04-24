"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { ICategory } from "@/models/category"
import { UploadButton } from "@/lib/uploadthing"
import { getBookById, updateBook } from "@/actions/book"

export default function EditBookPage() {
  const [book, setBook] = useState<any>(null)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { id } = useParams() as { id: string }

  useEffect(() => {
    fetchBook()
    fetchCategories()
  }, [id])

  const fetchBook = async () => {
    try {
      const data = await getBookById(id)
      setBook(data)
      setCoverImageUrl(data.coverImage)
    } catch (err) {
      toast.error("Failed to fetch book")
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      toast.error("Failed to fetch categories")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)

    const updated = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      category: formData.get("category") as string,
      stock: formData.get("stock") as string,
      coverImage: coverImageUrl,
    }

    try {
      await updateBook(id, updated)
      toast.success("Book updated successfully")
      router.push("/dashboard/books")
    } catch (error: any) {
      toast.error(error.message || "Failed to update book")
    } finally {
      setLoading(false)
    }
  }

  if (!book) return <p>Loading...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/books">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Edit Book</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Book Details</CardTitle>
              <CardDescription>Update your book’s details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={book.title} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" step="0.01" defaultValue={book.price} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={book.category} required>
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
                <Input id="stock" name="stock" type="number" defaultValue={book.stock} required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Book Image & Description</CardTitle>
              <CardDescription>Update the image or description if needed.</CardDescription>
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
                        setCoverImageUrl(null)
                        setImagePreview(null)
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
                        setCoverImageUrl(res[0].url)
                        toast.success("Image uploaded successfully")
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`)
                    }}
                  />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={6} defaultValue={book.description} required />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/books")}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Update Book"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
