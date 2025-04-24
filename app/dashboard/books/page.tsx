"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getBooks, deleteBook } from "@/actions/book"
import { IBook } from "@/models/book"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function BooksPage() {
  const [books, setBooks] = useState<IBook[]>([])
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    filterBooks()
  }, [searchTerm, books])

  const fetchBooks = async () => {
    try {
      const data = await getBooks()
      setBooks(data)
      setFilteredBooks(data)
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
                    <Image
                      src={book.coverImage || "/placeholder.svg"}
                      alt={book.title}
                      width={60}
                      height={80}
                      className="rounded border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>${book.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{book.category?.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        book.stock > 10 ? "success" :
                          book.stock > 5 ? "warning" :
                            book.stock > 0 ? "outline" :
                              "destructive"
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
        </CardContent>
      </Card>
    </div>
  )
}
