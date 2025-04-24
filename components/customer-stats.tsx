"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function CustomerStats({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("demographics")

  const demographicData = [
    { name: "18-24", value: 15, color: "var(--chart-blue)" },
    { name: "25-34", value: 32, color: "var(--chart-green)" },
    { name: "35-44", value: 28, color: "var(--chart-yellow)" },
    { name: "45-54", value: 18, color: "var(--chart-purple)" },
    { name: "55+", value: 7, color: "var(--chart-red)" },
  ]

  const locationData = [
    { name: "New York", value: 28, color: "var(--chart-blue)" },
    { name: "Los Angeles", value: 22, color: "var(--chart-green)" },
    { name: "Chicago", value: 18, color: "var(--chart-yellow)" },
    { name: "Houston", value: 15, color: "var(--chart-purple)" },
    { name: "Other", value: 17, color: "var(--chart-red)" },
  ]

  const data = activeTab === "demographics" ? demographicData : locationData

  return (
    <Card className={`border-none shadow-md bg-white dark:bg-zinc-900 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Customer Demographics</CardTitle>
            <CardDescription>Distribution of customers by age and location</CardDescription>
          </div>
          <Tabs defaultValue="demographics" className="w-[240px]" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 h-8">
              <TabsTrigger value="demographics" className="text-xs">
                Age Groups
              </TabsTrigger>
              <TabsTrigger value="locations" className="text-xs">
                Locations
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <div className="grid grid-cols-2 gap-6 h-full">
            <div className="flex flex-col justify-center">
              <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  {data.map((item, i) => {
                    const total = data.reduce((acc, curr) => acc + curr.value, 0)
                    const startAngle = data.slice(0, i).reduce((acc, curr) => acc + (curr.value / total) * 360, 0)
                    const endAngle = startAngle + (item.value / total) * 360

                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

                    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

                    return (
                      <path
                        key={item.name}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                        className="transition-all duration-500 hover:opacity-90"
                      />
                    )
                  })}
                  <circle cx="50" cy="50" r="25" fill="var(--background)" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted mt-1 overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 ease-in-out"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
