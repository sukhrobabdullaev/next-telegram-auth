import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from "lucide-react"

export function RecentOrders() {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      avatar: "JD",
      date: "2023-04-22",
      total: "$125.00",
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      avatar: "JS",
      date: "2023-04-21",
      total: "$85.50",
      status: "Processing",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      avatar: "RJ",
      date: "2023-04-20",
      total: "$220.00",
      status: "Pending",
      items: 5,
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      avatar: "ED",
      date: "2023-04-19",
      total: "$65.25",
      status: "Delivered",
      items: 1,
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      avatar: "MW",
      date: "2023-04-18",
      total: "$175.75",
      status: "Processing",
      items: 4,
    },
  ]

  return (
    <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Recent Orders</CardTitle>
            <CardDescription>You have {orders.length} orders this month.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Customer</th>
                  <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Order</th>
                  <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Date</th>
                  <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Items</th>
                  <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Total</th>
                  <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Status</th>
                  <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?text=${order.avatar}`} alt={order.customer} />
                          <AvatarFallback className="text-xs">{order.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{order.items}</td>
                    <td className="py-3 px-4 text-sm font-medium">{order.total}</td>
                    <td className="py-3 px-4">
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
