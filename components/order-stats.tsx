"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function OrderStats({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("status")

  const statusData = [
    { name: "Delivered", value: 45, color: "var(--chart-green)" },
    { name: "Processing", value: 32, color: "var(--chart-blue)" },
    { name: "Pending", value: 18, color: "var(--chart-yellow)" },
    { name: "Cancelled", value: 5, color: "var(--chart-red)" },
  ]

  const monthlyData = [18, 24, 21, 36, 42, 48]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  return (
    <Card className={`border-none shadow-md bg-white dark:bg-zinc-900 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Order Statistics</CardTitle>
            <CardDescription>Distribution of orders by status</CardDescription>
          </div>
          <Tabs defaultValue="status" className="w-[240px]" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 h-8">
              <TabsTrigger value="status" className="text-xs">
                Status
              </TabsTrigger>
              <TabsTrigger value="trend" className="text-xs">
                Trend
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {activeTab === "status" ? (
            <div className="grid grid-cols-2 gap-6 h-full">
              <div className="flex flex-col justify-center">
                <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">100</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                  </div>
                  <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                    {statusData.map((status, i) => {
                      const total = statusData.reduce((acc, curr) => acc + curr.value, 0)
                      const startAngle = statusData
                        .slice(0, i)
                        .reduce((acc, curr) => acc + (curr.value / total) * 360, 0)
                      const endAngle = startAngle + (status.value / total) * 360

                      const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                      const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                      const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                      const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

                      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

                      return (
                        <path
                          key={status.name}
                          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                          fill={status.color}
                          className="transition-all duration-500 hover:opacity-90"
                        />
                      )
                    })}
                    <circle cx="50" cy="50" r="25" fill="var(--background)" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                {statusData.map((status) => (
                  <div key={status.name} className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{status.name}</span>
                        <span className="text-sm text-muted-foreground">{status.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted mt-1 overflow-hidden">
                        <div
                          className="h-full transition-all duration-500 ease-in-out"
                          style={{
                            width: `${(status.value / 100) * 100}%`,
                            backgroundColor: status.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
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

                  {/* Line */}
                  <path
                    d={`M 0 ${200 - (monthlyData[0] / 50) * 200} ${monthlyData
                      .map((d, i) => `L ${(i * 600) / (monthlyData.length - 1)} ${200 - (d / 50) * 200}`)
                      .join(" ")}`}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    className="transition-all duration-500"
                  />

                  {/* Area */}
                  <path
                    d={`M 0 ${200 - (monthlyData[0] / 50) * 200} ${monthlyData
                      .map((d, i) => `L ${(i * 600) / (monthlyData.length - 1)} ${200 - (d / 50) * 200}`)
                      .join(" ")} L 600 200 L 0 200 Z`}
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
                      cx={(i * 600) / (monthlyData.length - 1)}
                      cy={200 - (d / 50) * 200}
                      r="4"
                      fill="var(--background)"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      className="transition-all duration-500"
                    />
                  ))}
                </svg>

                {/* Y-axis labels */}
                <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <div>50</div>
                  <div>40</div>
                  <div>30</div>
                  <div>20</div>
                  <div>10</div>
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                {months.map((month) => (
                  <div key={month}>{month}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
