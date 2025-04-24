import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, ShoppingCart, Tag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { RecentOrders } from "@/components/recent-orders"
import { BookStats } from "@/components/book-stats"
import { OrderStats } from "@/components/order-stats"
import { SalesOverview } from "@/components/sales-overview"
import { TopBooks } from "@/components/top-books"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your bookstore management system.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Books</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold">142</h3>
                  <span className="text-xs font-medium text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                    8.2%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+12 from last month</p>
              </div>
              <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Orders</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold">189</h3>
                  <span className="text-xs font-medium text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                    12.5%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+24 from last month</p>
              </div>
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Categories</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold">8</h3>
                  <span className="text-xs font-medium text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    33.3%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+2 new categories</p>
              </div>
              <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                <Tag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Customers</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold">89</h3>
                  <span className="text-xs font-medium text-red-500 flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                    3.3%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">-3 from last month</p>
              </div>
              <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <SalesOverview className="lg:col-span-4" />
        <TopBooks className="lg:col-span-3" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <BookStats className="lg:col-span-3" />
        <OrderStats className="lg:col-span-4" />
      </div>

      <RecentOrders />
    </div>
  )
}
