import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, UserPlus, Mail, Phone, MapPin, Calendar, DollarSign } from "lucide-react"
import { CustomerActivity } from "@/components/customer-activity"
import { CustomerStats } from "@/components/customer-stats"

export default function CustomersPage() {
  const customers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "JD",
      location: "New York, USA",
      phone: "+1 (555) 123-4567",
      status: "Active",
      orders: 12,
      spent: "$345.88",
      lastOrder: "2023-04-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "JS",
      location: "Los Angeles, USA",
      phone: "+1 (555) 987-6543",
      status: "Active",
      orders: 8,
      spent: "$215.50",
      lastOrder: "2023-04-18",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      avatar: "RJ",
      location: "Chicago, USA",
      phone: "+1 (555) 456-7890",
      status: "Inactive",
      orders: 5,
      spent: "$178.25",
      lastOrder: "2023-03-22",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "ED",
      location: "Houston, USA",
      phone: "+1 (555) 234-5678",
      status: "Active",
      orders: 15,
      spent: "$412.75",
      lastOrder: "2023-04-20",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      avatar: "MW",
      location: "Phoenix, USA",
      phone: "+1 (555) 876-5432",
      status: "Active",
      orders: 7,
      spent: "$189.99",
      lastOrder: "2023-04-12",
    },
    {
      id: "6",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      avatar: "SB",
      location: "Philadelphia, USA",
      phone: "+1 (555) 345-6789",
      status: "Inactive",
      orders: 3,
      spent: "$87.50",
      lastOrder: "2023-02-28",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Manage and analyze your customer base.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Customers</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold">89</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+12 this month</p>
              </div>
              <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Customers</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold">76</h3>
                  <span className="text-xs font-medium text-green-500">85%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+5 this month</p>
              </div>
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Order Value</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold">$42.50</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+$3.25 from last month</p>
              </div>
              <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Repeat Customers</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold">62%</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
              </div>
              <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <CustomerStats className="lg:col-span-3" />
        <CustomerActivity className="lg:col-span-4" />
      </div>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-medium">Customer Management</CardTitle>
              <CardDescription>View and manage your customer database.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search customers..."
                  className="pl-8 bg-muted/30 border-none w-full sm:w-[240px] focus-visible:ring-1"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Download className="h-4 w-4" />
                </Button>
                <Button className="h-9">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="border-b mb-4">
              <TabsList className="w-full justify-start h-10 rounded-none bg-transparent p-0 mb-[-1px]">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-10 px-4"
                >
                  All Customers
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-10 px-4"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="inactive"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-10 px-4"
                >
                  Inactive
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="rounded-lg overflow-hidden border border-border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Customer</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Contact</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Location</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Orders</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Spent</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Last Order</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?text=${customer.avatar}`} alt={customer.name} />
                                <AvatarFallback className="text-xs">{customer.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{customer.name}</div>
                                <div className="text-xs text-muted-foreground">{customer.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center text-sm">
                                <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                {customer.email}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                {customer.phone}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center text-sm">
                              <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                              {customer.location}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{customer.orders}</td>
                          <td className="py-3 px-4 text-sm font-medium">{customer.spent}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{customer.lastOrder}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={`px-2 py-0.5 text-xs font-medium ${
                                customer.status === "Active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800"
                              }`}
                            >
                              {customer.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="active" className="m-0">
              <div className="rounded-lg overflow-hidden border border-border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Customer</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Contact</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Location</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Orders</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Spent</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Last Order</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {customers
                        .filter((customer) => customer.status === "Active")
                        .map((customer) => (
                          <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`/placeholder.svg?text=${customer.avatar}`} alt={customer.name} />
                                  <AvatarFallback className="text-xs">{customer.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-sm">{customer.name}</div>
                                  <div className="text-xs text-muted-foreground">{customer.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center text-sm">
                                  <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                  {customer.email}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                  {customer.phone}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center text-sm">
                                <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                {customer.location}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">{customer.orders}</td>
                            <td className="py-3 px-4 text-sm font-medium">{customer.spent}</td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{customer.lastOrder}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800 px-2 py-0.5 text-xs font-medium"
                              >
                                {customer.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inactive" className="m-0">
              <div className="rounded-lg overflow-hidden border border-border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Customer</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Contact</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Location</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Orders</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Spent</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Last Order</th>
                        <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {customers
                        .filter((customer) => customer.status === "Inactive")
                        .map((customer) => (
                          <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`/placeholder.svg?text=${customer.avatar}`} alt={customer.name} />
                                  <AvatarFallback className="text-xs">{customer.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-sm">{customer.name}</div>
                                  <div className="text-xs text-muted-foreground">{customer.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center text-sm">
                                  <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                  {customer.email}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                  {customer.phone}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center text-sm">
                                <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                {customer.location}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">{customer.orders}</td>
                            <td className="py-3 px-4 text-sm font-medium">{customer.spent}</td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{customer.lastOrder}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800 px-2 py-0.5 text-xs font-medium"
                              >
                                {customer.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
