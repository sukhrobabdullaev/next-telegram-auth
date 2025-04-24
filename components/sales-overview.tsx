"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function SalesOverview({ className }: { className?: string }) {
  const [period, setPeriod] = useState("weekly")

  const weeklyData = [
    { day: "Mon", sales: 1200, orders: 12 },
    { day: "Tue", sales: 1800, orders: 18 },
    { day: "Wed", sales: 1400, orders: 14 },
    { day: "Thu", sales: 2200, orders: 22 },
    { day: "Fri", sales: 2600, orders: 26 },
    { day: "Sat", sales: 1800, orders: 18 },
    { day: "Sun", sales: 1500, orders: 15 },
  ]

  const monthlyData = [
    { day: "Week 1", sales: 6400, orders: 64 },
    { day: "Week 2", sales: 7200, orders: 72 },
    { day: "Week 3", sales: 8400, orders: 84 },
    { day: "Week 4", sales: 9200, orders: 92 },
  ]

  const data = period === "weekly" ? weeklyData : monthlyData
  const maxSales = Math.max(...data.map((d) => d.sales))

  return (
    <Card className={`border-none shadow-md bg-white dark:bg-zinc-900 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Sales Overview</CardTitle>
            <CardDescription>Your sales performance over time</CardDescription>
          </div>
          <Tabs defaultValue="weekly" className="w-[240px]" onValueChange={setPeriod}>
            <TabsList className="grid w-full grid-cols-2 h-8">
              <TabsTrigger value="weekly" className="text-xs">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">
                Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <div className="flex items-end h-[240px] gap-2 mt-4">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full">
                  <div
                    className="w-full bg-primary/20 rounded-t-sm transition-all duration-500 group-hover:bg-primary/30"
                    style={{ height: `${(item.sales / maxSales) * 200}px` }}
                  ></div>
                  <div
                    className="absolute bottom-0 left-0 w-full bg-primary rounded-t-sm transition-all duration-500 group-hover:bg-primary/90"
                    style={{ height: `${(item.orders / maxSales) * 200}px` }}
                  ></div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 dark:bg-zinc-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    ${item.sales} / {item.orders} orders
                  </div>
                </div>
                <div className="text-xs text-center mt-2 text-muted-foreground">{item.day}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-6 gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-primary/20"></div>
              <span className="text-sm text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-primary"></div>
              <span className="text-sm text-muted-foreground">Orders</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
