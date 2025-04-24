"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, MoreHorizontal, Send } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      phone: "+1234567890",
      date: "2023-04-22",
      total: "$125.00",
      status: "Delivered",
      items: [
        { title: "The Power of Positive Thinking", price: "$19.99", quantity: 1 },
        { title: "Business Strategy", price: "$24.99", quantity: 2 },
        { title: "Sacred Wisdom", price: "$18.50", quantity: 3 },
      ],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      phone: "+1987654321",
      date: "2023-04-21",
      total: "$85.50",
      status: "Processing",
      items: [
        { title: "The Entrepreneur's Playbook", price: "$29.99", quantity: 1 },
        { title: "Meditations for the Soul", price: "$15.99", quantity: 2 },
      ],
      address: "456 Oak Ave, Somewhere, USA",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      phone: "+1122334455",
      date: "2023-04-20",
      total: "$220.00",
      status: "Pending",
      items: [
        { title: "Sacred Wisdom", price: "$18.50", quantity: 2 },
        { title: "Business Strategy", price: "$24.99", quantity: 3 },
        { title: "The Power of Positive Thinking", price: "$19.99", quantity: 4 },
      ],
      address: "789 Pine Rd, Nowhere, USA",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      phone: "+1555666777",
      date: "2023-04-19",
      total: "$65.25",
      status: "Delivered",
      items: [
        { title: "Meditations for the Soul", price: "$15.99", quantity: 1 },
        { title: "The Power of Positive Thinking", price: "$19.99", quantity: 2 },
      ],
      address: "101 Elm St, Anytown, USA",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      phone: "+1999888777",
      date: "2023-04-18",
      total: "$175.75",
      status: "Processing",
      items: [
        { title: "Business Strategy", price: "$24.99", quantity: 3 },
        { title: "The Entrepreneur's Playbook", price: "$29.99", quantity: 2 },
        { title: "Sacred Wisdom", price: "$18.50", quantity: 1 },
      ],
      address: "202 Maple Dr, Somewhere, USA",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage customer orders. Send orders to Telegram for processing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "Processing"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {order.status}
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                              <DialogDescription>View the complete details of this order.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-medium">Customer Information</h3>
                                  <p>Name: {order.customer}</p>
                                  <p>Phone: {order.phone}</p>
                                  <p>Address: {order.address}</p>
                                </div>
                                <div>
                                  <h3 className="font-medium">Order Information</h3>
                                  <p>Date: {order.date}</p>
                                  <p>Status: {order.status}</p>
                                  <p>Total: {order.total}</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium mb-2">Order Items</h3>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Book</TableHead>
                                      <TableHead>Price</TableHead>
                                      <TableHead>Quantity</TableHead>
                                      <TableHead className="text-right">Subtotal</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {order.items.map((item, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell className="text-right">
                                          ${(Number.parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Send to Telegram
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
