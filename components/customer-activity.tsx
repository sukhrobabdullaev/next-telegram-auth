"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function CustomerActivity({ className }: { className?: string }) {
  const [period, setPeriod] = useState("weekly")

  const weeklyData = [
    { day: "Mon", newCustomers: 3, activeCustomers: 42 },
    { day: "Tue", newCustomers: 5, activeCustomers: 38 },
    { day: "Wed", newCustomers: 2, activeCustomers: 45 },
    { day: "Thu", newCustomers: 4, activeCustomers: 50 },
    { day: "Fri", newCustomers: 7, activeCustomers: 55 },
    { day: "Sat", newCustomers: 6, activeCustomers: 48 },
    { day: "Sun", newCustomers: 3, activeCustomers: 40 },
  ]

  const monthlyData = [
    { day: "Week 1", newCustomers: 12, activeCustomers: 160 },
    { day: "Week 2", newCustomers: 18, activeCustomers: 175 },
    { day: "Week 3", newCustomers: 15, activeCustomers: 190 },
    { day: "Week 4", newCustomers: 22, activeCustomers: 210 },
  ]

  const data = period === "weekly" ? weeklyData : monthlyData
  const maxActiveCustomers = Math.max(...data.map((d) => d.activeCustomers))

  return (
    <Card className={`border-none shadow-md bg-white dark:bg-zinc-900 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Customer Activity</CardTitle>
            <CardDescription>New and active customers over time</CardDescription>
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
                    style={{ height: `${(item.activeCustomers / maxActiveCustomers) * 200}px` }}
                  ></div>
                  <div
                    className="absolute bottom-0 left-0 w-full bg-primary rounded-t-sm transition-all duration-500 group-hover:bg-primary/90"
                    style={{ height: `${(item.newCustomers / maxActiveCustomers) * 200}px` }}
                  ></div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 dark:bg-zinc-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.activeCustomers} active / {item.newCustomers} new
                  </div>
                </div>
                <div className="text-xs text-center mt-2 text-muted-foreground">{item.day}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-6 gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-primary/20"></div>
              <span className="text-sm text-muted-foreground">Active Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-primary"></div>
              <span className="text-sm text-muted-foreground">New Customers</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
