import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SalesAnalytics } from "@/components/sales-analytics"
import { CategoryAnalytics } from "@/components/category-analytics"
import { CustomerAnalytics } from "@/components/customer-analytics"
import { InventoryAnalytics } from "@/components/inventory-analytics"
import { Calendar, Download, TrendingUp, DollarSign, ShoppingCart, Users, BookOpen } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Comprehensive analytics and insights for your bookstore.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs defaultValue="sales" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="h-9">
              <TabsTrigger value="sales" className="text-xs">
                Sales
              </TabsTrigger>
              <TabsTrigger value="categories" className="text-xs">
                Categories
              </TabsTrigger>
              <TabsTrigger value="customers" className="text-xs">
                Customers
              </TabsTrigger>
              <TabsTrigger value="inventory" className="text-xs">
                Inventory
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select defaultValue="30days">
                <SelectTrigger className="h-8 w-[150px] text-xs">
                  <Calendar className="h-3.5 w-3.5 mr-2" />
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="h-8">
                <Download className="h-3.5 w-3.5 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-3xl font-bold">$12,628</h3>
                      <span className="text-xs font-medium text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        12.5%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
                  </div>
                  <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                    <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                        8.2%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">Customers</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-3xl font-bold">89</h3>
                      <span className="text-xs font-medium text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        5.3%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
                  </div>
                  <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Order Value</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-3xl font-bold">$66.82</h3>
                      <span className="text-xs font-medium text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        3.7%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
                  </div>
                  <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                    <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <TabsContent value="sales" className="m-0">
            <SalesAnalytics />
          </TabsContent>

          <TabsContent value="categories" className="m-0">
            <CategoryAnalytics />
          </TabsContent>

          <TabsContent value="customers" className="m-0">
            <CustomerAnalytics />
          </TabsContent>

          <TabsContent value="inventory" className="m-0">
            <InventoryAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
