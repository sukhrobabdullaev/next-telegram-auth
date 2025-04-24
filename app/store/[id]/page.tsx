import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BookDetailPage({ params }: { params: { id: string } }) {
  // This would typically fetch the book data based on the ID
  // For demonstration, we'll use static data
  const book = {
    id: params.id,
    title: "The Power of Positive Thinking",
    image: "/placeholder.svg?height=600&width=400",
    price: "$19.99",
    category: "Self-Help",
    description:
      "This book demonstrates the power of faith in action. With the practical techniques outlined in this book, you can energize your life and give yourself the initiative needed to carry out your ambitions and hopes. The Power of Positive Thinking is a phenomenal bestseller that has helped millions of people achieve happiness and success.",
    author: "Norman Vincent Peale",
    publisher: "Touchstone",
    publicationDate: "October 2003",
    pages: 240,
    language: "English",
    isbn: "978-0743234801",
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/store">
          <Button variant="outline">Back to Store</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <div className="relative aspect-[2/3] w-full max-w-md">
            <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-contain" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge>{book.category}</Badge>
              <span className="text-muted-foreground">By {book.author}</span>
            </div>
            <p className="text-2xl font-bold mb-6">{book.price}</p>
            <p className="text-muted-foreground mb-6">{book.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">1</span>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h2 className="text-xl font-semibold">Book Details</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Publisher</div>
              <div>{book.publisher}</div>

              <div className="text-muted-foreground">Publication Date</div>
              <div>{book.publicationDate}</div>

              <div className="text-muted-foreground">Pages</div>
              <div>{book.pages}</div>

              <div className="text-muted-foreground">Language</div>
              <div>{book.language}</div>

              <div className="text-muted-foreground">ISBN</div>
              <div>{book.isbn}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
