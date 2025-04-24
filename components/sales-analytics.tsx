"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function SalesAnalytics() {
  const [period, setPeriod] = useState("revenue")

  const monthlyData = [
    { month: "Jan", revenue: 4200, orders: 65 },
    { month: "Feb", revenue: 5100, orders: 78 },
    { month: "Mar", revenue: 4800, orders: 72 },
    { month: "Apr", revenue: 6300, orders: 95 },
    { month: "May", revenue: 7500, orders: 110 },
    { month: "Jun", revenue: 8200, orders: 125 },
    { month: "Jul", revenue: 7800, orders: 118 },
    { month: "Aug", revenue: 8500, orders: 132 },
    { month: "Sep", revenue: 9200, orders: 145 },
    { month: "Oct", revenue: 10500, orders: 160 },
    { month: "Nov", revenue: 11800, orders: 175 },
    { month: "Dec", revenue: 12600, orders: 189 },
  ]

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))
  const maxOrders = Math.max(...monthlyData.map((d) => d.orders))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-none shadow-md bg-white dark:bg-zinc-900 md:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Sales Performance</CardTitle>
              <CardDescription>Monthly revenue and order trends</CardDescription>
            </div>
            <Tabs defaultValue="revenue" className="w-[240px]" onValueChange={setPeriod}>
              <TabsList className="grid w-full grid-cols-2 h-8">
                <TabsTrigger value="revenue" className="text-xs">
                  Revenue
                </TabsTrigger>
                <TabsTrigger value="orders" className="text-xs">
                  Orders
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <div className="h-full flex flex-col">
              <div className="flex-1 relative mt-6">
                {/* Line chart */}
                <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 75}
                      x2="1200"
                      y2={i * 75}
                      stroke="var(--border)"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Line */}
                  <path
                    d={`M 0 ${
                      300 -
                      (
                        monthlyData[0][period === "revenue" ? "revenue" : "orders"] /
                          (period === "revenue" ? maxRevenue : maxOrders)
                      ) *
                        300
                    } ${monthlyData
                      .map(
                        (d, i) =>
                          `L ${(i * 1200) / (monthlyData.length - 1)} ${
                            300 -
                            (
                              d[period === "revenue" ? "revenue" : "orders"] /
                                (period === "revenue" ? maxRevenue : maxOrders)
                            ) *
                              300
                          }`,
                      )
                      .join(" ")}`}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    className="transition-all duration-500"
                  />

                  {/* Area */}
                  <path
                    d={`M 0 ${
                      300 -
                      (
                        monthlyData[0][period === "revenue" ? "revenue" : "orders"] /
                          (period === "revenue" ? maxRevenue : maxOrders)
                      ) *
                        300
                    } ${monthlyData
                      .map(
                        (d, i) =>
                          `L ${(i * 1200) / (monthlyData.length - 1)} ${
                            300 -
                            (
                              d[period === "revenue" ? "revenue" : "orders"] /
                                (period === "revenue" ? maxRevenue : maxOrders)
                            ) *
                              300
                          }`,
                      )
                      .join(" ")} L 1200 300 L 0 300 Z`}
                    fill="url(#gradient)"
                    opacity="0.2"
                    className="transition-all duration-500"
                  />

                  {/* Gradient */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Data points */}
                  {monthlyData.map((d, i) => (
                    <circle
                      key={i}
                      cx={(i * 1200) / (monthlyData.length - 1)}
                      cy={
                        300 -
                        (d[period === "revenue" ? "revenue" : "orders"] /
                          (period === "revenue" ? maxRevenue : maxOrders)) *
                          300
                      }
                      r="6"
                      fill="var(--background)"
                      stroke="var(--primary)"
                      strokeWidth="3"
                      className="transition-all duration-500"
                    />
                  ))}

                  {/* Tooltips */}
                  {monthlyData.map((d, i) => (
                    <g key={`tooltip-${i}`} className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <rect
                        x={(i * 1200) / (monthlyData.length - 1) - 50}
                        y={
                          300 -
                          (d[period === "revenue" ? "revenue" : "orders"] /
                            (period === "revenue" ? maxRevenue : maxOrders)) *
                            300 -
                          60
                        }
                        width="100"
                        height="40"
                        rx="4"
                        fill="var(--muted)"
                        className="pointer-events-none"
                      />
                      <text
                        x={(i * 1200) / (monthlyData.length - 1)}
                        y={
                          300 -
                          (d[period === "revenue" ? "revenue" : "orders"] /
                            (period === "revenue" ? maxRevenue : maxOrders)) *
                            300 -
                          35
                        }
                        textAnchor="middle"
                        fill="var(--foreground)"
                        fontSize="12"
                        className="pointer-events-none"
                      >
                        {period === "revenue" ? `$${d.revenue}` : `${d.orders} orders`}
                      </text>
                      <text
                        x={(i * 1200) / (monthlyData.length - 1)}
                        y={
                          300 -
                          (d[period === "revenue" ? "revenue" : "orders"] /
                            (period === "revenue" ? maxRevenue : maxOrders)) *
                            300 -
                          20
                        }
                        textAnchor="middle"
                        fill="var(--muted-foreground)"
                        fontSize="10"
                        className="pointer-events-none"
                      >
                        {d.month}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Y-axis labels */}
                <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-2">
                  <div>{period === "revenue" ? `$${maxRevenue}` : maxOrders}</div>
                  <div>{period === "revenue" ? `$${Math.round(maxRevenue * 0.75)}` : Math.round(maxOrders * 0.75)}</div>
                  <div>{period === "revenue" ? `$${Math.round(maxRevenue * 0.5)}` : Math.round(maxOrders * 0.5)}</div>
                  <div>{period === "revenue" ? `$${Math.round(maxRevenue * 0.25)}` : Math.round(maxOrders * 0.25)}</div>
                  <div>0</div>
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                {monthlyData.map((d) => (
                  <div key={d.month}>{d.month}</div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Sales by Day of Week</CardTitle>
          <CardDescription>Distribution of sales across weekdays</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex items-end h-[240px] gap-2 mt-4">
              {[
                { day: "Mon", value: 65 },
                { day: "Tue", value: 85 },
                { day: "Wed", value: 75 },
                { day: "Thu", value: 90 },
                { day: "Fri", value: 100 },
                { day: "Sat", value: 80 },
                { day: "Sun", value: 60 },
              ].map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full">
                    <div
                      className="w-full bg-primary rounded-t-sm transition-all duration-500 group-hover:bg-primary/90"
                      style={{ height: `${(item.value / 100) * 200}px` }}
                    ></div>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 dark:bg-zinc-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {period === "revenue" ? `$${item.value * 120}` : `${item.value} orders`}
                    </div>
                  </div>
                  <div className="text-xs text-center mt-2 text-muted-foreground">{item.day}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Sales by Time of Day</CardTitle>
          <CardDescription>Distribution of sales across hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="h-full flex flex-col">
              <div className="flex-1 relative mt-6">
                {/* Line chart */}
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="600"
                      y2={i * 50}
                      stroke="var(--border)"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Area */}
                  <path
                    d={`M 0 200 
                      L 0 150
                      L 50 160
                      L 100 170
                      L 150 140
                      L 200 100
                      L 250 80
                      L 300 60
                      L 350 70
                      L 400 90
                      L 450 120
                      L 500 150
                      L 550 180
                      L 600 190
                      L 600 200 Z`}
                    fill="var(--primary)"
                    opacity="0.2"
                    className="transition-all duration-500"
                  />

                  {/* Line */}
                  <path
                    d={`M 0 150
                      L 50 160
                      L 100 170
                      L 150 140
                      L 200 100
                      L 250 80
                      L 300 60
                      L 350 70
                      L 400 90
                      L 450 120
                      L 500 150
                      L 550 180
                      L 600 190`}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    className="transition-all duration-500"
                  />
                </svg>

                {/* Y-axis labels */}
                <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <div>High</div>
                  <div></div>
                  <div>Medium</div>
                  <div></div>
                  <div>Low</div>
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <div>12 AM</div>
                <div>6 AM</div>
                <div>12 PM</div>
                <div>6 PM</div>
                <div>12 AM</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
