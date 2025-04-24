"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function TopBooks({ className }: { className?: string }) {
  const topBooks = [
    {
      id: "1",
      title: "The Power of Positive Thinking",
      image: "/placeholder.svg?height=80&width=60",
      price: "$19.99",
      category: "Self-Help",
      sales: 42,
    },
    {
      id: "2",
      title: "Business Strategy: A Guide to Effective Decision-Making",
      image: "/placeholder.svg?height=80&width=60",
      price: "$24.99",
      category: "Business",
      sales: 38,
    },
    {
      id: "3",
      title: "Sacred Wisdom",
      image: "/placeholder.svg?height=80&width=60",
      price: "$18.50",
      category: "Religious",
      sales: 35,
    },
    {
      id: "4",
      title: "The Entrepreneur's Playbook",
      image: "/placeholder.svg?height=80&width=60",
      price: "$29.99",
      category: "Business",
      sales: 31,
    },
  ]

  const maxSales = Math.max(...topBooks.map((book) => book.sales))

  return (
    <Card className={`border-none shadow-md bg-white dark:bg-zinc-900 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Top Selling Books</CardTitle>
        <CardDescription>Your best performing books this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {topBooks.map((book, index) => (
            <div key={book.id} className="flex items-center gap-4">
              <div className="relative flex items-center justify-center h-12 w-12 rounded-md overflow-hidden bg-muted">
                <Image
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  width={60}
                  height={80}
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 bg-black/60 text-white h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{book.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs h-5 px-1.5 border-muted-foreground/30">
                    {book.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{book.price}</span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(book.sales / maxSales) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{book.sales} sold</span>
                  <span className="text-xs text-muted-foreground">{Math.round((book.sales / maxSales) * 100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
