"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function InventoryAnalytics() {
  const inventoryData = [
    {
      id: "1",
      title: "The Power of Positive Thinking",
      image: "/placeholder.svg?height=80&width=60",
      category: "Self-Help",
      stock: 15,
      reorderPoint: 10,
      status: "In Stock",
      turnoverRate: 3.2,
    },
    {
      id: "2",
      title: "Business Strategy: A Guide to Effective Decision-Making",
      image: "/placeholder.svg?height=80&width=60",
      category: "Business",
      stock: 8,
      reorderPoint: 10,
      status: "Low Stock",
      turnoverRate: 4.5,
    },
    {
      id: "3",
      title: "Sacred Wisdom",
      image: "/placeholder.svg?height=80&width=60",
      category: "Religious",
      stock: 22,
      reorderPoint: 15,
      status: "In Stock",
      turnoverRate: 2.8,
    },
    {
      id: "4",
      title: "The Entrepreneur's Playbook",
      image: "/placeholder.svg?height=80&width=60",
      category: "Business",
      stock: 5,
      reorderPoint: 8,
      status: "Low Stock",
      turnoverRate: 5.1,
    },
    {
      id: "5",
      title: "Meditations for the Soul",
      image: "/placeholder.svg?height=80&width=60",
      category: "Religious",
      stock: 18,
      reorderPoint: 12,
      status: "In Stock",
      turnoverRate: 3.0,
    },
    {
      id: "6",
      title: "Finding Your Purpose",
      image: "/placeholder.svg?height=80&width=60",
      category: "Self-Help",
      stock: 0,
      reorderPoint: 10,
      status: "Out of Stock",
      turnoverRate: 4.2,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-none shadow-md bg-white dark:bg-zinc-900 md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Inventory Status</CardTitle>
          <CardDescription>Current stock levels and inventory metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Book</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Category</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Stock</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Reorder Point</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Status</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Turnover Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {inventoryData.map((book) => (
                    <tr key={book.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative flex items-center justify-center h-10 w-8 rounded-md overflow-hidden bg-muted">
                            <Image
                              src={book.image || "/placeholder.svg"}
                              alt={book.title}
                              width={60}
                              height={80}
                              className="object-cover"
                            />
                          </div>
                          <div className="font-medium text-sm">{book.title}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          {book.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{book.stock}</td>
                      <td className="py-3 px-4 text-sm">{book.reorderPoint}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={`px-2 py-0.5 text-xs font-medium ${
                            book.status === "In Stock"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                              : book.status === "Low Stock"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
                          }`}
                        >
                          {book.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{book.turnoverRate}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Inventory Status</CardTitle>
          <CardDescription>Distribution of inventory by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex flex-col justify-center h-full">
              <div className="relative w-full aspect-square max-w-[250px] mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{inventoryData.length}</div>
                    <div className="text-sm text-muted-foreground">Total Books</div>
                  </div>
                </div>
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  {(() => {
                    const statusCounts = {
                      "In Stock": inventoryData.filter((book) => book.status === "In Stock").length,
                      "Low Stock": inventoryData.filter((book) => book.status === "Low Stock").length,
                      "Out of Stock": inventoryData.filter((book) => book.status === "Out of Stock").length,
                    }

                    const statusColors = {
                      "In Stock": "var(--chart-green)",
                      "Low Stock": "var(--chart-yellow)",
                      "Out of Stock": "var(--chart-red)",
                    }

                    let startAngle = 0
                    return Object.entries(statusCounts).map(([status, count], i) => {
                      const angle = (count / inventoryData.length) * 360
                      const endAngle = startAngle + angle

                      const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                      const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                      const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                      const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

                      const largeArcFlag = angle <= 180 ? "0" : "1"

                      const path = (
                        <path
                          key={status}
                          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                          fill={statusColors[status as keyof typeof statusColors]}
                          className="transition-all duration-500 hover:opacity-90"
                        />
                      )

                      startAngle = endAngle
                      return path
                    })
                  })()}
                  <circle cx="50" cy="50" r="25" fill="var(--background)" />
                </svg>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {[
                  { status: "In Stock", color: "var(--chart-green)" },
                  { status: "Low Stock", color: "var(--chart-yellow)" },
                  { status: "Out of Stock", color: "var(--chart-red)" },
                ].map((item) => (
                  <div key={item.status} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.status}</span>
                    <span className="text-sm text-muted-foreground">
                      ({inventoryData.filter((book) => book.status === item.status).length}/{inventoryData.length})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Inventory Turnover</CardTitle>
          <CardDescription>Books with highest and lowest turnover rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full overflow-y-auto">
            <div className="space-y-6 mt-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Highest Turnover</h3>
                {inventoryData
                  .sort((a, b) => b.turnoverRate - a.turnoverRate)
                  .slice(0, 3)
                  .map((book) => (
                    <div key={book.id} className="flex items-center gap-3 mb-3">
                      <div className="relative flex items-center justify-center h-10 w-8 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={book.image || "/placeholder.svg"}
                          alt={book.title}
                          width={60}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{book.title}</div>
                        <div className="text-xs text-muted-foreground">{book.category}</div>
                      </div>
                      <div className="text-sm font-bold">{book.turnoverRate}x</div>
                    </div>
                  ))}
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Lowest Turnover</h3>
                {inventoryData
                  .sort((a, b) => a.turnoverRate - b.turnoverRate)
                  .slice(0, 3)
                  .map((book) => (
                    <div key={book.id} className="flex items-center gap-3 mb-3">
                      <div className="relative flex items-center justify-center h-10 w-8 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={book.image || "/placeholder.svg"}
                          alt={book.title}
                          width={60}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{book.title}</div>
                        <div className="text-xs text-muted-foreground">{book.category}</div>
                      </div>
                      <div className="text-sm font-bold">{book.turnoverRate}x</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
