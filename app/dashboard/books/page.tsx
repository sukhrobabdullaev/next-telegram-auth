"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Plus, Search, Trash, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getBooks, deleteBook, getBookById } from "@/actions/book"
import type { IBook } from "@/models/book"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function BooksPage() {
  const [books, setBooks] = useState<IBook[]>([])
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [previewBook, setPreviewBook] = useState<IBook | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalBooks, setTotalBooks] = useState(0)
  const limit = 10
  const router = useRouter()

  useEffect(() => {
    fetchBooks()
  }, [currentPage])

  useEffect(() => {
    filterBooks()
  }, [searchTerm, books])

  const fetchBooks = async () => {
    try {
      const data = await getBooks(currentPage, limit)
      setBooks(data.books)
      setFilteredBooks(data.books)
      setTotalPages(data.pagination.totalPages)
      setTotalBooks(data.pagination.total)
    } catch (error) {
      toast.error("Failed to fetch books")
    } finally {
      setLoading(false)
    }
  }

  const filterBooks = () => {
    const filtered = books.filter((book) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        book.title.toLowerCase().includes(searchLower) ||
        (book.category?.name && book.category.name.toLowerCase().includes(searchLower)) ||
        book.price.toString().includes(searchTerm)
      )
    })
    setFilteredBooks(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id)
      toast.success("Book deleted successfully")
      fetchBooks()
    } catch (error) {
      toast.error("Failed to delete book")
    }
  }

  const openBookPreview = async (id: string) => {
    try {
      const book = await getBookById(id)
      setPreviewBook(book)
      setCurrentImageIndex(0)
    } catch (error) {
      toast.error("Failed to fetch book details")
    }
  }

  const closeBookPreview = () => {
    setPreviewBook(null)
    setCurrentImageIndex(0)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const nextImage = () => {
    if (previewBook && currentImageIndex < previewBook.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Books</h1>
        <Link href="/dashboard/books/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Book
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book Management</CardTitle>
          <CardDescription>Manage your bookstore inventory. Add, edit, or remove books.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div
                      className="cursor-pointer transition-transform hover:scale-105"
                      onClick={() => openBookPreview(book.id)}
                    >
                      <Image
                        src={book.images[0] || "/placeholder.svg"}
                        alt={book.title}
                        width={60}
                        height={80}
                        className="rounded border"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>${book.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{book.category?.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        book.stock > 10
                          ? "success"
                          : book.stock > 5
                            ? "warning"
                            : book.stock > 0
                              ? "outline"
                              : "destructive"
                      }
                      className="min-w-[3rem] justify-center"
                    >
                      {book.stock === 0 ? "Out of Stock" : book.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/books/edit/${book.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(book.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalBooks)} of {totalBooks} books
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Book Preview Dialog */}
      <Dialog open={!!previewBook} onOpenChange={() => closeBookPreview()}>
        <DialogContent className="sm:max-w-3xl">
          <DialogTitle>{previewBook?.title}</DialogTitle>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[2/3] w-full">
                {previewBook && previewBook.images.length > 0 && (
                  <Image
                    src={previewBook.images[currentImageIndex]}
                    alt={previewBook.title}
                    fill
                    className="object-cover rounded-md"
                  />
                )}
                {previewBook && previewBook.images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                    <Button size="sm" onClick={prevImage} disabled={currentImageIndex === 0}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={nextImage} disabled={currentImageIndex === previewBook.images.length - 1}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <p><strong>Author:</strong> {previewBook?.author}</p>
              <p><strong>Price:</strong> ${previewBook?.price.toFixed(2)}</p>
              <p><strong>Category:</strong> {previewBook?.category?.name}</p>
              <p><strong>Stock:</strong> {previewBook?.stock}</p>
              <p><strong>Description:</strong> {previewBook?.description}</p>
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="outline" onClick={closeBookPreview}>
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
