import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function StorePage() {
  const books = [
    {
      id: "1",
      title: "The Power of Positive Thinking",
      image: "/placeholder.svg?height=300&width=200",
      price: "$19.99",
      category: "Self-Help",
    },
    {
      id: "2",
      title: "Business Strategy: A Guide to Effective Decision-Making",
      image: "/placeholder.svg?height=300&width=200",
      price: "$24.99",
      category: "Business",
    },
    {
      id: "3",
      title: "Sacred Wisdom",
      image: "/placeholder.svg?height=300&width=200",
      price: "$18.50",
      category: "Religious",
    },
    {
      id: "4",
      title: "The Entrepreneur's Playbook",
      image: "/placeholder.svg?height=300&width=200",
      price: "$29.99",
      category: "Business",
    },
    {
      id: "5",
      title: "Meditations for the Soul",
      image: "/placeholder.svg?height=300&width=200",
      price: "$15.99",
      category: "Religious",
    },
    {
      id: "6",
      title: "The Art of Leadership",
      image: "/placeholder.svg?height=300&width=200",
      price: "$22.99",
      category: "Business",
    },
    {
      id: "7",
      title: "Finding Your Purpose",
      image: "/placeholder.svg?height=300&width=200",
      price: "$17.50",
      category: "Self-Help",
    },
    {
      id: "8",
      title: "Ancient Scriptures Explained",
      image: "/placeholder.svg?height=300&width=200",
      price: "$21.99",
      category: "Religious",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Bookstore</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search books..." className="pl-8" />
          </div>

          <Select>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="religious">Religious</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="self-help">Self-Help</SelectItem>
              <SelectItem value="fiction">Fiction</SelectItem>
            </SelectContent>
          </Select>

          <Link href="/cart">
            <Button variant="outline" className="w-full sm:w-auto">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart (3)
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <div className="aspect-[2/3] relative">
              <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2 h-12">{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{book.price}</span>
                <span className="text-sm text-muted-foreground">{book.category}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
